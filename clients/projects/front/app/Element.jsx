
var React = require('react');

var Element = React.createClass({
  contextTypes: {
    components: React.PropTypes.object
  },
  renderElement(element, i){
      if(typeof element !== 'object') return element;
      return (
        <Element cursor={ this.props.cursor.select('children', i) } key={ i }/>
      );
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

module.exports = Element;
