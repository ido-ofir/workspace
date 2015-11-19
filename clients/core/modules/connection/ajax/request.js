
var sa = require('superagent');

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
  if(!fail) fail = noFail;
  if(!success) success = noSuccess;
  req.set('Accept', 'application/json');
  req.withCredentials();
  req.end(function(err, res) {
      if(!res || !res.body) return;
      var response = res.body;
      if(!err){
        if (response.success) {
          return success(response.data);
        }
        return fail(response.data);
      }
      console.error(err);
  });
}

module.exports = function(config) {
  var serverIp = `${config.domain}:${config.port}`;
  return {
    get: function(url, params, success, fail) {
      var req = sa.get(serverIp + url, params);
      Request(req, success, fail);
    },
    post: function(url, params, success, fail) {
      var req = sa.post(serverIp + url).send(params);
      Request(req, success, fail);
    },
    put: function(url, params, success, fail) {
      var req = sa.put(serverIp + url).send(params);
      Request(req, success, fail);
    },
    delete: function(url, success, fail) {
      var req = sa.del(serverIp + url);
      Request(req, success, fail);
    }
  }
};
