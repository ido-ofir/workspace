
var Ajax = require('./ajax');
var Socket = require('./socket');
var Emitter = require('../../utils/Emitter.js');
var utils = require('./utils.js');

module.exports = function(config){
  config = config || {};
  var ajax = Ajax(config);
  var socket, connected = false;

  var connection = Emitter({
    ajax: ajax,
    test: function(success, fail){
      ajax.get('/test', {}, success, fail);
    },
    config(_config){
      for(var m in _config){
        config[m] = _config[m];
      }
    },
    connect(success, fail){
      if(socket && socket.close) socket.close();
      socket = Socket(`${config.domain}:${config.port}`, (message)=>{
        var msg = utils.parse(message);
        if(msg || msg.type){
          if(msg.type === 'response') socket.response(msg);
          else if(msg.type === 'authorize') {
            connected = true;
            if(success) success(msg.data);
            else console.log(`connected to ${config.domain}:${config.port}`);
          }
          connection.emit(msg.type, msg.data, msg);
        }
      }, ()=>{
        connection.emit('close');
      });

      setTimeout(function(){
        if(!connected){
          if(fail) fail(`could not connect to ${config.domain}:${config.port}`);
          else console.error(`could not connect to ${config.domain}:${config.port}`);
        }
      },2000)
    },
    login: function(loginData, success, fail){
      ajax.post(`/login`, loginData, function(res){
          connection.connect(success);  // connect with socket
      }, fail);
    },
    register: function(regData, success, fail){
      ajax.post(`/register`, regData, function(res){
        connection.connect(success);  // connect with socket
      }, fail);
    },
    logout: function(success, fail){
      ajax.post(`/logout`, {}, success, fail);
    },
    api: {
      create(collection, data, success, fail){
        connection.action(['api', collection, 'create'], [data], success, fail);
      },
      find(collection, data, success, fail){
        connection.action(['api', collection, 'find'], [data], success, fail);
      },
      update(collection, target, update, success, fail){
        connection.action(['api', collection, 'delete'], [target, update], success, fail);
      },
      delete(collection, data, success, fail){
        connection.action(['api', collection, 'delete'], [data], success, fail);
      },
    },
    action(path, data, success, fail){
      if(!path) return fail('cannot request action, path parameter is not valid');
      if(typeof path === 'string'){
        path = path.split('.');
        if(path.length === 1) path = path[0].split('/');
      }
      if(connected) socket.action(path, data, success, fail);
      else ajax.action(path, data, success, fail);
    }
  });
  return connection;
};
