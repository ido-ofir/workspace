module.exports = function(){

var Middleware = require('../utils').Middleware;

  var actions = {
    before: {
      create: Middleware(),
      update: Middleware(),
      delete: Middleware(),
      find: Middleware()
    },
    after: {
      create: Middleware(),
      update: Middleware(),
      delete: Middleware(),
      find: Middleware()
    },
    register(stage, name, listener){
      if(Array.isArray(stage)){
        return stage.map(function(s){
          actions.register(s, name, listener)
        });
      }
      if(!actions[stage]) return console.error(`"${stage}" should be "before" or "after"`);
      if(!actions[stage][name]) return console.error(`"${name}" is not a valid api action`);
      actions[stage][name].push(listener);
    }
  };
  return actions;
}
