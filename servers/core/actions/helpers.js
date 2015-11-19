module.exports = {
  ensure(obj, cb){
    var type, param, request = this.request;
    var params = [];
    for(var m in obj){
      if(!(m in request)) return this.fail(`parameter ${m} is missing.`);
      param = request[m];
      type = Array.isArray(param) ? 'array' : typeof param;
      if(type !== obj[m]) return this.fail(`parameter ${m} is of wrong type. expected '${obj[m]}', got '${type}..'`);
      params.push(param);
    }
    cb.apply(null, params);
  },
  save(obj, cb){    // usage: action.save({ user: { id: 5, name: 'koko'}, product: { id: 13, price: 38 } })
    var methods = [];
    for(var m in obj){
      var item, id, model = core.api.models[m];
      if(!model) return this.fail(`cannot find collection ${m}`);
      item = obj[m];
      if(!item) return this.fail(`param ${m} is wrong`);
      id = item.id;
      if(!id) return this.fail(`cannot save ${m} without an id`);
      methods.push(this.update(m, {id: id}, obj[m]));
    }
    async.parallel(methods, function(err, data){
        if(err) return this.fail(err);
        cb.apply(null, data);
    });
  }
};
