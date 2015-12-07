var React = require('react');
var PropTypes = React.PropTypes;
var Connection = require('../../modules/connection')
var style = require('./style.js');
var dom = require('./dom.js');
module.exports = {
  getInitialState(){
    var config = this.config;
    var connection = window.connection = Connection(config);
    return {
      app: {
        connection: connection,
        style: style,
        dom: dom
      }
    };
  },
  childContextTypes: {
    app: PropTypes.object
  },
  getChildContext(){
    return {
      app: this.state.app
    };
  }
}
