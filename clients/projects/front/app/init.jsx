var Baobab = require('baobab');
var React = require('react');
var App = require('./App');



var element = {
  type: 'Box',
  props: { padding: '50px' },
  children: [{
    type: 'Test',
    props: { index: 1 },
    children: ['hello', 'world']
  }]
};

var state = new Baobab({
  element: element
});
React.render(<App tree={ state }/>, document.getElementById('app'));
