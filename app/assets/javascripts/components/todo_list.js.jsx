var TodoList = React.createClass({
  getInitialState: function(){
    return { todos: Todos.all() };
  },

  componentDidMount: function(){
    Todos.addChangedHandler(this.todosChanged);
    Todos.fetch();
  },

  todosChanged: function(){
    this.setState({todos: Todos.all()});
  },

  render: function(){
    todos = this.state.todos;

    return (
      <ul className="todo">
        <li key={0} className="todo-form">
          <TodoForm/>
        </li>
      {
        todos.map(function (todo, idx){
          return <li key={idx}>{<TodoListItem todo={todo} />}</li>
        })
      }
      </ul>
    )
  },
});

$(function () {
  React.render(
    <TodoList />,
    $("#root").get(0)
  )
});
