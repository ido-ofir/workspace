
var React = require('react');

var common = require('./common.js');
var Transform = require('./transform.js');

var routeMixin = {
  mixins: [common],
  getInitialState(){
    var routeIsActive = ('hash' in this.props);
    console.dir(this.props);
    return {
      routeIsActive: routeIsActive,
      routeStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        WebkitOverflowScrolling: 'touch',
        overflowY: ('scroll' in this.props ? 'scroll' : 'auto')
      }
    };
  },
  transform(){
    return Transform(this.state.routeStyle, {
      render: this.renderStyle,
      enter: this.open,
      exit: this.close,
    });
  },

  setActive(routeIsActive){
    this.setState({routeIsActive: routeIsActive});
  },
  renderStyle(style){
    this.setState({
      routeStyle: style
    });
  },
  animate(direction, action, hash, params){
    var animation = this.props.animation;
    if(animation) {
      var page = this.transform();
      animation.init(page);
      animation[direction][action](page);
    }
    else{
      this[action](hash, params);
    }
  },

  openForward(hash, params){
    this.animate('forward', 'open', hash, params);
  },
  closeForward(hash, params){
    this.animate('forward', 'close', hash, params);
  },
  openBack(hash, params){
    this.animate('back', 'open', hash, params);
  },
  closeBack(hash, params){
    this.animate('back', 'close', hash, params);
  },
  open(hash, params){
    console.log('open');
    this.setActive(true);
  },
  close(hash, params){
    this.setActive(false);
  },
  update(hash, params){

  }
};

module.exports = routeMixin;
