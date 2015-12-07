
var React = require('react');

var style = {
  position: 'absolute',
  left: 0,
  right: 0
};

var handleStyle = {
  ...style,
  top: '-10px',
  bottom: '-10px',
  cursor: 'ns-resize'
};
var markerStyle = {
  ...style,
  top: '10px',
  height: '1px',
  background: '#ddd'
};

var VerticalLine = React.createClass({
  render(){
    var centerStyle = {
      ...style,
      top: this.props.top,
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

module.exports = VerticalLine;
