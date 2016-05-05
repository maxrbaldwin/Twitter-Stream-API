var chalk = require('chalk');
var Twitter = require('twitter');
var env = require('dotenv').config();

var streamFilter = require('./streams/filters');
var streamError = require('./streams/error');
var streamIDs = require('./streams/ids');

var client = new Twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret
});

var streamParameters = {
  follow: streamIDs.getStreamIDs()
};

client.stream('statuses/filter', streamParameters, function (stream) {
  stream.on('data', streamFilter);
  stream.on('error', streamError);
});