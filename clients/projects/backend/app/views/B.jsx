var React = require('react');
var PropTypes = React.PropTypes;

var core = require('core');
var { Div } = core.components.dom;

var B = React.createClass({
  render: function() {
    return (
      <Div className="koko">
        ok
      </Div>
    );
  }
});

module.exports = B;
