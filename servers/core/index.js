

var express = require('express');

var Orm = require('./orm');
var Bootstrap = require('./bootstrap');
var Authentication = require('./authentication');
var Api = require('./api');
var Sockets = require('./sockets');
var Actions = require('./actions');
var Permissions = require('./permissions');
var Groups = require('./groups');
var Schemas = require('./schemas');
var utils = require('./utils');

module.exports = function(config, schemas, callback){
  var schemas = Schemas(config.schemas);
  Orm(schemas, config.orm, function(orm){
    var bootstrap = Bootstrap();
    var app = express();
    var api = Api(schemas, orm, config);
    var auth = Authentication(api, permissions, config.authentication);
    var sockets = Sockets(app);
    var permissions = Permissions(api);    // user permissions are handled in-memory by the permissions module.
    var groups = Groups(api);    // user groupss are handled in-memory by the groups module.
    var core = global.core = {
      orm: orm,
      utils: utils,
      app: app,
      api: api,
      auth: auth,
      sockets: sockets,
      permissions: permissions,
      groups: groups
    };
    var actions = core.actions = Actions(core);

    // override core.authorize to return custom data to users after successful login
    core.authorize = function(socket, done){
      done(socket.user);
    };

    app.use(bootstrap);  // normal express bootstrap. TODO: bootsrap based on config

    app.use(auth.session);  // restore session data, if exists, as req.user

    app.get('/test', function(req, res, next){
      if(req.user) res.success(true);
      else res.fail(false);
    });
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    app.post('/register', auth.register);

    actions.define('db', function(action){
      api.action(action);
    });
    app.use('/rest', function(req, res, next){
      if(config.app.authorize) auth.lock(req, res, next);    // a user must be logged in to access the api.
      else next();
    }, api.router);

    auth.afterRegister(function(req, res, done){   // after a user has succesfully registered, req.user is the user.
        console.log('registered', req.user.name);
        api.models.userpermission.create({ // create a new, basic permission for the user.
          userId: req.user.id,
          permissions: ['basic']
        }, function(err){
          if(err) return res.error(err);
          if(config.loginAfterRegister) auth.login(req, res, done);   // continue to login the user.
          else done();
        });
    });
    auth.beforeLogin(function(req, res, done){
        console.log('logging in', req.user.name);
        done();
    });
    auth.afterLogin(function(req, res, done){
        console.log('logged in', req.user.name);
        done();
    });
    auth.beforeLogout(function(req, res, done){
        console.log('logging out', req.user.name);
        sockets.disconnectOrigin(req.headers.origin);  // disconnect client socket on logout.
        done();
    });
    auth.afterDeserializeUser(function(user, done){     // this runs for every valid request, after a user has been succefully deserialized from the database,
        //console.log('deserialized', user.name);        // but before it was marked as authenticated. you can add stuff to user if you like.
      done();
    });



    api.routes.user.after('delete', function(action, done){   // when users are deleted, delete their passports and permissions too.
      if(!action.data.length) return done();
      utils.forEach(action.data, function(deletedUser, index, next){  // async forEach
        auth.clearUserPassport(deletedUser.id, function(){
          // action.delete('userPermission', { userId: deletedUser.id }, function(err){})
          api.models.userpermission.destroy({
            userId: deletedUser.id
          }, function(err){
            if(err) console.error(err);
            next();
          });
        });
      }, done);
    });
    api.after(['create', 'update', 'delete'], function(action, done){
      console.log(action.user.name + ' has ' + action.method + 'd a ' + action.collection);
      done();
    });

    sockets.on('connection', function (socket) {           // fired for every incoming socket connection.
      auth.authenticateSocket(socket, function(){               // authenticate the socket request. a client must be logged to connect to the socket server.
        console.log('socket connected - ' + socket.user.name);  // if authentication passed, this function is called and socket.user is the already logged in user.
        sockets.authorize(socket);
      }, function(err){
        console.log('a socket has failed authentication:', err);     // if authentication failed, close the socket.
        socket.close()
      });
    });

    sockets.on('authorize', function(socket){              // this socket has passed authentication and socket.user is the user of the socket.
      core.authorize(socket, function(data){              // override core.authorize in your app code
        socket.json({                       // this is the first message an authenticated socket will recieve.
          type: 'authorize',
          data: data
        });
      });
    });

    sockets.on('action', actions.run);

    permissions.load(function(){                    // load and cache users permissions from the database
      groups.load(function(){
        sockets.listen(config.port, function(){         // start the server
            console.log("listening at " + config.domain + ":" + config.port);
            callback(core);
        });
      })
    });
  });
}
