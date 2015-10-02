var TodoListItem = React.createClass({
  componentDidMount: function(){
  },

  render: function(){
    var todo = this.props.todo;
    return (
      <div>
        <div className="todo-list-item-title">{todo.title}</div>
        <div className="todo-list-item-body">{todo.body}</div>
        <div className="todo-list-item-done">{todo.done}</div>
      </div>
    )
  },
});
