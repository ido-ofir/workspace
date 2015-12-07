
var React = require('react');
var mixins = require('baobab-react/mixins');

var Element = require('./Element.jsx');
var DropElement = require('./DropElement.jsx');
var { Drop } = require('./modules/dnd');

var style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

var DropPad = React.createClass({
  contextTypes: {
    components: React.PropTypes.object
  },
  getInitialState(){
    var cursor = this.props.cursor;
    return {
      children: cursor.get()
    };
  },
  onUpdate(e){
    var children = e.data.currentData.map((json, i)=>{
      if(!json) return null;
      var type = json.type;
      if(!type) return null;
      if(this.context.components[type]){
        type = this.context.components[type];
      }
      return React.createElement(type, { ...json.props, key: i }, json.children);
    });
    this.setState({
      children: children
    });
  },
  componentDidMount(){
    var cursor = this.props.cursor;
    cursor.on('update', this.onUpdate);
  },
  drop(data){
    var cursor = this.props.cursor;
    cursor.push(data);
  },
  render(){
    return (
        <Drop style={ style } drop={ this.drop }>
          { this.state.children }
        </Drop>
    );
  }
});

module.exports = DropPad;
