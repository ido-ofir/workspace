
var style = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
};
var FlexRow = React.createClass({
  render(){
    var propsStyle = this.props.style || {};
    return (
      <div style={ { ...style, ...propsStyle} }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = FlexRow;
