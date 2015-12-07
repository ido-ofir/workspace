var name = process.argv[2];
var cloud = require('../cloud')(function(){
  var server = require('../servers/projects/' + name);
})
