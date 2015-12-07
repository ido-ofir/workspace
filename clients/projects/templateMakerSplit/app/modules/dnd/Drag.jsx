
var React = require('react');

var Drag = React.createClass({
  onDragStart(e){
    var drag = e.dataTransfer;
    var data = this.props.data;
    drag.setData('idndo', JSON.stringify(data));
    drag.effectAllowed = 'copy';
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
