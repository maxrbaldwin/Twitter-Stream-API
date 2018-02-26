// register module aliases from package.json
require('module-alias/register');

const app = require('@app');
const startStream = require('@streams');
const server = require('http').Server(app);
const sockets = require('@sockets');
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

const openSockets = function() {
  io.on('connection', sockets);
}

const createApplication = function() {
  server.on('request', app);
};

const startServer = function() {
  server.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
  });
};

Promise.resolve().then(createApplication).then(startServer).then(openSockets).then(startStream).catch(function(err){
  console.error(err.stack);
  process.kill(1);
});
