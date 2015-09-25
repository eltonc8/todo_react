if (typeof window.Todo === "undefined") {
    window.Todo = {};
  }


var todo = Todo.todo = function (callback){
  this.changed = callback;
  this._todos = [];
};

todo.prototype.fetchProcessor = function (resp){
  resp = JSON.parse(resp);
  this._todos = resp;
  this.changed();
};

todo.prototype.fetch = function (){
  var url = "/api/todos/",
      fetchProcessor = this.fetchProcessor,
      xmlhttp = window.XMLHttpRequest && new window.XMLHttpRequest() ||
          window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function (){
    if (xmlhttp.readyState == XMLHttpRequest.DONE ){
      if(xmlhttp.status == 200){
        fetchProcessor(xmlhttp.responseText);
      } else {
        console.log("error in GET resquest to /api/todos/, status: " + xmlhttp.status);
      }
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

todo.prototype.createProcessor = function (resp){
  resp = JSON.parse(resp);
  this._todos.push(resp);
  this.changed();
};

todo.prototype.create = function (obj){
  var data = JSON.stringify(obj),
      url = "/api/todos/?data=" + data,
      createProcessor = this.createProcessor,
      xmlhttp = window.XMLHttpRequest && new window.XMLHttpRequest() ||
          window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function (){
    if (xmlhttp.readyState == XMLHttpRequest.DONE ){
      if(xmlhttp.status == 200){
        createProcessor(xmlhttp.responseText);
      } else {
        console.log("error in POST resquest to /api/todos/, status: " + xmlhttp.status);
      }
    }
  };

  xmlhttp.open("POST", url, true);
  xmlhttp.send();
};

todo.prototype.destroyProcessor = function (resp){
  resp = JSON.parse(resp);
  var id = resp.id,
      index = this._todos.findIndex(function (obj) {return obj.id == id; });
  if (index >= 0) this._todos.splice(index, 1);
  this.changed();
};

todo.prototype.destroy = function (obj){
  var id = obj.id,
      url = "/api/todos/" + id,
      deleteProcessor = this.deleteProcessor,
      xmlhttp = window.XMLHttpRequest && new window.XMLHttpRequest() ||
          window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == XMLHttpRequest.DONE ){
      if(xmlhttp.status == 200){
        deleteProcessor(xmlhttp.responseText);
      } else {
        console.log("error in DELETE resquest to /api/todos/, status: " + xmlhttp.status);
      }
    }
  };

  xmlhttp.open("DELETE", url, true);
  xmlhttp.send();
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
      url = "/api/todos/?data=" + data,
      deleteProcessor = this.deleteProcessor,
      xmlhttp = window.XMLHttpRequest && new window.XMLHttpRequest() ||
          window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == XMLHttpRequest.DONE ){
      if(xmlhttp.status == 200){
        deleteProcessor(xmlhttp.responseText);
      } else {
        console.log("error in PATCH resquest to /api/todos/, status: " + xmlhttp.status);
      }
    }
  };

  xmlhttp.open("DELETE", url, true);
  xmlhttp.send();
};
