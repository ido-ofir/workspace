
var React = require('react');
var mixins = require('baobab-react/mixins');

var Element = require('./Element.jsx');
var DropElement = require('./DropElement.jsx');
var { Drop } = require('./modules/dnd');

var style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

var DropPad = React.createClass({
  mixins: [mixins.branch],
  cursors: {
    element: ['element']
  },
  render(){
    return (
        <DropElement cursor={ this.cursors.element }/>
    );
  }
});

module.exports = DropPad;
