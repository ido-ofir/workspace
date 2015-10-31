
/*

  authentication module handles login and registration.
  were using passport for authentication and a waterline store to keep session data

*/

var crypto = require('crypto');

var Waterline = require('waterline');
var passport = require('passport');
var validator = require('validator');
var Cookie = require('./cookie.js')

var utils = require('../utils');
var strategies = require('./strategies');
var WaterlineSession = require('./waterlineSession.js');
var errors = require('./errors.js');

var beforeLogin = utils.Middleware();
var afterLogin = utils.Middleware();
var beforeRegister = utils.Middleware();
var afterRegister = utils.Middleware();
var beforeLogout = utils.Middleware();
var afterDeserializeUser = utils.Middleware();

module.exports = function(api, permissions, config) {

  var localStrategy = strategies.local(api);
  var session = utils.Middleware();
  var waterlineSession = WaterlineSession(config);
  var store = session.store = waterlineSession.store;
  var cookie = Cookie(config.secret, store);

  passport.use(localStrategy);

  session.use(waterlineSession);
  session.use(passport.initialize());
  session.use(passport.session());

  function login(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return res.fail(err);
      if (!user) {
        return res.reject({ password: 'password or email incorrect' });
      }
      req.user = user;
      beforeLogin(req, res, function(){
        req.logIn(user, function(err) {
          if (err) return res.fail(err);
          afterLogin(req, res, function(){
            return res.success('logged in');    // if external middleware has not returned
          });
        });
      });
    })(req, res, next);
  }

  function logout(req, res, next){

    if(!req.user) return res.success('Already logged out');
    beforeLogout(req, res, function(){
      req.logout();
      return res.success('logged out');    // if external middleware has not returned
    });
  }

  function register(req, res, next) {  // create a user and a userPermission entries
    var user = req.body;
    if(!user.email) return res.reject({ email: errors.email.missing });
    if(!validator.isEmail(user.email)) return res.reject({ email: errors.email.invalid });
    if(!user.password) return res.reject({ password: errors.password.missing });
    if(!(user.password.length > 7)) return res.reject({ password: errors.password.tooShort });
    api.models.user.find({ email: user.email }, function(err, users){
      if(err) return res.fail(err);
      if(users.length) return res.reject({ email: errors.email.exists });
      req.user = user;
      beforeRegister(req, res, function(){
        api.models.user.create(user, function(err, dbUser){
          if(err) return res.fail(err);
          var accessToken = crypto.randomBytes(48).toString('base64');
          api.models.passport.create({
            protocol: 'local',
            userId: dbUser.id,
            password: user.password,
            accessToken: accessToken
          }, function(err, passport){
            if(err) return res.fail(err);
            req.user = dbUser;
            afterRegister(req, res, function(){
              res.json({success: true});
            });
          });
        });
      });
    });
  }

  function authenticateSocket(socket, success, fail){   // pass in a signed cookies string to get the user from the store.
    fail = fail || console.error;
    var cookies = socket.request.headers.cookie;
    if(!cookies) return fail('user not logged in');
    var sessionId = cookie.unsign(cookies);
    session.store.get(sessionId, function(err, session){
        if(err) return fail(err);
        if(session && session.passport && session.passport.user){
          api.models.user.findOne({id: session.passport.user}, function(err, user) {
            if(err) return fail(err);
            if(!user) return fail('cannot find a user');
            afterDeserializeUser(user, function(){
              socket.user = user;
              success();
            });
          });
        }
        else{
          fail('user not logged in');
        }
    });
  }

  function clearUserPassport(userId, callback){
    api.models.passport.destroy({userId: userId}, function(err, passports){
        if(err) console.error(err);
        if(!passports || !passports.length){
          console.error('could not find a passport for userId ' + userId);
        }
        callback();
    });
  }

  function lock(req, res, next){
      if(req.user) return next();
      res.status(401).send('Unauthorized');
  }

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    api.models.user.findOne({id: id}, function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false);
      afterDeserializeUser(user, function(){
        done(null, user);
      })
    });
  });

  return {
    login: login,
    logout: logout,
    register: register,
    passport: passport,
    session: session,
    lock: lock,
    authenticateSocket: authenticateSocket,
    clearUserPassport: clearUserPassport,
    afterLogin: afterLogin.use,
    afterRegister: afterRegister.use,
    beforeLogout: beforeLogout.use,
    afterDeserializeUser: afterDeserializeUser.use,
    beforeLogin: beforeLogin.use,
    beforeRegister: beforeRegister.use
  };
};
