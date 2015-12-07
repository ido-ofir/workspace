var path = require('path');
var fs = require('fs');
var async = require('async');

var elements = {
  app: 'app.json',
  schemas: 'schemas.json',
  permissions: 'permissions.json',
  orm: 'orm.json',
  authentication: 'authentication.json',
}
module.exports = function(done){
  var config = {};
  async.forEachOf(elements, function (value, key, callback) {
    fs.readFile(`${__dirname}/${value}`, "utf8", function (err, data) {
        if (err) return callback(err);
        try {
          config[key] = JSON.parse(data);
        } catch (e) {
          return callback(e);
        }
        callback();
    })
  }, function (err) {
    if (err) return console.error(err.message);
    done(config);
  });
};
