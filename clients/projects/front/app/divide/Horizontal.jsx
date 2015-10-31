
var React = require('react');

var HorizontalLine = require('./HorizontalLine.jsx');
var style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  overflow: 'auto',
};
var boxStyle = {
  ...style,
  left: 0,
  right: 0
}

var Horizontal = React.createClass({
  getInitialState(){
    return {
      active: false,
      width: this.props.width || '50%',
      left: 0
    };
  },
  componentDidMount(){
    this.el = React.findDOMNode(this);
    window.addEventListener('mouseup', this.deactivate, false);
  },
  componentWillUnmount(){
    window.removeEventListener('mouseup', this.deactivate, false);
  },
  activate(){
    var el = this.el;
    var left = 0;
    while(el){
      if(!isNaN(el.offsetLeft)){
        left = left + el.offsetLeft;
      }
      el = el.parentNode;
    }
    this.setState({active: true, left: left});
  },
  deactivate(){
    this.setState({active: false});
  },
  onMouseMove(e){
    if(this.state.active){
      var width = ((e.clientX - this.state.left) / this.el.clientWidth * 100) + '%';
      this.setState({
        width: width
      });
    }

  },
  render(){
    var width = this.state.width;
    var leftStyle = {
        ...style,
        left: 0,
        width: width
    };
    var rightStyle = {
        ...style,
        right: 0,
        left: width
    };
    return (
      <div style={ boxStyle } onMouseMove={ this.onMouseMove } ref="box">
        <div style={ leftStyle }>
          { this.props.left }
        </div>
        <HorizontalLine left={ width } onMouseDown={ this.activate }/>
        <div style={ rightStyle }>
          { this.props.right }
        </div>
      </div>
    );
  }
});

module.exports = Horizontal;
