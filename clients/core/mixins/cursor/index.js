
module.exports = {
  Cursor(field){
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
