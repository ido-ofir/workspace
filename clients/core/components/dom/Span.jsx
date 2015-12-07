var React = require('react');
var PropTypes = React.PropTypes;
var mixins = require('../../mixins');
var Span = React.createClass({
  mixins: [mixins.style],
  render: function() {
    return (
      <span style={ this.state.style } { ...this.props }>
        { this.props.children }
      </span>
    );
  }

});

module.exports = Span;
