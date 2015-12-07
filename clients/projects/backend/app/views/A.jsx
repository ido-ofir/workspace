
var React = require('react');
var core = require('core');
var ArrowHead = require('../widgets/ArrowHead.jsx');
var FormInput = core.components.forms.FormInput;

var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
  pre: {
    background: '#eee',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  action: {
    border: '1px solid #eee',
    borderRadius: '4px'
  }
};

var DataItem = React.createClass({
  getInitialState(){
    return {
      isOpen: false
    };
  },
  onClick(e){
    this.setState({
      isOpen: !this.state.isOpen
    });
    e.stopPropagation();
  },
  render: function() {
    var content = this.state.isOpen ? (<pre style={ styles.pre }>{ JSON.stringify(this.props.data, null, 2) }</pre>) : null;
    return (
      <div style={{ padding: '4px' }}>
        <div onClick={ this.onClick }>
          <ArrowHead isOpen={ this.state.isOpen }/>
          { this.props.name }
        </div>
        <div style={{ paddingLeft: '16px' }}>
          { content }
        </div>
      </div>
    );
  }

});

var Action = React.createClass({
  getInitialState(){
    return {
      isOpen: false
    };
  },
  onClick(e){
    this.setState({
      isOpen: !this.state.isOpen
    });
    e.stopPropagation();
  },
  renderAction(action, index){
    return (
      <Action action={ action } key={ index }></Action>
    );
  },
  renderContent(action){
    if(!this.state.isOpen) return null;
    return (
      <div style={{ padding: '0 16px 16px 16px' }}>
        <DataItem name="request" data={ action.request }></DataItem>

        { action.actions.map(this.renderAction) }
        <DataItem name="response" data={ action.response }></DataItem>
      </div>
    );
  },
  render: function() {
    var action = this.props.action;
    var content = this.state.isOpen ? (action.actions.map(this.renderAction)) : null;
    return (

      <div onClick={ this.onClick } style={ styles.action }>
        <div style={{ padding: '4px' }}>
          <ArrowHead isOpen={ this.state.isOpen }/>
          { action.path.join('.') }
        </div>
        { this.renderContent(action) }
      </div>
    );
  }

});

var Actions = React.createClass({
  mixins: [core.mixins.connection],
  getInitialState(){
    return {
      actions: []
    };
  },
  onAction(action){
    var actions = this.state.actions;
    actions.push(action);
    this.setState({
      actions: actions
    });
  },
  componentDidMount(){
    this.connection.on('core.action', this.onAction);
  },
  componentWillUnmount(){
    this.connection.off('core.action', this.onAction);
  },
  renderAction(action, i){
    return (
      <Action action={ action } key={ i }/>
    );
  },
  render(){
    return (
      <div style={{ padding: '20px'}}>
        { this.state.actions.map(this.renderAction) }
      </div>
    );
  }
});

module.exports = Actions;
