
var async= require('async');
function Args(args){
  return [].slice.call(args);
}
function isFunction(f){
  return (f instanceof Function);
}

function Action(path, data, user, callback){
  console.log('creating action ', path);
  this.path = path;
  this.request = data;
  this.user = user;
  this.resolve = callback;
  this.actions = [];
  this.isDone = false;
}

Action.prototype = {
  run(path, data, cb){ /// try catch

    if(typeof path === 'string'){
      path = path.split('.');
      if(!path[1]) path = path[0].split('/');
    }
    if(!data) data = {};
    var parent = this;
    var child = core.actions.run(path, data, this.user, function(err, res){
      if(err) return parent.fail(err);
      cb(res);
    });
    this.actions.push(child);
  },
  find(collection, data, cb){
    var args = Args(arguments);
    if(!cb){
      cb = data;
      data = {};
    }
    this.run(['api', collection, 'find'], data, cb);
  },
  create(collection, data, cb){
    delete data.id;
    this.run(['api', collection, 'create'], data, cb);
  },
  update(collection, target, update, cb){
    this.run(['api', collection, 'update'], { target: target, update: update }, cb);
  },
  delete(collection, data, cb){
    this.run(['api', collection, 'delete'], data, cb);
  },
  done(data){
    this.response = data;
    this.isDone = true;
    this.resolve(null, data);
  },
  fail(data){
    if(typeof data !== 'object'){
      data = { type: 'fail', data: data };
    }
    this.response = data;
    this.resolve(data);
  },
  reject(reject){
    this.fail({ type: 'reject', data: reject });
  },
  error(error){
    this.fail({ type: 'error', data: error });
  }

};
module.exports = Action;
