
var React = require('react');
var ReactDom = require('react-dom');

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
    this.el = ReactDom.findDOMNode(this);
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
  renderLeft(width){
    var leftStyle = {
        ...style,
        left: 0,
        width: width
    };
    var child = this.props.children ? (this.props.children[0] || null) : null;
    return (
      <div style={ leftStyle }>
        { child }
      </div>
    );
  },
  renderRight(width){
    var rightStyle = {
        ...style,
        right: 0,
        left: width
    };
    var child = this.props.children ? (this.props.children[1] || null) : null;
    return (
      <div style={ rightStyle }>
        { child }
      </div>
    );
  },
  render(){
    var width = this.state.width;
    return (
      <div style={ boxStyle } onMouseMove={ this.onMouseMove } ref="box">
        { this.renderLeft(width) }
        <HorizontalLine left={ width } onMouseDown={ this.activate }/>
        { this.renderRight(width) }
      </div>
    );
  }
});

module.exports = Horizontal;
