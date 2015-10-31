var common = require('./common.js');
var routerMixin = {
  mixins: [common],
  type: 'router',
  onHashChange(){
    var hash = location.hash.substr(1);
    var route = this.findRoute(hash);
    if(route){
      if(this.activeRoute !== route){
        if(!this.activeRoute) {
          route.open();
        }
        else{
          if(this.routes.indexOf(route) > this.routes.indexOf(this.activeRoute)){
            this.activeRoute.closeForward();
            route.openForward();
          }
          else{
            this.activeRoute.closeBack();
            route.openBack();
          }
        }
        this.activeRoute = route;
      }
    }
    else {
      console.log('rejecting ' + hash);
      console.dir(this.routes);
      location.hash = this.state.home || this.routes[0].props.route;
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
