var React = require('react');
var PropTypes = React.PropTypes;

var ArrowHead = React.createClass({
  render: function() {
    var isOpen = this.props.isOpen;
    var r = `rotate(${isOpen ? '90deg' : '0'})`
    var style = {
      margin: '0px 4px',
      width: '10px',
      transform: r,
      WebkitTransform: r
    };
    return (
      <img src="images/arrow.png" style={ style }/>
    );
  }

});

module.exports = ArrowHead;
