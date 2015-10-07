    var Route = ReactRouter.Route,
        Link = ReactRouter.Link;

    var App = React.createClass({
      render: function(){

        return (
          <div>
            <h1>App</h1>
            {/* change the <a>s to <Link>s */}
            <ul>
              <li><Link to="/todo">Todo</Link></li>
              <li><Link to="/organ">Organ</Link></li>
            </ul>

            {this.props.children}
          </div>
        )
      }
    })

    $(function(){
      var MyRoutes = (
        <Route path="/" handler={App}>
          <Route path="/todo" name="todo" handler={TodoList} />
          <Route path="/organ" name="organ" handler={Organ} />
        </Route>
      );

      ReactRouter.run(MyRoutes, function (Handler) {
        React.render(<Handler/>, $("#application").get(0));
      });
    })
