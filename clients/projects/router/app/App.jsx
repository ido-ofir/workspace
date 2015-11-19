
var React = require('react');
var core = require('core');
var Box = core.components.layout.Box;
var mixins = require('baobab-react/mixins');

var A = require('./routes/A.jsx');
var B = require('./routes/B.jsx');
var C = require('./routes/C.jsx');
var Login = require('./routes/Login.jsx');
var Router = require('./Router.jsx');
var Connection = core.modules.connection;
var connection = window.connection = Connection({
  domain: 'http://localhost',
  port: 4000,
  transport: 'websocket',
  api: {
    path: '/api'
  }
});
var root = {
  routes: [{
    path: 'routeA/:koko',
    component: A,
    routes: [{
      path: 'routeC',
      component: C,
    }]
  },{
    path: 'login',
    component: Login
  }],
  default: 'routeA'
};





module.exports = React.createClass({
    mixins: [mixins.root],
    render () {
        return (
          <Box>
            <Router root={ root }/>
          </Box>
        );
    }
});
