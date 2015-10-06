var Key = React.createClass({
  getInitialState: function(){
    return {pressed: false};
  },

  componentDidMount: function(){
    var noteName = this.props.keyName,
        freq = TONES[noteName];
    this.note = new Note(freq);
    KeyStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    KeyStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var key = this.props.keyName,
        classTags = "btn btn-default " +
           (this.state.pressed ? "active " : "") +
           (/#/.exec(key) ? "black-key " : "white-key ");

    return (
      <div className={classTags}><span>{key}</span></div>
    )
  },

  _onChange: function(){
    this.setState({pressed: KeyStore.keyState(this.props.keyName)})
    this.state.pressed ? this.note.start() : this.note.stop();
  },
});
