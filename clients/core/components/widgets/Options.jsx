
var React = require('react');
var styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 11
  },
  panel: {
    position: 'absolute',
    minWidth: '166px',
    background: '#fff',
    color: 'rgb(167, 169, 170)',
    border: '1px solid rgb(220,220,220)'
  },
  item: {
    lineHeight: '40px',
    padding: '0 12px',
    borderBottom: '1px solid rgb(220,220,220)'
  }
};

var Option = React.createClass({
  getInitialState(){
    return {
      selected: false
    };
  },
  select(e){
    this.setState({selected: true});
    e.stopPropagation();
    setTimeout(()=>{
      this.props.close();
      this.props.method();
    },100);
  },
  render(){
    var style = { ...styles.item };
    if(this.state.selected){
      style.background = "#00b0ca";
      style.color = "#fff";
    }
    return (
      <div style={ style } onClick={ this.select }>
        { this.props.text }
      </div>
    );
  }
});

var Options = React.createClass({
  getInitialState(){
    return {
      isOpen: false,
      options: []
    };
  },
  open(options, x, y){
    var arr = [];
    for(var m in options){
      arr.push({text: m, method: options[m]});
    }
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    if(x === 'left') x = 6;
    else if(x === 'right') x = ((width - 6) - 166);
    if(y === 'top') y = 6;
    else if(y === 'bottom') y = ((height - 6) - (arr.length * 41 + 2));
    styles.panel.left = x + 'px';
    styles.panel.top = y + 'px';
    this.setState({
      isOpen: true,
      options: arr
    });
  },
  close(){
    this.setState({
      isOpen: false,
      options: []
    });
  },
  renderOption(option, index){
    return (
      <Option text={ option.text } key={ index } method={ option.method } close={ this.close }/>
    );
  },
  render(){
    if(!this.state.isOpen) return null;
    return (
      <div style={ styles.wrapper } onClick={ this.close }>
        <div style={ styles.panel }>
          { this.state.options.map(this.renderOption) }
        </div>
      </div>
    );
  }
});

module.exports = Options;
