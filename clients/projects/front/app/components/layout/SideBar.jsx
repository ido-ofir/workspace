
var React = require('react');

var SideBar = React.createClass({
  render(){
    var style = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom : 0,
      width: (this.props.width || '200px'),
      borderRight: '1px solid #ddd',
    };
    return (
      <div style={ style }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = SideBar;
