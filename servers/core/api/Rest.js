
function exec(res){
  return function(err, data){
      if(err) return res.error(err);
      res.success(data);
  }
}

module.exports = function(name, route, router){
  router.route(`/${name}/`)
    .get(function(req, res) {
      route.find(req.query, req.user, exec(res));
    })
    .post(function(req, res) {                                            // POST { name: 'koko'} => '/myCollection'   - create item
      route.create(req.body, req.user, exec(res));
    });

  router.route(`/${name}/:id`)
    .get(function(req, res) {
      route.find(req.params, req.user, exec(res));
    })
    .put(function(req, res) {
      route.update({
        target: req.params,
        update: req.body
      }, req.user, exec(res));                                           // PUT { expired: true } => '/myCollection/55'  - update item by id
    })
    .delete(function(req, res) {                                           // DELETE '/myCollection/55'  - delete item by id
      route.delete(req.params, req.user, exec(res));
    });
}
