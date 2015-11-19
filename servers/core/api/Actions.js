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
    }
  };
  return actions;
}
