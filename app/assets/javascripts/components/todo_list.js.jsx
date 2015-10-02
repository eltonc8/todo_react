var TodoList = React.createClass({
  getInitialState: function(){
    return { todos: Todos.all() };
  },

  componentDidMount: function(){
    Todos.addChangedHandler(this.todosChanged.bind(this));
    Todos.fetch();
  },

  todosChanged: function(){
    this.setState({todos: Todos.all()});
  },

  render: function(){
    todos = this.state.todos;

    return (
      <ul className="todo">
      {todos.map(function (item){
        return <li>{item.title}</li>
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
