const events = require('events');
const { parse: urlParse } = require('url');
// const io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
const { NEW_TWEET } = require('@sockets/SocketEvents')
const { getStreamIds, shouldTranslateById } = require('@ids');
const { scrapeHead, getUrlFromHead } = require('@utils/scraper');
const translate = require('@utils/translate');
const insertTweet = require('@db/insertTweet');

events.EventEmitter.prototype._maxListeners = 100;

function checkIsTweetedBySources(tweetId) {
  const streamIds = getStreamIds();
  return streamIds.includes(tweetId);
}

function getTweetLink(tweetAsArray) {
  for (var i = 0; i < tweetAsArray.length; i++) {
    if (urlParse(tweetAsArray[i]).protocol === 'http:' ||
        urlParse(tweetAsArray[i]).protocol === 'https:') {
        return tweetAsArray[i].trim();
    }
  }
}

const streamFilter = async function(tweet) {
  const {
    text,
    id: tweetId,
    user: {
      id: userId,
      screen_name: handle,
    }
  } = tweet;

  const isTweetedBySources = checkIsTweetedBySources(userId);

  if (!isTweetedBySources) {
    return;
  }

  const tweetAsArray = text.split(' ');
  const display = `${handle}: ${text}`;
  const tweetLink = getTweetLink(tweetAsArray);

  let articleUrl;

  if (tweetLink) {
    try {
      const scraped = await scrapeHead(tweetLink);
      articleUrl = getUrlFromHead(scraped);
    } catch (e) {
      console.log('scrape error: ', e);
    }
  }

  let translation;

  if (shouldTranslateById(userId)) {
    try {
      translation = await translate(display);
    } catch (e) {
      console.log('should translate error: ', e);
    }
  }

  const conditionalValues = Object.assign({},
    display ? { display } : null,
    tweetLink ? { tweetLink } : null,
    articleUrl ? { articleUrl } : null,
    translation ? { translation } : null,
  );
  console.log(translation || display);
  const newTweet = await insertTweet({
    ...conditionalValues,
    tweet,
  });

  // io.emit(NEW_TWEET, newTweet);
};

module.exports = streamFilter;
