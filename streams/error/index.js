var chalk = require('chalk');

var streamError = function(err) {
  console.log('Stream Error: ', chalk.red(err));
};

module.exports = streamError;
