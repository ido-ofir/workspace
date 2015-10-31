
var style = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '57px',
    background: '#fff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    padding: '10px 0'
}


var Footer = React.createClass({
  render(){
    return (
      <div style={ style }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Footer;
