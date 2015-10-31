
var routeMixin = require('../../mixins/router/route.js');
var Box = require('../layout/Box.jsx');

var Route = React.createClass({
  mixins: [routeMixin],
  render(){
    if(!this.state.routeIsActive) return null;
    var props = {
      style: {
        ...this.state.routeStyle
      }
    };
    if('scroll' in this.props) props.scroll = true;
    return React.createElement(Box, props, this.renderContent());
  }
});

module.exports = Route;
