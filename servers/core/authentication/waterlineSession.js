
var session = require('express-session');
var WaterlineStore = require('connect-waterline')(session);
var diskAdapter = require('sails-disk');
var adapters = {
  "disk": diskAdapter
};

module.exports = function(config){

  var store = new WaterlineStore({  // a waterline store to store session data
    adapters: {
      'auth-session-store': adapters[config.adapter]
    },
    connections: {
      'connect-waterline': {
        adapter: 'auth-session-store'
      }
    },
    autoRemoveInterval: config.autoRemoveInterval || 6 * 60 // default every 6h
  });

  var waterlineSession = session({
    secret: config.secret,
    resave: false, // dont resave sessions if they where not modified
    saveUninitialized: false, // dont save sessions if they have not been initialized
    store: store
  });
  waterlineSession.store = store;
  return waterlineSession;
}
