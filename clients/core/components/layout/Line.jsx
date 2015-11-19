
var React = require('react');
var lineStyle = {
  margin: '20px 0'
}

var Line = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    var style = { ...lineStyle, ...this.props.style };
    return (
      <div style={ style }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Line;
