;(function (){
  "use strict";

  if (typeof window.Todo == "undefined") {
      window.Todo = {};
  }
  console.log("todo is evaluated");

  var todo = Todo.todos = function (callback){
    this.changed = callback;
    this._todos = [];
  };

  todo.prototype.XMLReply = function(resp, callback){
    resp = JSON.parse(resp);
    callback(resp);
    this.changed();
  };

  todo.prototype.XMLRequest = function(method, url, callback){
    var fn = function (resp) { this.XMLReply(resp, callback.bind(this)); }.bind(this);

    var xmlhttp = window.XMLHttpRequest && new window.XMLHttpRequest() ||
        window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP");
    var errorMessage = "error in request, (#method), to (#url). Replied with status: ";
    errorMessage = errorMessage.replace(/#method/, method);
    errorMessage = errorMessage.replace(/#url/, url);

    xmlhttp.onreadystatechange = function (){
      if (xmlhttp.readyState == XMLHttpRequest.DONE ){
        if(xmlhttp.status == 200){
          fn(xmlhttp.responseText);
        } else {
          console.log(errorMessage + xmlhttp.status);
        }
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  };

  todo.prototype.fetchProcessor = function (resp){
    this._todos = resp;
  };

  todo.prototype.fetch = function (){
    this.XMLRequest("GET", "/api/todos/", this.fetchProcessor);
  };

  todo.prototype.createProcessor = function (resp){
    this._todos.push(resp);
  };

  todo.prototype.create = function (obj){
    var data = JSON.stringify(obj),
        url = "/api/todos/?todo=" + data;

    this.XMLRequest("POST", url, this.createProcessor);
  };

  todo.prototype.destroyProcessor = function (resp){
    var id = resp.id,
        index = this._todos.findIndex(function (obj) {return obj.id == id; });
    if (index >= 0) this._todos.splice(index, 1);
  };

  todo.prototype.destroy = function (obj){
    var id = obj.id,
        url = "/api/todos/" + id;

    this.XMLRequest("DELETE", url, this.destroyProcessor);
  };

  todo.prototype.toggleDone = function (obj){
    obj.done = obj.done ? false : true;
    this.update(obj);
  };

  todo.prototype.updateProcessor = function (resp){
    resp = JSON.parse(resp);
    this.changed();
  };

  todo.prototype.update = function (obj){
    var data = JSON.stringify(obj),
        id = obj.id,
        url = "/api/todos/?todo=" + data;

    this.XMLRequest("PATCH", url, this.updateProcessor);
  };
})();
