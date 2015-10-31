
var React = require('react');

var mixins = require('baobab-react/mixins');

var { Drag, Drop } = require('./modules/dnd');
var { Router, Route } = require('./modules/router');
var { Header, Box, SideBar } = require('./components/layout');
var { Horizontal, Vertical, Panel } = require('./divide');
var Element = require('./Element.jsx');
var DropPad = require('./DropPad.jsx');


var ds = {padding: '30px', border: '1px solid #ddd'};
var ts = {padding: '30px', background: '#ddd', margin: '10px', display: 'inline-block', border: '1px solid #888', position: 'relative'};
var data = {a: 5};

var Test = React.createClass({
  render(){
    return (
      <div style={ ts }>
        {this.props.children}
      </div>
    );
  }
});

var top = (<Panel>ok</Panel>);



module.exports = React.createClass({
    mixins: [mixins.root],
    childContextTypes: {
      components: React.PropTypes.object,
      element: React.PropTypes.object
    },
    getChildContext() {
      return {
        components: {
          'Test': Test,
          'Box': Box
        }
      };
    },
    renderRoutes(){
        return (
          <div>


          </div>
        );
    },
    drop(data){
      console.dir(data);
    },
    render () {
        var elementCursor = this.props.tree.select('element');
        var left = (
          <Drag style={ ts } data={ elementCursor.get(['children', 0]) }>
            Drag me
          </Drag>
        );
        var right = (
          <DropPad cursor={ elementCursor }/>
        );
        return (
          <Box>
              <Header height="50px">
                <div onClick={ this.setFlag }>
                Kokok
                </div>
              </Header>
              <Box top="51px">
                <Horizontal width="200px" left={ left } right={ right }/>
                  {/*




                    <Router home="page1">
                      <Route component={ Page1 } path="page1">
                        <Route component={ Nested } path="nested1" props={{index: 1}}></Route>
                        <Route component={ Nested } path="nested2" props={{index: 2}}></Route>
                      </Route>
                      <Route component={ Page2 } path="page2">
                        <Route component={ Nested } path="nested2"></Route>
                      </Route>
                    </Router>
                    */}
              </Box>
            {/*  */}
          </Box>
        );
    }
});



var Page1 = React.createClass({
  componentDidMount(){

  },
    render () {
        return (
          <div style={{position: 'relative'}}>
            page 1
            <div style={{position: 'relative'}}>
              { this.props.children }
            </div>
          </div>
        );
    }
});
var Page2 = React.createClass({
    render () {
        return (
          <div>
            page 2
          </div>
        );
    }
});
var Nested = React.createClass({
    render () {
        return (
          <div style={{position: 'relative'}}>
            nested { this.props.index }
          </div>
        );
    }
});
