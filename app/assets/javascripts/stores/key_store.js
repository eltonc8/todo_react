;(function () {
  var _playingKeys = {};
  var CHANGE_EVENT = 'change';

  function playBegin(key){
    _playingKeys[key] = true;
  }

  function playStop(key){
    _playingKeys[key] = undefined;
  }

  function keyState(key){
    return _playingKeys[key];
  }

  function setKeys(keys){
    for (var key in _playingKeys) {
      _playingKeys[key] = undefined;
    }
    $.extend(_playingKeys, keys);
  }

  window.KeyStore = $.extend({}, EventEmitter.prototype, {
    emitChange: function(){
      this.emit(CHANGE_EVENT);
    },

    allKeyState: function(){
      return jQuery.extend({}, _playingKeys);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    keyState: function(key){
      return keyState(key);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
  });

  // Register callback to handle all updates
  AppDispatcher.register(function(action) {
    switch(action.actionType) {

      case "keyPlay":
        playBegin(action.noteName);
        KeyStore.emitChange();
      break;

      case "keyPlayStop":
        playStop(action.noteName);
        KeyStore.emitChange();
      break;

      case "keySet":
        setKeys(action.keys);
        KeyStore.emitChange();
      break;

      default:
      // no op
    }
  });
})();
