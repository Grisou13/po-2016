var client = window.client = deepstream('localhost:6020').login()
client.event.subscribe("users/new",(data)=>{
  var user = fetch("localhost:8080/users/"+data.id)
})

$("#add").submit((e)=>{
  e.preventDefault();

  let users = client.record.getList(`users`);
  let id = `users/${client.getUid()}`;
  let username = $("#username").val();
  let image =
  client.record.getRecord( id ).set( {"username":username} );
  users.addEntry(id);
})
