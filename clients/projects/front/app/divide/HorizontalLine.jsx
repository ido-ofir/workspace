
var React = require('react');

var style = {
  position: 'absolute',
  top: 0,
  bottom: 0
};

var handleStyle = {
  ...style,
  left: '-10px',
  right: '-10px',
  cursor: 'ew-resize'
};
var markerStyle = {
  ...style,
  left: '10px',
  width: '1px',
  background: '#ddd'
};

var HorizontalLine = React.createClass({
  render(){
    var centerStyle = {
      ...style,
      left: this.props.left,
      zIndex: 2
    };
    return (
      <div style={ centerStyle } onMouseDown={ this.props.onMouseDown }>
        <div style={ handleStyle }>
          <div style={ markerStyle }></div>
        </div>
      </div>
    );
  }
});

module.exports = HorizontalLine;
