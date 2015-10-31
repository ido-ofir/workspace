
var style = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
};
var FlexCenter = React.createClass({
  render(){
    var props = { ...this.props };
    var propsStyle = props.style || {};
    delete props.style;
    delete props.children;
    return (
      <div { ...props } style={ { ...style, ...propsStyle} }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = FlexCenter;
