var React = require('react');
var reform = require('../../mixins/reform');
var inputStyle = {
  display: 'block',
  width: '100%',
  lineHeight: 1.42857143,
  outline: 0,
  height: '34px',
  padding: '6px 12px',
  fontSize: '14px',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
  WebkitTransition: 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
  Otransition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
  transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
};
var focusStyle = {
  border: '1px solid #66afe9',
  WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)'
};
var errorStyle = {
    position: 'absolute',
    fontSize: '10px',
    left: '6px',
    right: 0,
    bottom: '-14px',
    color: 'red',
    textAlign: 'left'
};

var FormInput = React.createClass({
    mixins: [reform.Input],
    propTypes: {
        cursor: React.PropTypes.object.isRequired
    },
    getInitialState() {
      return {
        focus : false
      }
    },
    onFocus(){
      this.setState({
        focus : true
      });
    },
    onBlur(){
      this.setState({
        focus : false
      });
    },
    handleChange (e) {
        this.props.cursor.set(e.target.value);
    },
    renderError(){
      if(!this.state.error) return null;
      return (
        <div style={ errorStyle }>
            { this.state.error }
        </div>
      );
    },
    render() {
        var focus = this.state.focus ? focusStyle : {};
        var style = this.props.style ? { ...this.props.style } : {};
        var value = this.props.cursor.get();


        return (
            <div style={{position: 'relative'}}>
                  <input type={ this.props.type || "text" }
                         style={{ ...inputStyle, ...focus, ...style }}
                         placeholder={this.props.placeholder}
                         value={ value }
                         onChange={this.handleChange}
                         name={ this.props.name }
                         onFocus={ this.onFocus }
                         onBlur={ this.onBlur }/>
                       { this.renderError() }
            </div>
        );
    }
});
module.exports = FormInput;
