
var React = require('react');

var Box = React.createClass({
  render(){
    var children = this.props.children;

    var style = {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        WebkitOverflowScrolling: 'touch',
        overflowY: ('scroll' in this.props ? 'scroll' : 'auto'),
        ...this.props
    };
    delete style.children;
    return (
      <div style={ style }>
        { children }
      </div>
    );
  }
});

module.exports = Box;
