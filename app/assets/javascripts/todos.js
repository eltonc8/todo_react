;(function (){
  "use strict";

  if (typeof window.Todo == "undefined") {
      window.Todo = {};
  }

  var todo = Todo.todos = function (callback){
    this.changed = callback;
    this._todos = [];
  };

  todo.prototype.AJAXSuccess = function(resp, callback){
    callback(resp);
    this.changed();
  };

  todo.prototype.AJAXError = function(method, url, resp){
    var errorMessage = "error in request, (#method), to (#url). Replied with status: ";
    errorMessage = errorMessage.replace(/#method/, method);
    errorMessage = errorMessage.replace(/#url/, url);
    console.log(errorMessage + resp.responseText);
  };

  todo.prototype.AJAXRequest = function(method, callback, todoObj){
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

  todo.prototype.fetchProcessor = function (resp){
    this._todos = resp;
  };

  todo.prototype.fetch = function (){
    this.AJAXRequest("GET", this.fetchProcessor);
  };

  todo.prototype.createProcessor = function (resp){
    this._todos.push(resp);
  };

  todo.prototype.create = function (obj){
    this.AJAXRequest("POST", this.createProcessor, obj);
  };

  todo.prototype.destroyProcessor = function (resp){
    var id = resp.id,
        index = this._todos.findIndex(function (obj) {return obj.id == id; });
    if (index >= 0) this._todos.splice(index, 1);
  };

  todo.prototype.destroy = function (obj){
    this.AJAXRequest("DELETE", this.destroyProcessor, obj);
  };

  todo.prototype.toggleDone = function (obj){
    obj.done = obj.done ? false : true;
    this.update(obj);
  };

  todo.prototype.updateProcessor = function (resp){};

  todo.prototype.update = function (obj){
    this.AJAXRequest("PATCH", this.updateProcessor, obj);
  };
})();
