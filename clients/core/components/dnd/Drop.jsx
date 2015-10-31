function parse(data){
  try{
    return JSON.parse(data);
  }
  catch(err){
    console.error(err);
  }
}

function stopEvent(e){
  e.preventDefault();
  e.stopPropagation();
}


var Drop = React.createClass({
  getInitialState(){
    return {};
  },

  onDragOver(e){
    console.log('drag over');
    stopEvent(e);
    e.dataTransfer.dropEffect = 'copy';
  },
  onDrop(e){
    console.log('drop');
    stopEvent(e);
    var data = parse(e.dataTransfer.getData('idndo'));
    if(this.props.drop) this.props.drop(data);
  },
  componentDidMount(){

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
