
var React = require('react');

var mixins = require('baobab-react/mixins');

var { Drag, Drop } = require('./modules/dnd');
var { Router, Route } = require('./modules/router');
// var { Header, Box, SideBar } = require('./components/layout');
var { Horizontal, Vertical, Panel } = require('./divide');
var Element = require('./Element.jsx');
var DropPad = require('./DropPad.jsx');
var DropElement = require('./DropElement.jsx');

var Box = core.components.layout.Box

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
    marginBottom: '10px',
    margin: '9px'
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
  },
  widget:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    background: '#eee'
  },
  leftPanel:{
    width: '70px',
    borderRight: '1px solid #ddd'
  },
  rightPanel:{
    width: '70px',
    left: 'initial',
    borderLeft: '1px solid #ddd'
  },
  middlePanel:{
    left: '70px',
    right: '70px'
  },
  clear: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd',
    zIndex: 8
  }
};


var A = React.createClass({
  render(){
    return (
      <Box style={ styles.widget }>
        A
      </Box>
    );
  }
});
var B = React.createClass({
  render(){
    return (
      <Box style={ styles.widget }>
        B
      </Box>
    );
  }
});
var C = React.createClass({
  render(){
    return (
      <Box style={ styles.widget }>
        C
      </Box>
    );
  }
});
var D = React.createClass({
  render(){
    return (
      <Box style={ styles.widget }>
        D
      </Box>
    );
  }
});

var top = (<Panel>ok</Panel>);
var drags = ['A', 'B', 'C', 'D'];
var components = {
  'Horizontal': Horizontal,
  'Vertical': Vertical,
  'Box': Box,
  'A': A,
  'B': B,
  'C': C,
  'D': D
}

module.exports = React.createClass({
    mixins: [mixins.root],
    childContextTypes: {
      components: React.PropTypes.object,
      element: React.PropTypes.object
    },
    getChildContext() {
      return {
        components: components
      };
    },
    getInitialState(){
      return {
        states: this.props.tree.get('states')
      };
    },
    drop(data){
      console.dir(data);
    },
    addState(){
      var state = this.props.tree.get('element');
      var states = this.state.states.concat([state]);
      this.setState({states: states});
    },
    renderState(state, i){
      return (
        <div style={ styles.drag } key={ i } onClick={ this.load.bind(this, state) }>{ i }</div>
      );
    },
    renderDrag(drag, i){
      return (
        <Drag key={ i } style={ styles.drag } data={ {
          type: drag,
          props: { index: 1 },
          children: []
        } }>
          { drag }
        </Drag>
      );
    },
    clear(){
      this.props.tree.set('element', {
        type: 'Box',
        props: { padding: '50px' },
        children: []
      });
    },
    load(state){
      console.dir(state);
      this.props.tree.set('element', state);
    },
    render () {
        var elementCursor = this.props.tree.select('element');
        return (
          <Box>
            <Box style={ styles.leftPanel }>
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
              { drags.map(this.renderDrag) }
            </Box>
            <Box style={ styles.middlePanel }>
              <DropPad cursor={ elementCursor }/>
              <div style={ styles.clear } onClick={ this.clear }>X</div>
            </Box>

              <Box style={ styles.rightPanel }>
                <div style={ styles.drag } onClick={ this.addState }>+</div>
                { this.state.states.map(this.renderState) }
              </Box>
          </Box>
        );
    }
});
