const Twitter = require('twitter');
const env = require('dotenv').config();

const streamFilter = require('./filters');
const streamError = require('./error');
const { getMultiStreamParameters } = require('./ids');

const streamParameters = {
  follow: getMultiStreamParameters(),
};

const client = new Twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret
});

client.stream('statuses/filter', streamParameters, function (stream) {
  console.log('Listening...');

  stream.on('data', streamFilter);
  stream.on('error', streamError);
});
