
function Action(path, data, user, callback){
  this.path = path;
  this.data = data;
  this.user = user;
  this.callback = callback;
  this.actions = [];
}

Action.prototype = {
  find(collection, data, cb){
    var action = Action(['db', collection, 'find'], data, this.user, cb);
    core.actions.run(action);
  },
  create(collection, data, cb){},
  update(collection, data, cb){},
  delete(collection, data, cb){

  },
  action(route, data, cb){},
  done(data){
    this.callback({
      success: true,
      data: data
    });
  },
  fail(data){
    this.callback({
      success: false,
      data: data
    });
  },
  reject(reject){
    this.fail({
      reject: reject
    });
  },
  error(error){
    this.fail({
      error: error
    });
  }
};

module.exports = function(core){

  var actions = {};

  function find(target, path){
    if(!target || !path) return;
    var name = path[0];
    if(path.length === 1) return target[name];
    return find(target[name], path.slice(1));
  }

  function method(path, method){
    core.app.post('/' + path.join('/'), function(req, res, next){
      var action = Action(path, req.body, req.user, function(data){
        res.json(data);
      });
      method(action);
    });
  }

  function define(path, any){
    if(any instanceof Function){
      method(path, any);
    }
    else if(any instanceof Object){
      for(var m in any){
        define(path.concat([m]), any[m]);
      }
    }
  }

  return {
    run: function(action){   // sockets that send a { type: action } will route to the relevant action.
        var found = find(actions, action.path);
        if(found instanceof Function) found(action);
        else action.fail('incorrect path - ' + action.path);
    },
    define: function(name, method){
      actions[name] = define([name], method);
    }
  };
}
