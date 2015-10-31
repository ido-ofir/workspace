
var Box = require('./Box.jsx');

var arrowImage = (<img src={ arrow } style={{ width: '16px'}}/>);

var headerStyle = {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
      height: '57px',
      color: '#fff',
      zIndex: 1,
      backgroundColor: '#00b0ca',
      fontWeight: 100,
      fontSize: '18px'
  };

  var arrowStyle = {
    base: {
      display: 'flex',
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems:'center',
      padding: '0 14px'
    },
    left: {
      left: 0,
      fontSize: '16px'
    },
    right: {
      right: 0,
      fontSize: '16px'
    }
  }

  var Header = React.createClass({

    renderLeft(){
      if(!this.props.left) return null;

      return (
        <Arrow side="left" to={ this.props.left.to } width={ this.props.height }>{ this.props.left.content || arrowImage }</Arrow>
      );
    },
    renderRight(){
      if(!this.props.right) return null;
      return (
        <Arrow side="right" to={ this.props.right.to } width={ this.props.height }>{ this.props.right.content || arrowImage }</Arrow>
      );
    },
    render(){
      return (
        <div style={ headerStyle }>
          { this.renderLeft() }
          { this.props.children }
          { this.renderRight() }
        </div>
      );
    }
  });

var Arrow = Radium(React.createClass({
  goToState(){
      if(this.props.to) location.hash = this.props.to;
  },
  render(){
    var style = [arrowStyle.base, arrowStyle[this.props.side], {width: this.props.width} ];

    return (
      <div style={ style } onClick={ this.goToState } { ...this.props }>
        { this.props.children }
      </div>
    );
  }
}));

module.exports = Radium(Header);
