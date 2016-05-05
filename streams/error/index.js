var chalk = require('chalk');

var streamError = function(err) {
  console.log(chalk.red(err));
};

module.exports = streamError;