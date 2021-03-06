const webapp = require('./backend/app');
const http = require('http');

const normalizePort = (value) => {
  var port = parseInt(value, 10);

  if (isNaN(port)) {
    // named pipe
    return value;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  console.log(error);
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "8081");
webapp.set("port", port);

const server = http.createServer(webapp);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
