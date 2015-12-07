
var React = require('react');
var common = require('./mixins/common.js');
var Route = React.createClass({
  mixins: [common],
  getInitialState(){
    var routeIsActive = ('hash' in this.props);
    return {
      routeIsActive: routeIsActive,
      routeStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        WebkitOverflowScrolling: 'touch',
        overflowY: ('scroll' in this.props ? 'scroll' : 'visible')
      }
    };
  },
  componentDidMount(){
    if(this.matchRef){
      this.activeRoute = this.refs[this.matchRef];
    }
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
    this.setActive(true);
  },
  close(hash, params){
    this.setActive(false);
  },
  update(hash, params){
    if(!this.route(hash)){
      if(this.activeRoute) {
        this.activeRoute.close();
        delete this.activeRoute;
      }
    }
  },
  renderRoute(child, index){
    var children = child.props.children;
    var match, element;
    if(!children)
    // console.log('test ', child.props.path, this.props.hash);
    if(this.props.hash){
      match = this.test(child.props.path, this.props.hash);
    }
    var props = { ...child.props, ref: 'route' + index, key: index };
    delete props.children;
    if(match){
      this.matchRef = 'route' + index;
      props.params = match.params;
      props.hash = match.hash;
    }
    return React.createElement(Route, props, children);
  },
  componentDidUpdate(){
    if(this.matchRef){
      this.activeRoute = this.refs[this.matchRef];
    }
  },
  render(){
    if(!this.state.routeIsActive) return null;
    var children = this.props.children;
    if(children && !Array.isArray(children)){
      children = [children];
    }
    if(children){
      children = children.map(this.renderRoute);
    }
    return (
      <div style={ this.state.routeStyle }>
        { React.createElement(this.props.component, this.props.props || {}, children) }
      </div>
    );
  }
});

module.exports = Route;
