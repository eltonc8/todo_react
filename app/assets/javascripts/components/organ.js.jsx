var Organ = React.createClass({
  // whiteKeys: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
  whiteKeys: [65, 83, 68, 70, 71, 72, 74, 75, 76, 186],
  // blackKeys: ["C#4/Db4", "D#4/Eb4", "F#4/Gb4", "G#4/Ab4", "A#4/Bb4", "C#5/Db5", "D#5/Eb5"],
  blackKeys: [87, 69, 84, 89, 85, 79, 80],

  render: function(){
    var keyList = KeyActions.keyCodesToNotes,
        blackKeyArray = this.blackKeys.map(function(key){
          console.log(key + keyList[key])
          return (<Key keyName={keyList[key]}/>);
        }),
        whiteKeyArray = this.whiteKeys.map(function(key){
          console.log(key + keyList[key])
          return (<Key keyName={keyList[key]}/>);
        });
    return (
      <div className="organ">
        <Recorder />
        <div className="white-keys">
          {whiteKeyArray}
        </div>
        <div className="black-keys">
          {blackKeyArray}
        </div>
      </div>
    )
  }

})

$(function(){
  React.render(
    <Organ />,
    $("#content").get(0)
  )
})
