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
    var classTags = "btn btn-default " + (this.state.pressed ? "active " : ""),
        key = this.props.keyName;

    return (
      <button className={classTags}><span>{key}</span></button>
    )
  },

  _onChange: function(){
    this.setState({pressed: KeyStore.keyState(this.props.keyName)})
    this.state.pressed ? this.note.start() : this.note.stop();
  },
});
