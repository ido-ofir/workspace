var React = require('react');
var core = require('core');

var Input = core.components.forms.FormInput;
var { Line, FlexCenter } = core.components.layout;
var { Button } = core.components.ui;
var Input = core.components.forms.FormInput;

var Login = React.createClass({
  mixins: [core.mixins.cursor, core.mixins.form],
  getInitialState(){
    return {
      email: '',
      password: ''
    };
  },
  onSubmit(){},
  render(){
    return (
        <FlexCenter style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '300px', border: '1px solid #ddd', padding: '5px 20px' }}>
            <Line>
              <Input name="email"
                     cursor={ this.Cursor('email') }
                     placeholder="Email"
                     required="please enter your email"/>
            </Line>
            <Line>
              <Input name="password"
                     cursor={ this.Cursor('email') }
                     placeholder="Password"/>
            </Line>
            <Line>
              <Button onClick={ this.submit }>Login</Button>
            </Line>

          </div>
        </FlexCenter>
    );
  }
});

module.exports = Login;
