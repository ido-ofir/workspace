var Emitter = require('../../utils/Emitter.js');
var style = {};
module.exports = window.style = Emitter({
  get(selector){
    if(!selector) return style;
    return style[selector] || {};
  },
  set(selector, obj){
    if(selector && obj){
      style[selector] = obj;
      console.log('set', selector);
      console.dir(obj);
      this.emit(selector, {
        selector: selector,
        style: obj
      });
    }
  }
});

// var s = module.exports = window.style = Emitter();
// s.get = function(selector){
//   if(!selector) return style;
//   return style[selector] || {};
// };
// s.set = function(selector, obj){
//   if(selector && obj){
//     style[selector] = obj;
//     console.log('set', selector);
//     console.dir(obj);
//     this.emit(selector, {
//       selector: selector,
//       style: obj
//     });
//   }
// }
