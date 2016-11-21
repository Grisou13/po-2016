const srv = require('http').createServer(require("./server"))

let run = (opts = {}) => {
    srv.listen(opts.port || 8080, function() {
      var host = srv.address().address;
      var port = srv.address().port;
      console.log("App is listening at http://%s:%s", host, port);
    });
  }
run();
