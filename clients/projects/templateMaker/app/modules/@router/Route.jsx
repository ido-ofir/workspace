
var React = require('react');
var routeMixin = require('./mixins/route.js');
var Route = React.createClass({
  mixins: [routeMixin],
  render(){

    if(!this.state.routeIsActive) return null;
    return (
      <div style={ this.state.routeStyle }>
        { this.renderContent() }
      </div>
    );
  }
});

module.exports = Route;
