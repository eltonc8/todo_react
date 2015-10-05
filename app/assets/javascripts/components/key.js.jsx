var Key = React.createClass({
  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    var noteName = this.props.keyName,
        freq = TONES[noteName];
    this.note = new Note(freq);
    KeyStore.addChangeListener(this._onChange);
    // KeyStore.on("keyPlay", this.noteStart);
    // KeyStore.on("keyPlayStop", this.noteStop);
  },

  render: function(){
    var classTags = "btn " + (this.state.pressed ? "btn-active " : ""),
        key = this.props.keyName,
        sharp = /#/.test(key);

    classTags = classTags + (sharp ? "btn-primary" : "btn-default");
    return (
      <button className={classTags}>{key}</button>
    )
  },

  _onChange: function(){
    KeyStore.keyState(this.props.keyName) ? this.note.start() : this.note.stop();
  },
});

$(function(){
  React.render(
    <Key keyName={"A4"}/>,
    $("#content").get(0)
  )
})
