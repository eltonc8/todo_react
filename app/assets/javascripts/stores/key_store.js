;(function () {
  var _playingKeys = {};
  var CHANGE_EVENT = 'change';

  function playBegin(key){
    _playingKeys[key] = true;
  }

  function playStop(key){
    _playingKeys[key] = undefined;
  }

  window.KeyStore = $.extend({}, EventEmitter.prototype, {
    emitChange: function(){
      this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }

  });

  // Register callback to handle all updates
  AppDispatcher.register(function(action) {
    var key;

    switch(action.actionType) {

      case "keyPlay":
        playBegin(action.noteName);
        KeyStore.emitChange();
      break;

      case "keyPlayStop":
        playStop(action.noteName);
        KeyStore.emitChange();
      break;

      default:
      // no op
    }
  })();
