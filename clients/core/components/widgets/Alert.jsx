var React = require('react');
var styles = {
  wrapper: {
    position: 'absolute',
    top: '-500',
    left: '-500px',
    right: '-500px',
    bottom: '-500px',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.7)',
    transition: '0.2s ease',
    WebkitTransition: '0.2s ease',
    transform: 'scale(1.2)',
    WebkitTransform: 'scale(1.2)',
    opacity: 0
  },
  panel: {
    minWidth: '166px',
    minHeight: '100px',
    background: 'rgb(37,37,37)',
    color: '#fff',
    border: '1px solid rgb(30,30,30)'
  },
  content: {
    minHeight: '50px',
    padding: '20px'
  },
  button: {
    lineHeight: '50px',
    textAlign: 'center',
    borderTop: '1px solid rgb(220,220,220)'
  }
};

var Alert = React.createClass({
  getInitialState(){
    return {
      isOpen: false,
      content: '',
      selected: false,
      phase: null
    };
  },
  close(){
    this.hide();
    setTimeout(()=>{
      this.setState({
        isOpen: false,
        content: '',
        selected: false,
        phase: null
      });
    },400)
  },
  open(content){
    this.setState({
      isOpen: true,
      content: content,
      selected: false
    });
    setTimeout(this.show, 100);
  },
  show(){
    this.setState({
      phase: 'in'
    });
  },
  hide(){
    this.setState({
      phase: 'out'
    });
  },
  ok(){
    this.setState({
      selected: true
    });
    setTimeout(this.close ,20)
  },
  render(){
    if(!this.state.isOpen) return null;
    var selected = this.state.selected;
    var phase = this.state.phase;
    var wrapperStyle = { ...styles.wrapper };
    if(phase){
      if(phase === 'in'){
        wrapperStyle.transform = 'scale(1)';
        wrapperStyle.WebkitTransform = 'scale(1)';
        wrapperStyle.opacity = 1;
      }
      else{
        wrapperStyle.transform = 'scale(0.8)';
        wrapperStyle.WebkitTransform = 'scale(0.8)';
        wrapperStyle.opacity = 0;
      }
    }
    var btn = {
      background: (selected ? '#fff' : 'none'),
      color: (selected ? '#000' : '#fff')
    };
    return (
      <div style={ wrapperStyle }>
        <div style={ styles.panel }>
          <div style={ styles.content }>
            { this.state.content }
          </div>
          <div style={{ ...styles.button, ...btn }} onClick={ this.ok }>
            OK
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Alert;
