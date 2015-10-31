var React = require('react');

module.exports = {
  routes: [],
  childContextTypes: {
    router: React.PropTypes.object
  },
  getChildContext() {
    return { router: this };
  },
  register(route){
    console.dir(route);
    this.routes.push(route);
  },
  unregister(route){
    this.routes.splice(this.routes.indexOf(route), 1);
  },
  renderContent(){
    var component = this.props.component;
    if(component) return React.createElement(component);
    if(this.props.render) return this.props.render();
    if(typeof this.props.children === 'function') return this.props.children(this);
    return this.props.children;
  },
  getParams(path, hash){
    var params = {};
    for (var i = 0; i < path.length; i++) {
      if(path[i].indexOf(':') === 0){
        params[path[i].substr(1)] = hash[i];
      }
      else{
        if(!(path[i] === hash[i])) return false;
      }
    }
    return params;
  },
  findRoute(hash){
    var routes = this.routes;
    var path, params, route;
    var hashPart = (hash.indexOf('/') === 0) ? hash.split('/')[1] : hash.split('/')[0];
    var routePart;
    for (var i = 0; i < routes.length; i++) {
      route = routes[i].props.route;
      routePart = (route.indexOf('/') === 0) ? route.split('/')[1] : route.split('/')[0];
      if(hashPart === routePart){
        return routes[i];
      }
    }
  },
};
