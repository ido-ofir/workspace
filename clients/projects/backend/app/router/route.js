var React = require('react');

var common = require('./common.js');

var Transform = require('./transform.js');

var routeMixin = {
  mixins: [common],
  contextTypes: {
    router: React.PropTypes.object,
    params: React.PropTypes.object
  },
  type: 'route',
  componentDidMount(){
    this.context.router.register(this);
  },
  componentWillUnmount(){
    this.context.router.unregister(this);
  },
  getInitialState(){
    return {
      routeIsActive: false,
      routeStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
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
  animate(direction, action){
    var animation = this.props.animation;
    if(animation) {
      var page = this.transform();
      animation.init(page);
      animation[direction][action](page);
    }
    else{
      this[action]();
    }
  },

  openForward(path){
    this.animate('forward', 'open');
  },
  closeForward(){
    this.animate('forward', 'close');
  },
  openBack(path){
    this.animate('back', 'open');
  },
  closeBack(){
    this.animate('back', 'close');
  },
  open(){
    this.setState({
      routeIsActive: true
    });
  },
  close(){
    this.setState({
      routeIsActive: false
    });
  }
};

module.exports = routeMixin;
