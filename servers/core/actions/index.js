var Action = require('./Action.js');

function sequence(action, listeners, cb){  // run all listeners, passing action. call action.next() to continue.
  if(!listeners) return cb();
  var i = listeners.length;
  if(!i) return cb();
  function run(){
    i--;
    var f = listeners[i];
    action.next = i ? run : cb;
    f(action);
  }
  run();
}

function serialize(action){
  var actions = action.actions.map(function(action){
    return serialize(action);
  });
  return {
    isDone: action.isDone,
    path: action.path,
    request: action.request,
    response: action.response,
    actions: actions
  };
}

module.exports = function(core){

  var before = {};
  var after = {};
  var methods = {};

  function find(target, path){
    if(!target || !path) return;
    var name = path[0];
    if(path.length === 1) return { target: target, name: name, value: target[name] };
    return find(target[name], path.slice(1));
  }

  var actions = {
    define(name, method){
      methods[name] = method;
    },
    run(path, data, user, callback){
        if(typeof path === 'string'){
          path = path.split('.');
          if(!path[1]) path = path[0].split('/');
        }
        var id, action, method, found = find(methods, path);
        if(!found) return null;
        if(found.value instanceof Function) {
          id = path.join('.');
          action = new Action(path, data, user, function(err, data){
            if(err) return callback(err);
            sequence(action, after[id], function(){
              callback(null, action.response);
            });
          });
          sequence(action, before[id], function(){
            found.target[found.name](action);  // call method with context
          });
          return action;
        }
        return null;
    },
    before(path, listener){
      if(Array.isArray(path)) path = path.join('.');
      if(typeof path !== 'string'){
        return console.error(`path is not valid - ${path}`);
      }
      if(!before[path]) before[path] = [];
      before[path].push(listener);
    },
    after(path, listener){
      if(Array.isArray(path)) path = path.join('.');
      if(typeof path !== 'string'){
        return console.error(`path is not valid - ${path}`);
      }
      if(!after[path]) after[path] = [];
      after[path].push(listener);
    },
    serialize(action){
      var serial = serialize(action);
      serial.user = action.user;
      return serial;
    }
  };

  return actions;
}
