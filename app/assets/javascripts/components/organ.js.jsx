var Organ = React.createClass({

  render: function(){
    var keyList = KeyActions.keyCodesToNotes,
        keys = Object.keys(keyList).map(function(key){
          return <Key keyName={keyList[key]}/>
        });
    return (
      <div className="organ">
        {keys}
      </div>
    )
  }

})

$(function(){
  React.render(
    <Organ />,
    $("#content").get(0)
  )
})
