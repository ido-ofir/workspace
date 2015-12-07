
var routerMixin = require('./mixins/router.js');
var React = require('react');
var Router = React.createClass({
  mixins: [routerMixin],
  getInitialState(){
    return {
      home: this.props.home
    };
  },
  render(){
    return this.renderContent();
  }
});

module.exports = Router;
