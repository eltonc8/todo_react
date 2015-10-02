var TodoForm = React.createClass({
  getInitialState: function(){
    return {title: "", body: ""};
  },

  updateTitle: function(event){
    this.setState({title: event.target.value});
  },

  updateBody: function(event){
    this.setState({body: event.target.value});
  },

  handleSubmit: function(event){
    event.preventDefault();
    Todos.create(this.state);
  },

  render: function(){
    return (
      <form>
        <div className='form-group'>
        <input type='text' className='todo-title' value={this.state.title}
          onChange={this.updateTitle} placeholder="Title of Todo"/>
        </div>
        <div className='form-group'>
        <textarea className='todo-body'
          onChange={this.updateBody} placeholder="Body of Todo"
          >{this.state.body}</textarea>
        </div>
        <div className='form-group'>
        <button className='btn btn-primary todo-submit'
          onClick={this.handleSubmit}>create Todo!</button>
        </div>
      </form>
    )
  },
});
