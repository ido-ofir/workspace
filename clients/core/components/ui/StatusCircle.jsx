


var styles = {
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    borderRadius: '50%',
    height: '100%',
    fontSize: '20px',
    color: '#fff'
  },
  status: {
    background: 'red',
    borderRadius: '50%',
    width: 10,
    height: 10,
    border: '2px solid #fff',
    position: 'absolute',
    right: 0,
    bottom: 0
  }
};
var StatusCircle = React.createClass({
  render(){
    var statusStyle = { ...styles.status, color: (this.props.color || 'red') };
    var circleStyle = { ...styles.circle };
    if(this.props.background) circleStyle.backgroundColor = this.props.background;
    else if(this.props.image) circleStyle.backgroundImage = `url(${this.props.image})`;
    else circleStyle.backgroundColor = 'rgb(53, 175, 201)';

    return (
      <div style={{width: 44, height: 44, position: 'relative'}}>
        <div style={ circleStyle }>
          { this.props.children }
          <div style={ statusStyle }></div>
        </div>
      </div>
    );
  }
});

module.exports = StatusCircle;
