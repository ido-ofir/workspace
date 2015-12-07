var Emitter = require('../../utils/Emitter.js');
var dom = {};
function serialize(src){
  var result = {};
  for(var m in src){
    src[m] = {};
  }
  return result;
}


module.exports = window.dom = Emitter({
  mount(component){
    if(!component) return;
    if(!component._reactInternalInstance) return console.error(`an object was passed to dom which is not a react component`);
    var reactID = component._reactInternalInstance._rootNodeID;
    if(!reactID) return console.error(`cannot find reactID on component`);
    if(dom[reactID]){
      return console.error(`${reactID} is already mounted to the dom`);
    }
    dom[reactID] = component;
  },
  unmount(component){
    if(!component) return;
    if(!component._reactInternalInstance) return console.error(`an object was passed to dom which is not a react component`);
    var reactID = component._reactInternalInstance._rootNodeID
    if(!reactID) return console.error(`cannot delete component without reactID`);
    delete dom[reactID];
  },
  toTree(){
    var tree = {};

    var serialized = serialize(dom);

    for(var m in serialized){
      for(var d in serialized){

      }
    }

    function filter(id){ return id; }
    function find(idArray, target){
      var id = idArray.shift();
      if(!id || !target[id]) return false;
      if(!idArray.length) return target[id];
      return find(idArray, target[id])
    };
    function build(src){
      var id, parent, hit, idArray, reject, rejects = {};
      for(var m in src){
        console.log(m);
        parent = tree;
        idArray = m.split('.').filter(filter);
        id = idArray.pop();
        if(idArray.length){
          parent = find(idArray, tree);
        }
        if(parent){
          parent[id] = {};
          hit = true;
        }
        else{
          reject = true;
          rejects[m] = src[m];
        }
      }
      if(!hit) return console.error(`could not parse dom tree`);
      if(reject) return build(rejects);
    }
    // build(dom);
    return tree;
  }
});
