
var React = require('react');

var reform = require('./reform');
var router = require('./router');
var cursor = require('./cursor');
var toggle = require('./toggle');
var select = require('./select');
var style = require('./style');
var element = require('./element');
var app = require('./app');

function mirror(field){
  return {
    contextTypes: {
      app: React.PropTypes.object
    },
    getInitialState(){
      this[field] = this.context.app[field];
    }
  };
}

module.exports = {
  reform: reform,
  router: router,
  cursor: cursor,
  toggle: toggle,
  select: select,
  form: reform.Form,
  input: reform.Input,
  app: app,
  style: style,
  element: element,
  connection: mirror('connection')
};
