// var logo = require('./logo.png');

var React = require('react');
var styles = {
      base: {
        width: '100%',
        height:'100%',
        maxWidth: '212px',
        maxHeight: '63px'
      }
    };

var Logo = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    return (
      <div style={
        { display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight:'148px',
          maxHeight: '212px'
        }
      }>
        <img src={ this.props.src } style={[
          styles.base
        ]}/>
      </div>
    );
  }
});

module.exports = Logo;
