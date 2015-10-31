

var styles = {
  wrapper: {
    position: 'absolute',
    top: '-66px',
    left: 0,
    right: 0,
    zIndex: 10,
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.7)',
    transition: '0.2s ease',
    WebkitTransition: '0.2s ease',
    transform: 'translate3d(0, 0, 0)',
    WebkitTransform: 'translate3d(0, 0, 0)',
    color: '#fff'
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    transform: 'rotateZ(45deg)',
    WebkitTransform: 'rotateZ(45deg)',
  },
  content: {},
};

var Notification = React.createClass({
  getInitialState(){
    return {
      isOpen: false,
      content: '',
      selected: false,
      onClick: false
    };
  },
  close(){
    this.setState({
      isOpen: false
    });
    setTimeout(this.empty, 500)
  },
  empty(){
    this.setState({
      content: ''
    });
  },
  animateOpen(){
    this.setState({
      isOpen: true
    });
  },
  open(content, onClick){
    this.setState({
      content: content,
      onClick: onClick
    });
    setTimeout(this.animateOpen, 100);
  },
  onClick(){
    this.close();
    if(this.state.onClick) {
      setTimeout(this.state.onClick, 300)
    }
  },
  render(){
    var trans = `translate3d(0, ${this.state.isOpen ? '65px' : '0'}, 0)`
    var wrap = { ...styles.wrapper, transform: trans, WebkitTransform: trans };
    return (
      <div style={ wrap } onClick={ this.onClick }>
        <div className={ `icon icon-plus` } style={ styles.close } onClick={ this.close }></div>
        { this.state.content }
      </div>
    );
  }
});

module.exports = Notification;
