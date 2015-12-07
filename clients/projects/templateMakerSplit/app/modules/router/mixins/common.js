var React = require('react');

module.exports = {
  test(path, hash){
    if(!hash || !path) return false;
    var pathArray = path.split('/');
    var hashArray = hash.split('/');
    var part, params = {};
    for (var i = 0; i < pathArray.length; i++) {
      part = hashArray.shift();
      if(pathArray[i].indexOf(':') === 0){
        params[pathArray[i].substr(1)] = part;
      }
      else{
        if(!(pathArray[i] === part)) return false;
      }
    }
    return {
      params: params,
      hash: hashArray.join('/')
    };
  },
  route(hash){
    var route, match, children = this.props.children;
      if(children){
        if(!Array.isArray(children)){
          children = [children];
        }
        for (var i = 0; i < children.length; i++) {
          match = this.test(children[i].props.path, hash);
          if(match){
            route = this.refs['route' + i];
            if(!route) return console.error('cannor find route ' + children[i].props.path);
            if(this.activeRoute !== route){
              if(!this.activeRoute) {
                route.open(match.hash, match.params);
              }
              else{
                if(children.indexOf(route) > i){
                  this.activeRoute.closeForward();
                  route.openForward(match.hash, match.params);
                }
                else{
                  this.activeRoute.closeBack();
                  route.openBack(match.hash, match.params);
                }
              }
              this.activeRoute = route;
            }
            else{
              route.update(match.hash, match.params);
            }
            return true;
          }
        }
      }
  }
};
