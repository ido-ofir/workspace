
var React = require('react');

function matches(routeArray, hashArray) {  // return an object representing current route and params if it matches the hash
  // console.log(routeArray, hashArray);
  var params, path;
  if(routeArray[0] === hashArray[0]){   // compare ['some', 'route', ':param'] to ['some', 'route', '137']
    params = {};
    path = hashArray.filter((item, index) => {
      if(!index) return false;  // remove the first fragment
      var param = routeArray[index];
      if(!param) return true;
      if(param.indexOf(':') === 0){   // if its a param
        params[param.substr(1)] = hashArray[index];    // store in params   TODO: param key sholud be stripped from query strings and the likes
        return false;
      }
      return true;
    });
    return {  // only if the route matches
      params: params,       // { param: 137 }
      path: path,           // ['route']     <- this will be the path that child routes will match against
      match: routeArray[0]   // 'some'
    };
  }
}
function resolve(routes, path){  // try to match path with one of the routes
  var test, match, child = null;
  for (var i = 0; i < routes.length; i++) {
    test = routes[i];
    match = matches(test.path.split('/'), path);
    if(match){
      if(test.routes){
        child = resolve(test.routes, match.path);  // recurse
      }
      return {  // only if there is a match
        route: test,    // the route that matched
        params: match.params,   // route params or an empty object
        child: child    // the child route or null
      }
    }
  }
}
var Route = React.createClass({ //
  render(){
    var data = this.props.data;
    var route = data.route;
    if(!route) return null;
    var child = null;
    var component = route.component;
    if(data.child){
      child = React.createElement(Route, {data: data.child});
    }
    return React.createElement(component, {params: data.params}, child);
  }
});

var Router = React.createClass({
  tree: {}, // the rendered tree of view components
  getInitialState(){
    return {
      root: {
        route: false,
        params: {},
        child: null
      }
    };
  },
  renderRoute(route, tree){

  },
  render(){
    var { routes, path } = this.props;
    var match = resolve(routes.routes, path);
    if(!match) return <div>no match { new Date().toString() } </div>;
    return (
      <Route data={ match }></Route>
    );
  }
});

module.exports = Router;
