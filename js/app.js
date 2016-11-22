var client = window.client = deepstream('localhost:6020').login()
client.event.subscribe("users/new",(data)=>{
  var user = fetch("localhost:8080/users/"+data.id)
})

document.querySelector("#add").addEventListener('click',(e)=>{
  e.preventDefault();
  let modal = document.createElement("form");
  let username = document.createElement("input");
  username.type = "text";
  modal.appendChild(username);
  document.appendChild(modal);
  modal.class="modal modal-new-user";
  modal.addEventListener("submit",(e)=>{
    e.preventDefault();
    let users = client.record.getList(`users`);
    let id = `users/${client.getUid()}`;
    let u = username.value;
    // let image = Webcam.snap((data_uri)=>{
    //   let raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
    //   return raw_image_data;
    // }); //http://mycodingtricks.com/javascript/webcam-api/
    client.record.getRecord( id ).set( {"username":u} );
    users.addEntry(id);
    document.removeChild(modal);
  })

})
