var Recorder = React.createClass({
  getInitialState: function(){
    return {
      isRecording: false,
      track: new Track(),
    };
  },

  componentWillUnmount: function() {
    KeyStore.removeChangeListener(this._onChange);
    this._clearInterval();
  },

  render: function(){
    var recordButton = this._getButton(),
        playButton = this._getPlayButton();

    return (
      <div className="recorder">
        <div className="title">Recorder Controls</div>
        {recordButton} {playButton}
      </div>
    )
  },

  _getPlayButton: function(){
    if (!this.state.isRecording) {
      return (
        <button className="btn btn-success" onClick={this._play}>
        Play<span className="glyphicon glyphicon-play" aria-hidden="true"/></button>
      )
    }
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
        </button>
      )
    }
  },

  _onChange: function(){
    this.state.track.addNote();
  },

  _play: function(){
    var duration, roll = this.state.track.roll;
    if (this.interval || !roll.length) return;

    this.playbackStartTime = Date.now();
    this.currentNote = 0;
    duration = roll[roll.length-1].time;
    this.interval = setInterval(this._player,100);
    setTimeout( this._clearInterval, duration + 10)
  },

  _player: function(){
    var now = Date.now(),
        roll = this.state.track.roll,
        timeout, notes;
    while (this.currentNote < roll.length &&
           roll[this.currentNote].time + this.playbackStartTime < now + 110) {
      timeout = roll[this.currentNote].time + this.playbackStartTime - now;
      notes = roll[this.currentNote].notes;
      setTimeout(function(){ KeyActions.keysSet(notes) }, timeout)
      this.currentNote++;
    }
  },

  _clearInterval: function(){
    if (this.interval) clearInterval(this.interval);
    this.interval = undefined;
  },

  _recordingStart: function(){
    //clean out previous states.
    this._clearInterval();
    KeyActions.keysSet({});

    this.setState({isRecording: true})
    this.state.track.startRecording();
    KeyStore.addChangeListener(this._onChange);
  },


  _recordingEnd: function(){
    KeyActions.keysSet({});
    this.setState({isRecording: false})
    this.state.track.stopRecording();
    KeyStore.removeChangeListener(this._onChange);
  },
});
