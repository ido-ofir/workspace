
var React = require('react');

var Header = React.createClass({
  render(){
    var style = {
      height: (this.props.height || '50px'),
      borderBottom: '1px solid #ddd',
      ...this.props.style
    };
    return (
      <div style={ style }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Header;
