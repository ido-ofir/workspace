
module.exports = {
  Cursor(path){
    path = path.split('.');
    var field = path[0];
    var t = this;
    return {
      set(v){
        var o = {};
        o[field] = v;
        t.setState(o);
      },
      get(){
        return t.state[field];
      }
    };
  }
};
