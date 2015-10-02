var TodoListItem = React.createClass({
  componentDidMount: function(){
  },

  render: function(){
    var item = this.props.item;
    return (
      <li>
        <div className="todo-list-item-title">{item.title}</div>
        <div className="todo-list-item-body">{item.body}</div>
        <div className="todo-list-item-done">{item.done}</div>
      </li>
    )
  },
});
