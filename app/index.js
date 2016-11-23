

let run = (opts = {}) => {
  const Deepstream = require('deepstream.io')
  const server = new Deepstream({port:8000})
  server.start()
  const srv = require('http').createServer(require("./server"))
  srv.listen(opts.port || 8080, function() {
    var host = srv.address().address;
    var port = srv.address().port;
    console.log("App is listening at http://%s:%s", host, port);
  });



  }
run();
