
var React = require('react');

function matches(routeArray, hashArray) {
  console.log(routeArray, hashArray);
  var params, path;
  if(routeArray[0] === hashArray[0]){
    params = {};
    path = hashArray.filter((item, index) => {
      if(!index) return false;
      var param = routeArray[index];
      if(!param) return true;
      if(param.indexOf(':') === 0){
        params[param.substr(1)] = hashArray[index];
        return false;
      }
      return true;
    });
    return {
      params: params,
      path: path,
      match: routeArray[0]
    };
  }
}
function resolve(route, path){
  var test, match, child = null;
  for (var i = 0; i < route.routes.length; i++) {
    test = route.routes[i];
    match = matches(test.path.split('/'), path);
    if(match){
      if(test.routes){
        child = resolve(test, match.path);
      }
      return {
        route: test,
        params: match.params,
        child: child
      }
    }
  }
}
var Route = React.createClass({
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
  getInitialState(){
    return {
      root: {
        route: false,
        params: {},
        child: null
      }
    };
  },
  onHashChange(){
    var hash = location.hash.substr(1);
    var path = hash.split('/').filter(n => n);
    var root = resolve(this.props.root, path);
    if(!root) {
      console.log('ok');
      location.hash = this.props.root.default;
      return;
    }
    this.setState({ root: root });
  },
  componentDidMount(){
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },
  componentWillUnmount(){
    window.removeEventListener('hashchange', this.onHashChange);
  },
  render(){
    var root = this.state.root;
    if(!root || !root.route) return null;
    return (
      <Route data={ root }></Route>
    );
  }
});

module.exports = Router;
