var React = require('react');
var PropTypes = React.PropTypes;

var core = require('core');
var { Div } = core.components.dom;

var StyleTest = React.createClass({
  componentDidMount(){
    window.a = this;
  },
  render: function() {
    return (
      <Div className="koko">
        koko
        <Div className="loko">
          loko
        </Div>
      </Div>
    );
  }
});

module.exports = StyleTest;
