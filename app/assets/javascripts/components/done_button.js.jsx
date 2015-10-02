var DoneButton = React.createClass({
  handleDone: function(event){
    event.preventDefault();
    Todos.toggleDone(this.props.todo);
  },

  render: function(){
    var done = this.props.todo.done;

    return (
      <button className={done ? "btn btn-success" : "btn btn-warning"}
        onClick={this.handleDone} >
        {done ? ":D" : "Done?"}
      </button>
    )
  }
});
