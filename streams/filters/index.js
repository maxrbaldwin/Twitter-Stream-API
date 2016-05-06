var chalk = require('chalk');

var streamFilter = function(tweet) {
  console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
};

module.exports = streamFilter;