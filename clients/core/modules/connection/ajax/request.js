
var sa = require('superAgent');

function noSuccess(data){
  console.log('ajax success:');
  console.dir(data);
}
function noFail(err){
  console.log('ajax fail:');
  console.dir(err);
}

function Request(req, success, fail) {
  // req.set('Access-Token', accessToken);
  req.set('Accept', 'application/json');
  req.withCredentials();
  req.end(function(err, res) {
      if(!res || !res.body) return;
      var response = res.body;
      if(!err){
        if (response.success) {
          return (success || noSuccess)(response.data);
        }
        return (fail || noFail)(response.message);
      }
      console.error(err);
  });
}


module.exports = function(config) {

  return {
    get: function(url, params, success, fail) {
      var serverIp = `${config.domain}:${config.port}`;
      var req = sa.get(serverIp + url, params);
      Request(req, success, fail);
    },

    post: function(url, params, success, fail) {
      var serverIp = `${config.domain}:${config.port}`;
      var req = sa.post(serverIp + url).send(params);
      Request(req, success, fail);
    },
    put: function(url, params, success, fail) {
      var serverIp = `${config.domain}:${config.port}`;
      var req = sa.put(serverIp + url).send(params);
      Request(req, success, fail);
    },
    delete: function(url, success, fail) {
      var serverIp = `${config.domain}:${config.port}`;
      var req = sa.del(serverIp + url);
      Request(req, success, fail);
    }
  }
};
