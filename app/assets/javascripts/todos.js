;(function (){
  "use strict";

  if (typeof window.Todos == "undefined") {
      window.Todos = {};
  }

  Todos._todos = [];
  Todos._callbacks = [];

  Todos.AJAXSuccess = function(resp, callback){
    callback(resp);
    this.changed();
  };

  Todos.AJAXError = function(method, url, resp){
    var errorMessage = "error in request, (#method), to (#url). Replied with status: ";
    errorMessage = errorMessage.replace(/#method/, method);
    errorMessage = errorMessage.replace(/#url/, url);
    console.log(errorMessage + resp.responseText);
  };

  Todos.AJAXRequest = function(method, callback, todoObj){
    var url = "/api/todos/" + (todoObj && todoObj.id ? todoObj.id : ""),
        data = todoObj ? {todo: todoObj} : null,
        success = function (resp) { this.AJAXSuccess(resp, callback.bind(this)); }.bind(this),
        error = function (resp) { this.AJAXError(method, url, resp); }.bind(this);

    $.ajax({
      url: url,
      type: method,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));},
      dataType: 'json',
      data: data,
      success: success,
      error: error
    });
  };

  Todos.all = function () {
    return this._todos.slice(0);
  };

  Todos.changed = function () {
    this._callbacks.forEach( function (fn) {fn();}.bind(this) );
  };

  Todos.addChangedHandler = function (fn) {
    this._callbacks.push(fn);
  };

  Todos.removeChangedHandler = function (fn) {
    var index = this._callbacks.indexOf( fn );
    if (index >= 0) this._todos.splice(index, 1);
  };

  Todos.fetchProcessor = function (resp){
    this._todos = resp;
  };

  Todos.fetch = function (){
    this.AJAXRequest("GET", this.fetchProcessor);
  };

  Todos.createProcessor = function (resp){
    this._todos.push(resp);
  };

  Todos.create = function (obj){
    this.AJAXRequest("POST", this.createProcessor, obj);
  };

  Todos.destroyProcessor = function (resp){
    var id = resp.id,
        index = this._todos.findIndex(function (obj) {return obj.id == id; });
    if (index >= 0) this._todos.splice(index, 1);
  };

  Todos.destroy = function (obj){
    this.AJAXRequest("DELETE", this.destroyProcessor, obj);
  };

  Todos.toggleDone = function (obj){
    obj.done = obj.done ? false : true;
    this.update(obj);
  };

  Todos.updateProcessor = function (resp){};

  Todos.update = function (obj){
    this.AJAXRequest("PATCH", this.updateProcessor, obj);
  };
}.call(this));
