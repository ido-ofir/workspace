var React = require('react');
var PropTypes = React.PropTypes;
var mixins = require('../../mixins');
var Div = React.createClass({
  mixins: [mixins.element],
  componentDidMount(){
    window.d = this;
  },
  render: function() {
    return (
      <div style={ this.state.style } { ...this.props }>
        { this.props.children }
      </div>
    );
  }

});

module.exports = Div;
