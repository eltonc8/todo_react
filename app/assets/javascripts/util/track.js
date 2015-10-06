;(function(){
  window.track = function(attributes){
    this.name = attributes.name;
    this.roll = attributes.roll;
  };

  $.extend(track.prototype, {
    startRecording: function(){
      this.roll = [];
      this.startTime = new Date();
    },

    addNote: function(keyState){
      var receipt = {
        time: new Date() - this.startTime,
        notes: keyState || KeyStore.allKeyState(),
      };
    },

    stopRecording: function(){
      this.addNote({});
    },
  });
})();
