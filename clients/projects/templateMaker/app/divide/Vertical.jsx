
var React = require('react');
var ReactDom = require('react-dom');

var VerticalLine = require('./VerticalLine.jsx');
var style = {
  position: 'absolute',
  left: 0,
  right: 0,
  overflow: 'auto',
};
var boxStyle = {
  ...style,
  top: 0,
  bottom: 0
};

var Vertical = React.createClass({
  getInitialState(){
    return {
      active: false,
      height: this.props.height || '50%',
      top: 0
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
    var top = 0;
    while(el){
      if(!isNaN(el.offsetTop)){
        top = top + el.offsetTop;
      }
      el = el.parentNode;
    }
    this.setState({active: true, top: top});
  },
  deactivate(){
    this.setState({active: false});
  },
  onMouseMove(e){
    if(this.state.active){
      var height = ((e.clientY - this.state.top) / this.el.clientHeight * 100) + '%';
      this.setState({
        height: height
      });
    }

  },
  renderTop(height){
    var topStyle = {
        ...style,
        top: 0,
        height: height
    };
    var child = this.props.children ? (this.props.children[0] || null) : null;
    return (
      <div style={ topStyle }>
        { child }
      </div>
    );
  },
  renderBottom(height){
    var bottomStyle = {
        ...style,
        bottom: 0,
        top: height
    };
    var child = this.props.children ? (this.props.children[1] || null) : null;
    return (
      <div style={ bottomStyle }>
        { child }
      </div>
    );
  },
  render(){
    var height = this.state.height;


    return (
      <div style={ boxStyle } onMouseMove={ this.onMouseMove } ref="box">
        { this.renderTop(height) }
        <VerticalLine top={ height } onMouseDown={ this.activate }/>
        { this.renderBottom(height) }
      </div>
    );
  }
});

module.exports = Vertical;
