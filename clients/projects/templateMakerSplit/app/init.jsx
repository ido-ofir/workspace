var Baobab = require('baobab');
var React = require('react');
var App = require('./App');
var ReactDom = require('react-dom');
var tree = window.tree = new Baobab({
  element: {
    type: 'Box',
    props: { padding: '50px' },
    children: []
  }
});
ReactDom.render(<App tree={ tree }/>, document.getElementById('app'));
