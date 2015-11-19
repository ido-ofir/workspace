var React = require('react');

var Icon = React.createClass({
  render(){
    var props = this.props;
    var propsStyle = props.style || {};
    var type = props.type || 'unknown';
    if(props.size){
      propsStyle.fontSize = props.size;
    }
    return (
      <div { ...props } className={ `icon icon-${type}` } style={ propsStyle }>
        { props.children }
      </div>
    );
  }
});

module.exports = Icon;
