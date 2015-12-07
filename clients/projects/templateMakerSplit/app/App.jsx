
var React = require('react');

var mixins = require('baobab-react/mixins');

var { Drag, Drop } = require('./modules/dnd');
var { Router, Route } = require('./modules/router');
var { Header, Box, SideBar } = require('./components/layout');
var { Horizontal, Vertical, Panel } = require('./divide');
var Element = require('./Element.jsx');
var DropPad = require('./DropPad.jsx');
var DropElement = require('./DropElement.jsx');

var styles = {
  left:{
    padding: '10px'
  },
  drag:{
    width: 50,
    height: 40,
    background: '#ddd',
    border: '1px solid #bbb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  horizontal: {
    height: '100%',
    width: '1px',
    background: '#bbb'
  },
  vertical: {
    width: '100%',
    height: '1px',
    background: '#bbb'
  }
};


var Test = React.createClass({
  render(){
    return (
      <div style={ styles.drag }>
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
          'Horizontal': Horizontal,
          'Vertical': Vertical,
          'Box': Box
        }
      };
    },
    drop(data){
      console.dir(data);
    },
    render () {
        var elementCursor = this.props.tree.select('element');
        return (
          <Box>
              <Horizontal width="70px">
                <div style={ styles.left }>
                  <Drag style={ styles.drag } data={ {
                    type: 'Horizontal',
                    props: { index: 1 },
                    children: []
                  } }>
                    <div style={ styles.horizontal }></div>
                  </Drag>
                  <Drag style={ styles.drag } data={ {
                    type: 'Vertical',
                    props: { index: 1 },
                    children: []
                  } }>
                    <div style={ styles.vertical }></div>
                  </Drag>
                </div>
                <DropPad cursor={ elementCursor.select('children') }/>
              </Horizontal>
          </Box>
        );
    }
});
