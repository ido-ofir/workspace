
function Action(data, req, res){
  return {
    done: res.success,
    fail: res.fail,
    error: res.error,
    reject: res.reject,
    data: data,
    user: req.user
  };
}


module.exports = function(collection){
  collection.route('/')
    .get(function(req, res) {
      collection.find(Action(req.query, req, res));
    })
    .post(function(req, res) {                                            // POST { name: 'koko'} => '/myCollection'   - create item
      collection.create(Action(req.body, req, res));
    });

  collection.route('/:id')
    .get(function(req, res) {                                             // GET '/myCollection/55'  - get item by id
      collection.find(Action({
        id: req.params.id
      }, req, res));
    })
    .put(function(req, res) {
      collection.update(Action({
        target: req.params,
        update: req.body
      }, req, res));                                            // PUT { expired: true } => '/myCollection/55'  - update item by id
    })
    .delete(function(req, res) {                                           // DELETE '/myCollection/55'  - delete item by id
      collection.delete(Action(req.params, req, res));
    });
}
