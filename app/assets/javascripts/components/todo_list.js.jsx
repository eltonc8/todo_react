var TodoList = React.createClass({
  getInitialState: function(){
    return { todos: Todos.all() };
  },

  componentDidMount: function(){
    this.props.todos.fetch();
  },

  todosChanged: function(){
    return { todos: Todos.all() };
  },

  render: function(){
    todos = this.props.todos;

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

var globalRender = function () {
  React.render(
    <TodoList todos={todos} />,
    $("#root").get(0)
  )
}

});
