var Emitter = require('./Emitter.js');
var moment = require('./moment.js');

function parse(data){
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
}

function find(id, array, field){
  if(!id) return false;
  field = field || 'id';
  id = id.toString();
  for (var i = 0; i < array.length; i++) {
      if(array[i][field]){
      if(array[i][field].toString() === id) return array[i];
    }
  }
}

module.exports = {
  parse: parse,
  find: find,
  moment: moment,
  Emitter: Emitter
};
