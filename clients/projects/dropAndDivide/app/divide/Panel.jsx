
var React = require('react');

var style = {
  position: 'absolute',
  left: 0,
  right: 0
};
var boxStyle = {
  ...style,
  top: 0,
  bottom: 0
};
var headerStyle = {
  ...style,
  top:0,
  height: '14px',
  background: '#333',
  display: 'flex',
  alignItems: 'center'
};
var contentStyle = {
  ...style,
  top: '14px',
  bottom: 0
};
var btnStyle = {
  maxWidth: '8px',
  height: '8px',
  margin: '0 4px',
  background: '#fff'
};

var Panel = React.createClass({
  render(){
    return (
      <div style={ boxStyle }>
        <div style={ headerStyle }>
          <div style={ btnStyle }>

          </div>
        </div>
        <div style={ contentStyle }>

        </div>
      </div>
    );
  }
});

module.exports = Panel;
