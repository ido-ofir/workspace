
var router = require('./router.js');
var route = require('./route.js');

module.exports = {
    router: router,
    route: route
};



/*
var Emitter = require('../Emitter.js');

module.exports = function(routes){
  var context = routes;
  function getParams(path, hash){
    var params = {};
    for (var i = 0; i < path.length; i++) {
      if(path[i].indexOf(':') === 0){
        params[path[i].substring(1)] = hash[i];
      }
      else{
        if(!(path[i] === hash[i])) return false;
      }
    }
    return params;
  }
  function find(hash){
    var hash = hash.split('/');
    var path, params, route;
    for (var name in routes) {
      path = name.split('/');
      params = getParams(path, hash);
      if(params){
        return {
          route: routes[name],
          params: params
        }
      }
    }
  }
  var router = Emitter({
    path: '',
    default: '/',
    route(hash) {
      var handler, route;
      route = find(hash);
      if(!route) route = find(router.default);
      if(route){
        handler = route.route.call(context, route.params);
        router.current = handler;
        router.path = hash;
        router.emit('route', handler);
      }
      else{
        console.error('could not find route ' + hash + ' and there is no default route');
      }
    },
    with(_context){
      context = _context;
      return router;
    },
    otherwise(defaultRoute){
      router.default = defaultRoute;
      return router;
    },
    to(path){
      var hash = (path.indexOf('#') < 0) ? ('#' + path) : path;
      if(location.href === hash) {
        router.route(path);
      }
      else location.href = hash;
    },
    home(){
      router.to(router.default);
    }
  });
  window.addEventListener('hashchange', () => {
    router.route(location.hash.substr(1));
  });
  router.route(location.hash.substr(1));
  return router;
}
*/
