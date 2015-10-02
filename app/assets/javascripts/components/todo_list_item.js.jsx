var TodoListItem = React.createClass({
  getInitialState: function(){
    return { hidden: true };
  },

  toggleDetail: function(event){
    var toggle = !this.state.hidden
    this.setState({ hidden: toggle })
  },

  render: function(){
    var todo = this.props.todo,
        hidden = this.state.hidden

    return (
      <div>
        <div className="todo-list-item-title">{todo.title}</div>
        <DoneButton todo={todo}/>
        <button className="btn btn-info" onClick={this.toggleDetail}>
          More Details</button>
        {hidden ? "" : <TodoDetailView todo={todo} />}
      </div>
    )
  },
});
