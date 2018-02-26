const { NEW_TWEET } = require('@sockets/SocketEvents');

const connection = function(socket) {
  socket.on(NEW_TWEET, newTweet => {
    console.log('socket: ', newTweet);
  })
}

module.exports = connection;
