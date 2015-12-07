
var React = require('react');
var ReactDom = require('react-dom');

function parse(data){
  console.dir(data);
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


function listen(el, event, listener){
  el.addEventListener(event, listener, false);
}
function forget(el, event, listener){
  el.removeEventListener(event, listener, false);
}

module.exports = {
  componentDidMount(){
    var el = ReactDom.findDOMNode(this);
    listen(el, 'dragover', this.onDragOver);
    listen(el, 'dragleave', this.stopEvent);
    listen(el, 'dragenter', this.stopEvent);
    listen(el, 'drop', this.onDrop);
  },
  componentWillUnmount(){
    var el = ReactDom.findDOMNode(this);
    forget(el, 'dragover', this.onDragOver);
    forget(el, 'dragleave', this.stopEvent);
    forget(el, 'dragenter', this.stopEvent);
    forget(el, 'drop', this.onDrop);
  },
  onDragOver(e){
    stopEvent(e);
    e.dataTransfer.dropEffect = 'copy';
  },
  onDrop(e){
    var data = e.dataTransfer.getData('idndo');
    data = ((typeof data === 'string') ? parse(data) : data);
    if(this.drop) {
      if(this.drop(data) !== false){  // return false from drop handler to stop propagation
        stopEvent(e);
      }
    }
  }
};
