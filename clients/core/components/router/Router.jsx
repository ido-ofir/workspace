
var routerMixin = require('../../mixins/router/router.js');

var Router = React.createClass({
  mixins: [routerMixin],
  getInitialState(){
    return {
      home: this.props.home
    };
  },
  render(){
    return this.renderContent();
  }
});

module.exports = Router;
