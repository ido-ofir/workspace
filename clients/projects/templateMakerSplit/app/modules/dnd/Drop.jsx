
var React = require('react');

function parse(data){
  try{
    return JSON.parse(data);;
  }
  catch(err){
    console.log('error parsing drop data:');
    console.error(err);
  }
}

function stopEvent(e){
  e.preventDefault();
  e.stopPropagation();
}


var Drop = React.createClass({
  onDragOver(e){
    stopEvent(e);
    e.dataTransfer.dropEffect = 'copy';
  },
  onDrop(e){
    var data = e.dataTransfer.getData('idndo');
    data = ((typeof data === 'string') ? parse(data) : data);
    if(this.props.drop) {
      if(this.props.drop(data) !== false){  // return false from drop handler to stop propagation
        stopEvent(e);
      }
    }
  },
  render(){
    return (
      <div onDragOver={ this.onDragOver }
           onDragEnter={ stopEvent }
           onDragLeave={ stopEvent }
           onDrop={ this.onDrop } { ...this.props }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Drop;
