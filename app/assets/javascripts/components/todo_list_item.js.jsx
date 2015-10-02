var TodoListItem = React.createClass({
  delete: function(event){
    event.preventDefault();
    Todos.destroy(this.props.todo);
  },

  render: function(){
    var todo = this.props.todo;
    return (
      <div>
        <div className="todo-list-item-title">{todo.title}</div>
        <div className="todo-list-item-body">{todo.body}</div>
        <DoneButton todo={todo}/>
        <button onClick={this.delete} className="btn btn-danger">Delete</button>
      </div>
    )
  },
});
