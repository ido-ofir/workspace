
var Route = require('./Route.js');
var RouteAction = require('./RouteAction.js');

module.exports = function(schemas, orm, config){
    var schema, model, route, action;
    var api = {
      models: orm.collections,
      routes: {},
      actions: {}
    };

    for(var name in schemas){
      model = orm.collections[name.toLowerCase()];
      if(model) {
        route = new Route(name);
        action = new RouteAction(model);
        api.routes[name] = route;
        api.actions[name] = action;
      }
      else console.error('cannot load model ' + name);
    }

    return api;
};
