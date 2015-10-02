var TodoDetailView = React.createClass({
  delete: function(event){
    Todos.destroy(this.props.todo);
  },

  render: function(){
    var todo = this.props.todo;

    return (
      <div className="todo-info">
        <div className="todo-list-item-body">{todo.body}</div>
        <button onClick={this.delete} className="btn btn-danger">Delete</button>
      </div>
    )
  }
});
