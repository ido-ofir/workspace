


var Core = require('../../core');
var Config = require('./config');
var async = require('async');
Config(function(config) {
  Core(config, function(core){  // 'core' module is now global and initiated
    core.actions.define('stuff', function(action){
      // action.done('ok');
      action.find('user', function(users){
        action.done(users);
      });
    });
    core.actions.before('stuff', function(action){
      console.log('before stuff');
      action.next();
    });
    core.actions.before('api.user.find', function(action){
      console.log('before api.user.find');
      action.next();
    });
    core.actions.after('stuff', function(action){
      console.log('after stuff');
      action.next();
    });
    core.actions.after('api.user.find', function(action){
      console.log('after api.user.find');
      action.next();
    });
  });
})
