;(function(){
  window.Track = function(attributes){
    this.name = attributes && attributes.name || "Unnamed Track";
    this.roll = attributes && attributes.roll || [];
  };

  $.extend(Track.prototype, {
    startRecording: function(){
      this.roll = [];
      this.startTime = new Date();
    },

    addNote: function(keyState){
      var receipt = {
        time: new Date() - this.startTime,
        notes: keyState || KeyStore.allKeyState(),
      };
      this.roll.push(receipt);
    },

    stopRecording: function(){
      this.addNote({});
    },
  });
})();
