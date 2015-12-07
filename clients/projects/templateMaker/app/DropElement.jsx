
var React = require('react');
var ReactDom = require('react-dom');

var Element = require('./Element.jsx');
var drop = require('./modules/dnd/mixins/drop.js');
function listen(el, event, listener){
  el.addEventListener(event, listener, false);
}

var DropElement = React.createClass({
  mixins: [drop],
  contextTypes: {
    components: React.PropTypes.object
  },
  renderElement(element, i){
      if(typeof element !== 'object') return element;
      return (
        <DropElement cursor={ this.props.cursor.select('children', i) } key={ i }/>
      );
  },
  componentDidMount(){
    var el = ReactDom.findDOMNode(this);
    listen(el, 'dragover', this.onDragOver);
    listen(el, 'dragleave', this.stopEvent);
    listen(el, 'dragenter', this.stopEvent);
    listen(el, 'drop', this.onDrop);
  },
  drop(data){
    this.props.cursor.push('children', data);
  },
  render(){
    var c = this.props.cursor.get();
    var type = this.context.components[c.type];
    if(!type) return console.error(`Element cannot find component ${c.type}`);
    var children = c.children || [];
    children = children.map(this.renderElement);
    return React.createElement(type, c.props, children);
  }
});

module.exports = DropElement;
