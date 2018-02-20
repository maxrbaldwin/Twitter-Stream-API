const chalk = require('chalk');
const { getStreamIds } = require('./../ids');

function checkIsTweetedBySources(tweetId) {
  const streamIds = getStreamIds();
  
  return streamIds.includes(tweetId);
}

const streamFilter = function(tweet) {
  const {
    text,
    id: tweetId,
    user: {
      id: userId,
      screen_name: handle,
    }
  } = tweet;

  const display = `${handle}: ${text}`;
  const isTweetedBySources = checkIsTweetedBySources(tweetId);

  if (isTweetedBySources) {
    console.log(display);
  }
};

module.exports = streamFilter;
