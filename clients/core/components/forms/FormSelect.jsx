var React = require('react');
var reform = require('../../mixins/reform');

var inputStyle = {
    width: '100%',
    color: '#a9abad',
    border: '0',
    background: 'transparent',
    fontSize: '14px',
    outline: 'none'
};

var placeHolderStyle = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    color: '#a9abad',
    fontFamily: 'Roboto',
    fontSize: '14px',
    pointerEvents: 'none',
    zIndex: 1
};

var errorStyle = {
    color: 'red',
    position: 'absolute',
    fontSize: '11px'
};

module.exports = React.createClass({
    mixins: [reform.Input],
    propTypes: {
        cursor: React.PropTypes.object.isRequired,
        options: React.PropTypes.array.isRequired,
        display: React.PropTypes.string,
        set: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    handleChange (e) {
        var cursor = this.props.cursor;
        var value = e.target.value;
        cursor.set(value);
        if(this.props.onChange) this.props.onChange(value);
    },
    renderOption (option, i) {
        if(!option) return null;
        var set = this.props.set || 'id';
        var display = this.props.display || 'name';
        return (<option key={ i } value={ option[set] }>{ option[display] }</option>)
    },
    renderOptions (options, value) {
        var empty = (<option key="empty" value=""></option>);
        if(!options) return empty;
        var items = options.map(this.renderOption);
        if(!value) items.unshift(empty);
        return items;
    },
    renderError(){
      if(!this.state.error) return null;
      return (
        <div style={ errorStyle }>{ this.state.error }</div>
      );
    },
    renderPlaceholder(value){
      if(value) return null;
      if(!this.props.placeholder) return null;
      return (
        <div style={ placeHolderStyle }>{ this.props.placeholder }</div>
      );
    },
    render() {
        var options = this.props.options;
        var value = this.props.cursor.get() || '';
        var input = this.props.style ? this.props.style : {};
        input = { ...inputStyle, ...input };

        return (
            <div style={ {position: 'relative'} }>
                <select style={ input } onChange={this.handleChange} value={ value }>
                    { this.renderOptions(options, value) }
                </select>
                { this.renderPlaceholder(value) }
                { this.renderError() }
            </div>
        );
    }
});
