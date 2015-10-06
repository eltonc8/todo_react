var Recorder = React.createClass({
  getInitialState: function(){
    return {
      isRecording: false,
      track: new Track(),
    };
  },

  componentWillUnmount: function() {
    KeyStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var recordButton = this._getButton();

    return (
      <div className="recorder">
        <div className="title">Recorder Controls</div>
        {recordButton}
      </div>
    )
  },

  _getButton: function(){
    if (this.state.isRecording) {
      return (
        <button className="btn btn-danger btn-record"
          onClick={this._recordingEnd}>
        Stop <span className="glyphicon glyphicon-stop" aria-hidden="true"/>
        </button>
      )
    } else {
      return (
        <button className="btn btn-danger btn-record"
          onClick={this._recordingStart}>
        Record <span className="glyphicon glyphicon-record" aria-hidden="true"/>
        </button>)
    }
  },

  _onChange: function(){
    this.state.track.addNote();
  },

  _recordingStart: function(){
    this.setState({isRecording: true})
    this.state.track.startRecording();
    KeyStore.addChangeListener(this._onChange);
  },


  _recordingEnd: function(){
    this.setState({isRecording: false})
    this.state.track.stopRecording();
    KeyStore.addChangeListener(this._onChange);
  },
});
