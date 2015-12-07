
var common = require('./mixins/common.js');
var React = require('react');
var Route = require('./Route.jsx');
var Router = React.createClass({
  mixins: [common],
  onHashChange(){
    var hash = location.hash.substr(1);
    if(!this.route(hash)){
      location.hash = this.props.home || this.children[0].props.path;
    }
  },
  componentDidMount(){
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },
  componentWillUnmount(){
    window.removeEventListener('hashchange', this.onHashChange);
  },
  renderRoute(child, index){
    var children = child.props.children;
    var match = this.test(child.props.path, location.hash.substr(1));
    var props = { ...child.props, ref: 'route' + index, key: index };
    delete props.children;
    if(match){
      props.params = match.params;
      props.hash = match.hash;
    }
    return React.createElement(Route, props, children)
  },
  render(){
    var children = this.props.children;
    if(!children) return null;
    if(!Array.isArray(children)){
      children = [children];
    }
    return (
      <div>
        { children.map(this.renderRoute) }
      </div>
    );
  }
});

module.exports = Router;
