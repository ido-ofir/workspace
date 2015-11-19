var React = require('react');

var Box = React.createClass({
  render(){
    var style = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        WebkitOverflowScrolling: 'touch',
        overflow: 'hidden',
        ...this.props.style
    };
    if('scroll' in this.props){
      style.overflowY = 'scroll';
    }
    return (
      <div { ...this.props } style={ style }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Box;
