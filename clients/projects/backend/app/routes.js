
var A = require('./views/A.jsx');
var B = require('./views/B.jsx');
var C = require('./views/C.jsx');
var StyleTest = require('./views/StyleTest.jsx');
var Login = require('./views/Login.jsx');



module.exports = {
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
  },{
    path: 'style',
    component: StyleTest
  }],
  default: 'routeA'
};
