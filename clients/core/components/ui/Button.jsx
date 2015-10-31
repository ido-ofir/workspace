
var styles = {
  base: {
    background: 'rgb(58, 176, 201)',
    border: 0,
    borderRadius: '4px',
    color: 'white',
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    fontSize: '14px',
    fontWeight: 100
},
  primary: {
    background: 'rgb(58, 176, 201)'
  },
  warning: {
    background: 'rgb(247, 121, 52)'
  },
  signUp: {
    marginTop:'0 !important'
  }
};

var Button = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    var props = this.props;
    var kind = props.kind;

    ///
    var style = { ...styles.base, ...props.style };
    if(kind){
      style = { ...style, ...styles[kind] };
    }
    delete props.style;
    return (
      <div style={ style } { ...props }></div>
    );
  }
});

module.exports = Radium(Button);
