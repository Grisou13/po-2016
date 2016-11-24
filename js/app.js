//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const log = console.log;
window.getParameterByName = (name, url) => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
window.addToUrl = (name,value,url)=> {
  if (!url) {
    url = window.location.href;
  }
  if(!value){
    value = "";
  }
  var separator = (url.indexOf("?")===-1)?"?":"&";
  return url + separator + name + "=" + value;
}

window.redirectHome = () =>{
  return window.location.pathname == "/" ? false : window.location.assign("/")
}

var host = window.location.hostname;
var client = window.client = deepstream(host+':8000').login()
client.on('error', ( error, event, topic ) =>  console.log("error : ",error, event, topic) );

//##############
//
//
// register
//
//
//#############
let register = document.querySelector("#register-button");
console.log(register);
if(register){
  register.addEventListener('click', e =>{
    //e.preventDefault();
    console.log(e.target);
    const self = e.target;
    let form = document.querySelector(self.dataset.form);

    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      let users = client.record.getList(`users`);
      let id = `users/${client.getUid()}`;
      let u = {
        id:id,
        name:document.querySelector("input#user-name").value,
        surname:document.querySelector("input#user-surname").value
      };
      // let image = Webcam.snap((data_uri)=>{
      //   let raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
      //   return raw_image_data;
      // }); //http://mycodingtricks.com/javascript/webcam-api/
      client.record.getRecord( id ).set(u);
      users.addEntry(id);
      client.event.emit("new/user",u);
      window.location.assign("/games?user="+id);
    })

  })
}
