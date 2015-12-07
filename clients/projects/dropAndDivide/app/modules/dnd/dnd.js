
function parse(data){
  try{
    return JSON.parse(data);
  }
  catch(err){
    console.error(err);
  }
}

var dnd = {
  onDragStart(e){
    console.log('drag');
    var drag = e.dataTransfer;
    var data = this.props.data;
    var type = this.props.type;
    drag.setData('dragType', type);
    drag.setData('dragData', data);
    drag.effectAllowed = 'copy';
  },
  onDragOver(e){
    console.log('drag over');
    // e.preventDefault();
    // e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  },
  onDragEnter(e){
    // e.preventDefault();
    // e.stopPropagation();
    console.log('drag enter');
  },
  onDragLeave(e){
    // e.preventDefault();
    // e.stopPropagation();
    console.log('drag leave');
  },
  onDrop(){
    console.log('drop');
    // e.preventDefault();
    // e.stopPropagation();
    var type = e.dataTransfer.getData('dragType');
    var data = e.dataTransfer.getData('dragData');
    type = parse(type);
    data = parse(data);
  }
};
