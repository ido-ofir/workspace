
var React = require('react');
var core = require('core');
var Box = core.components.layout.Box;
var mixins = require('baobab-react/mixins');

var Router = require('./Router.jsx');

// var Connection = core.modules.connection;
//
// connection.on('core.action', function(data){
//   console.dir(data);
// });
var routes = require('./routes.js');

module.exports = React.createClass({
    mixins: [mixins.root, core.mixins.app],
    config: {
      domain: 'http://localhost',
      port: 4000,
      autoConnect: true
    },
    getInitialState(){
      return {
        path: []
      }
    },
    onHashChange(){
      var hash = location.hash.substr(1);
      var path = hash.split('/').filter(n => n);
      this.setState({ path: path });
    },
    componentDidMount(){
      window.addEventListener('hashchange', this.onHashChange);
      this.onHashChange();
    },
    componentWillUnmount(){
      window.removeEventListener('hashchange', this.onHashChange);
    },
    render () {
        return (
          <Box>
            <Router routes={ routes } path={ this.state.path }/>
          </Box>
        );
    }
});
