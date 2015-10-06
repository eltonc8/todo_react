;(function () {
  window.KeyActions = {
    // AWSED maps to 65, 87, 83, 69, 68
    // FTGYHUJ maps to 70, 84, 71, 89, 72, 85, 74

    keyCodesToNotes: {
      65: "C4",
      87: "C#4/Db4",
      83: "D4",
      69: "D#4/Eb4",
      68: "E4",

      70: "F4",
      84: "F#4/Gb4",
      71: "G4",
      89: "G#4/Ab4",
      72: "A4",
      85: "A#4/Bb4",
      74: "B4",

      75: "C5",
      79: "C#5/Db5",
      76: "D5",
      80: "D#5/Eb5",
      186: "E5",
    },

    keyPressed: function (event){
      var code = event.keyCode,
          action = {
            actionType: "keyPlay",
            noteName: KeyActions.keyCodesToNotes[code]
          };
      if (action.noteName) {
        AppDispatcher.dispatch(action);
      }
    },

    keyPressedStop: function (event){
      var code = event.keyCode,
          action = {
            actionType: "keyPlayStop",
            noteName: KeyActions.keyCodesToNotes[code]
          };
      if (action.noteName) {
        AppDispatcher.dispatch(action);
      }
    },

    keysSet: function(keys){
      var action = {
        actionType: "keySet",
        keys: keys,
      }
      AppDispatcher.dispatch(action);
    }
  };

  $(document).on("keydown", KeyActions.keyPressed);
  $(document).on("keyup", KeyActions.keyPressedStop);
})();
