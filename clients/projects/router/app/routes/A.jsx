
var React = require('react');
var core = require('core');
var FormInput = core.components.forms.FormInput;
var A = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    return (
      <div>route A{ this.props.params.koko }
        <FormInput name="kkok" cursor={{get(){}}}/>
      children:
      { this.props.children }
      </div>
    );
  }
});

module.exports = A;
