
var React = require('react');
var Drag = React.createClass({
  onDragStart(e){
    console.log('drag');
    console.dir(e.dataTransfer);
    var drag = e.dataTransfer;
    var data = this.props.data;
    drag.setData('idndo', JSON.stringify(data));
    drag.effectAllowed = 'copy';
  },
  componentDidMount(){
    // console.dir(React.findDOMNode(this));
  },
  render(){
    return (
      <div draggable={ true } onDragStart={ this.onDragStart } { ...this.props }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Drag;
