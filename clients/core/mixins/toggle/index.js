
var React = require('react');
module.exports = {
  childContextTypes: {
    toggle: React.PropTypes.object
  },
  getChildContext() {
    return { toggle: this };
  },
  getInitialState(){
    return {
      activeT: null
    };
  },
  toggle(item){
    if(this.state.activeT !== item){
      this.setState({activeT: item});
    }
    else{
      this.setState({activeT: null});
    }
  },
  isActive(item){
    return this.state.activeT === item;
  }
};
