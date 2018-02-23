// register module aliases from package.json
require('module-alias/register');

const app = require('@app');
const startStream = require('@streams');

const server = require('http').Server();

const PORT = process.env.PORT || 3000;

const createApplication = function() {
  server.on('request', app);
};

const startServer = function() {
  server.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
  });
};

Promise.resolve().then(createApplication).then(startServer).then(startStream).catch(function(err){
  console.error(err.stack);
  process.kill(1);
});
