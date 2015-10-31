


var Core = require('../core');
var Config = require('./config');

Config(function(config) {
  Core(config, function(core){  // 'core' module is now global and initiated

  });
})
