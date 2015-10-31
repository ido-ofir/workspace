
/*

   api Collection module.
   the module produces an object for server side access which has the following methods:

      create (item, success, fail) {}
      update (item, success, fail) {} // item must have a valid id or _id
      find (object, success, fail) {}
      delete (id, success, fail) {}

      the module will emit events both on the api and on the module itself for every action that it does.
      this module will also have a 'model' field which is the waterline model.

* */


/*

function Action(event: Object, next: function, fail: function)

  creates a callback function for db operations.
  if successful event.data will be set and next() will be called.
  if the operation returned an error, fail(error) will be called instead.

*/


function exec(action, next){
  return function(err, data){
      if(err) return action.error(err);
      action.data = data;
      next();
  }
}

var Actions = require('./Actions.js');

module.exports = function(name, model, router, run){
    //console.log('defining route ', name);
    var actions = Actions()
    var collection = {
      actions: actions,
      model: model,
      name: name,
      before(actionName, listener){
        actions.before[actionName].use(listener);
      },
      after(actionName, listener){
        actions.after[actionName].use(listener);
      },
      create(action){
          if(!action.data) action.data = {};
          run('create', collection, action, function(next){
              model.create(action.data, exec(action, next));
          });
      },
      update(action){
        if(!action.data.update) return action.fail('"update" method of api requires an "update" param');
        if(!action.data.target) return action.fail('"update" method of api requires a "target" param');
        run('update', collection, action, function(next){
            delete action.data.update.id;   // dont pass id to update
            model.update(action.data.target, action.data.update, exec(action, next));
        });
      },
      find(action){
        run('find', collection, action, function(next){
            model.find(action.data, exec(action, next));
        });
      },
      delete(action){
        run('delete', collection, action, function(next){
            model.destroy(action.data, exec(action, next));
        });
      },
      route(url) {
        return router.route('/' + name + url);
      }
    };

    return collection;
};
