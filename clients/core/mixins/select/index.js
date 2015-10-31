module.exports = {
  componentDidMount(){
    this.selectedItems = [];
  },
  childContextTypes: {
      select: React.PropTypes.object
  },
  getChildContext(){
    return {
      select: this
    };
  },
  select(item){
    this.selectedItems.push(item);
  },
  deselect(item){
    for (var i = 0; i < this.selectedItems.length; i++) {
      if(this.selectedItems[i] === item){
        this.selectedItems.splice(i, 1);
        return;
      }
    }
  }
};
