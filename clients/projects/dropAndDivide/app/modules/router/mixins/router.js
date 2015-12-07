var common = require('./common.js');

var routerMixin = {
  mixins: [common],
  onHashChange(){
    var hash = location.hash.substr(1);
    this.hash = hash;
    if(!this.route(hash)){
      location.hash = this.props.home || this.children[0].props.path;
    }
  },
  componentDidMount(){
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },
  componentWillUnmount(){
    window.removeEventListener('hashchange', this.onHashChange);
  }
};

module.exports = routerMixin;
