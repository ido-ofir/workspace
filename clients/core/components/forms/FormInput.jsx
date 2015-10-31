
var reform = require('../../mixins/reform');
var inputStyle = {
  width: '100%',
  height: '30px',
  // color: '#ddd',
  color: '#a9abad',
  borderLeft: '0',
  borderRight: '0',
  borderTop: '0',
  borderBottom: '1px solid #ddd',
  background: 'transparent',
  fontSize: '14px'
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
        luck : 'naa'
      }
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
        var style = this.props.style ? { ...this.props.style } : {};
        var value = this.props.cursor.get();


        return (
            <div style={{position: 'relative'}}>
                  <input type={ this.props.type || "text" }
                         style={ [inputStyle, style] }
                         placeholder={this.props.placeholder}
                         value={ value }
                         onChange={this.handleChange}
                         name={ this.props.name }/>
                       { this.renderError() }
            </div>
        );
    }
});
module.exports = Radium(FormInput);
