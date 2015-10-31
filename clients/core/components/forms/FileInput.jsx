
var inputStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  cursor: 'pointer',
  opacity: 0
}
var FileInput = React.createClass({
    getInitialState () {
        var image = this.props.cursor.get();
        var state =  {
            name: '',
            src: ''
        };
        if(image){
            state.name = image.name || '';
            state.src = image.src || '';
        }
        return state;
    },
    onLoad (file, e) {
        var value = e.target.result;
        var image = {
            name: file.name,
            src: value
        };
        this.setState(image)
        this.props.cursor.set(image);
        if(this.props.onLoad) this.props.onLoad(image);
    },
    handleChange (e) {
        var el = e.target;
        var cursor, reader;
        if(el.files[0]){
            cursor = this.props.cursor;
            reader = new FileReader();
            reader.onload = this.onLoad.bind(this, el.files[0]);
            reader.readAsDataURL(el.files[0]);
        }
    },
    render () {
        return (
            <div style={ {position: 'relative', cursor: 'pointer', padding: 0} }>
                 { this.props.children }
                <input type="file" onChange={ this.handleChange } style={ inputStyle }/>
            </div>
        );
    }
});

module.exports = FileInput;
