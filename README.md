# NodeJS and Twitter's Stream API

By far, Twitter has one of the most developer friendly APIs on the internet. Whether you are learning about APIs, creating an app for a startup, learning about OAuth or just hacking around, Twitter’s API will be very easy to use. 

On top of the standard REST APIs that would be expected out of any API, Twitter also has a stream API. Twitter’s stream API is commonly referred to as a “fire hose” and should be visualized as such. With the proper credentials Twitter gives developers access to live feeds for any hashtag, user ID or @ mention. This means as a user tweets or a hashtag trends, Twitter will send data about those tweets directly to your app as it happens.

## Our App
For our app we are going to hook into the public statuses of a handful of major news organizations using their Twitter IDs. This includes tweets created by the user, tweets which are retweeted by the user, replies to any tweet created by the user and retweets of any tweet created by the user. This means a lot of data, very quickly. Again, imagine a fire hose.
 
This small app, created with NodeJS, will be able to handle all the data that Twitter will throw at it. This app can be later incorporated into a larger app. It will start off by setting our environmental variables while the app starts. Then, it will create a connection to the Twitter stream API. Finally, It will field all of the tweets that are sent in its direction. 

Later, there will be some examples about what can be done with this app, as well as how to handle the synchronous and asynchronous struggles of each tweet.

To start the project create a new directory and make a new file called `app.js`.
`mkdir TwitterStreamAPI && cd TwitterStreamAPI && touch app.js`

## Our NPMs
Assuming Node is already installed, run the command `npm init` in the new project directory to create a package.json file. Give the app a name and fill out the rest of the necessary fields.
`npm init`

There are two primary NPMs, [Dotenv](https://www.npmjs.com/package/dotenv) and [Twitter](https://www.npmjs.com/package/twitter), that will be used in this app. Then another one, [Chalk](https://www.npmjs.com/package/chalk), that will be used for visualizing data in the console. 

They can be install and saved with the following command.
`npm install --save dotenv twitter chalk `

Dotenv is used for managing environmental variables. The credentials that Twitter provides will be referenced as environmental variables to follow the best practice of never hard coding any credentials. The `.env` file that these credentials will be referenced from will be mentioned in our `.gitignore` file so that they never end up on Github.

Our credentials will be passed to the other primary NPM, Twitter. The Twitter NPM uses the very popular NPM Request to establish, maintain and reconnect if necessary to Twitter’s stream API.  

There is also one dev dependency that is being used called Nodemon. Nodemon can be used in any NodeJS project. Rather than starting the app with `node app.js` start the app with `nodemon app.js.` Nodemon will watch the projects files and restart the app when a file is saved. This NPM is strictly for convenience. It gets rid of the annoying task of having to start and stop an app every time there is a change.

Nodemon can be installed and saved as a dev dependency with the following command.
`npm install --save-dev nodemon`

Nodemon should also be install globally, so that it can be run as a terminal command.
`npm install -g nodemon`

After all the NPMs are done installing, the `package.json` file should look similar to this:
```
{
  "name": "twitterstreamapi",
  "version": "1.0.0",
  "description": "An example project for working with NodeJS and Twitter's stream API",
  "main": "app.js",
  "scripts": {
    "test": "node app.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/maxrbaldwin/Twitter-Stream-API.git"
  },
  "keywords": [
    "Node",
    "Twitter",
    "API"
  ],
  "author": "Max Baldwin",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/maxrbaldwin/Twitter-Stream-API/issues"
  },
  "homepage": "https://github.com/maxrbaldwin/Twitter-Stream-API#readme",
  "dependencies": {
    "chalk": "^1.1.3",
    "dotenv": "^2.0.0",
    "twitter": "^1.2.5"
  },
  "devDependencies": {
    "nodemon": "^1.9.2"
  }
}
```

## Getting Your Twitter Credentials
To get credentials for this Twitter app, navigate to [Twitter’s developer apps page](https://apps.twitter.com/). On this page there is a button near the top right corner that says, `Create New app`. 
![create new app](https://s3.amazonaws.com/f.cl.ly/items/2X1q0b0S1X1T1T3V0G0p/Screen%20Shot%202016-05-04%20at%204.37.23%20PM.png?v=4b00bfb1)
On the create new app page, fill out the necessary information and agree to the terms and conditions. The field for callback URL is unnecessary for this app because there is no Oauth. Just fill that field in with `http://localhost.com`. When Twitter is done registering this new app, navigate to the `Keys and Access Tokens` tab after clicking on the app name. On this page there are four important details. The consumer key, consumer secret, access token and access token secret will be environmental variables in our app.
![keys and access tokens](https://lh3.googleusercontent.com/q1rfBBgWtLDC4-tL9jkZ7QWcn3TvUcBFci7_PBLYNJC1v61LlD0YeorxTv8ItNJK89wvwPm1Q59fm1Llllcw35vnhNK5qeJ2oZTWA9HgfdvnOnBSBIHqoyGWR2FzYRyedok9FDAOsR36-TgD3utWssj2qGrewIXZOhcdihR8qHQCNGDZaCk6x0OnelPoos15eyzUchJq6sH-2BzF0dbb5ZOvoRyGy2RcF4jpW9l1wKyl0il5WB-zwSCd-gVzGAiUG7SLkgG4WxqLyo4AMwef9cCPLp85jDJ0r1ZLxb51EM7zRVr1KgB67Sn12hvEH6YfNJO0Krc7J2mtwx7KhvMn14PFLvmv6_-EYSaqKJu89WfwUIxgpv60LNK8s_DFhrrxsKaybYBskHUaPV-SyaJFAOP_VsOSShkhLyaWegDkp2J3u2gpyDBEjc2hVb1_RYaIr64dKwWW1A26t9dfaaQ2cpIzCJP8HjUss6LTqbZ-qK1h2GBJDxJvB5OddnZYDpgNGjDy-HaYbPQQBza_rRyT7cJqDcJWMA9axyY9UM1bzyDs9QELueiWtouWrXB_Gz08VjolTpISt-4H-V3pzn_H1-bnDD7mToY=w1906-h1076-no)

## Environmental Variables
Environmental variables are a set of values that are specific to the environment that they are running in. There are many values on a computer or server that can be set as an enviromental variables. An example would be the port number that an app is running on. 

When building an app with the NPM Express, one of the last things that is done after configuring the app is running the listen function. The listen function requires a port number be passed to it. In a local development environment the port number might be 3000, 5000, 9999 or any other four digit number. Although, when this app is deployed to a production server the app might be run on port 80 or another port dictated by the hosting service. 

Heroku, a popular hosting service, will always dictate a port number and pass it as an environmental variable to an app. Therefore, in our development environment an environmental variable should be used as well to mimic the expected behavior in production.

For this Twitter app, as stated before the consumer key, consumer secret, access token and access token secret will be environmental variables. If this app was being worked on by multiple developers the consumer key and consumer secret will stay the same, but the access token and access token secret could be different for each developer working on the project.

In NodeJS there are a handful of ways to store and instantiate environmental variables in an app. In this case a more traditional path will be followed. All environmental variables will be stored in a `.env` file and injected into the environment when the app starts using the Dotenv NPM. In the top most directory of the app, where `package.json` and the node modules folder live, create an `.env` file.
`touch .env`

In the newly created `.env` file add the enviromental variables as shown below. Double or single quotes are not needed around the values.

```
consumer_key=Insert consumer key
consumer_secret=Insert consumer secret
access_token_key=Insert access token
access_token_secret=Insert access token secret
```

## Just Ignore It Git
Mentioned before was the idea of a `.gitignore` file. This file is exactly what it sounds like. When pushing to GitHub, Git will ignore the files mentioned in this file. The reason this is done is because anyone can see the files for this project on Github. That means any credentials, passwords or tokens can be copied from this repo. Just as it is a bad idea it give your house keys to strangers, it is equally as dangerous to push any credentials to GitHub. 

In the top most directory of this project, create a `.gitignore` file.
`touch .gitignore`

The `.gitignore` file for this project will look something like this.
```
.env
*.env
./.env
*/.env
node_modules
./node_modules
```
The `node_modules` directory is added as well because every developer that pulls on the project will have the `package.json` file. That is enough for them to install the node modules on their computer. This will also make the project less files to push to and pull from.

## Stream Parameters
The stream parameters that we will pass to Twitter when we connect to the stream API will tell Twitter what information we want to receive from its stream. There are a lot of cool data that Twitter will return. Twitter will return tweets based on keywords, hashtags, location or language. 
This app will ask for Tweets based on specific Twitter IDs. Therefore, per Twitter’s API documentation, a comma separated list of Twitter account IDs will be passed as stream parameters. In this case there are eight Twitter IDs that will be passed. 

There is probably a programmtic way to do it, but to get an account’s Twitter ID, use [this website](http://gettwitterid.com/).

The Twitter IDs for this project will be stored simply as an array in a JSON object. This JSON object will also have a method on it so that the Twitter IDs can be easily parsed and accessed from anywhere in the app. In the top most directory of the app create a new diretory called `streams`. This directory will house all filters and the IDs directory. Therefore, after the `streams` directory is created, inside of the `streams` directory also create three directories called `filters`, `ids` and `error`. All of these directories will have a file called `index.js` inside of them.
`mkdir streams and cd streams`
`mkdir error filters ids`
`touch error/index.js filters/index.js ids/index.js`

Open the newly created `ids/index.js` and add the Twitter ids as an array inside of an object like this:

```javascript
var streamIDs = {
    STREAM_IDS: [{
        name: 'NYT',
        id: 1255671
    }, {
        name: 'Guardian',
        id: 87818409
    }, {
        name: 'bbcworld',
        id: 742143
    }, {
        name: 'bbcnews',
        id: 612473
    }, {
        name: 'washingtonpost',
        id: 2467791
    }, {
        name: 'theatlantic',
        id: 35773039
    }, {
        name: 'newrepublic',
        id: 82689705
    }, {
        name: 'vice',
        id: 23818581
    }]
};

module.exports = streamIDs;
```
The stream IDs are placed as an array inside of an object because, as mentioned before, there will be a convenince method on the same object that will get and parse the stream IDs. That method should be added under the closing bracked of the `streamIDs` variable. It should looks something like this.

```javascript
streamIDs.getStreamIDs = function() {
    var ids = [];

    this.STREAM_IDS.forEach(function(el, i) {
        ids.push(el.id);
    });

    return ids.toString();
}
```
Now `ids/index.js` is an exported module with its static data and a convenince method to get that data.

## Creating Filters
The filters would be a set of functions that will handle the data from the streams as it is passed from Twitter. For now, only two filters will be created and they will be attached to the same stream. On of the filters, `filters/index.js`, will handle all of the tweets that come through the stream without errors. The other filter, `error/index.js`, will handle any errors that come through the stream. There are a millions things that would be done to the tweets as they come through this app, but for now the filters will just `console.log` their text.

The stream filter will be a function inside of `filters/index.js`. This function will have one parameter called `tweet`. That `tweet` parameter will be the tweet object that Twitter will pass to the app whenever there is a tweet from one of the tweet IDs. The stream filter is going to look like this:

```javascript
var chalk = require('chalk');

var streamFilter = function(tweet) {
  console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
};

module.exports = streamFilter;
```

In production `chalk` is not nessecary, but for now it will help visualize the data being sent to the app from Twitter. In this case, the user's Twitter handle and the tweet text are being logged in green. Right now, if run, this file does not do anything, but it is an important piece of the puzzle.

The error filer, `error/index.js`, will look very similar to the stream filter.
```javascript
var chalk = require('chalk');

var streamError = function(err) {
  console.log(chalk.red(err));
};

module.exports = streamError;
```
Although they look similar now, their functionality would be completely different if this app were to be built out. Therefore, they will remain two seperate files.

## Putting Together The Pieces
Now that all of the pieces of the puzzle are assembled, `app.js` can be completed. Open `app.js` and reference our NPMs as variables at the top of the file.
```javascript
var Twitter = require('twitter');
var env = require('dotenv').config();
```
The `config()` function at the end of the `env` variable will get the enviromental variables out of the `.env` file in our project and parse them into a JSON object. Now all of the enviromental variables can be accessed with dot notation. Logging `env.consumer_key` should log your consumer key. 

Next, reference the stream filters and stream ID module as variables below our NPM variables.
```javascript
var streamFilter = require('./streams/filters');
var streamError = require('./streams/error');
var streamIDs = require('./streams/ids');
```
Now that they stream IDs are referenced in this file, the stream parameters can be added as a variable and set for later use. The convenice method, `getStreamIDs()` will be used to get the stream IDs as a comma seperated list.
```javascript
var streamParameters = {
  follow: streamIDs.getStreamIDs()
};
```
The object key `follow` will tell Twitter that the stream connection is requesting to follow the Twitter IDs that are provided. Now that the stream parameters have been created, that last piece of the puzzle is to instanitate the Twitter NPM and pass it our credentials.
```javascript
var client = new Twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret
});
```
This new variable client will return a handful of different methods to interact with Twitter's APIs. The method that this app is going to use is `stream`. The method `stream` is a function at accepts three parameters and returns one. The three parameters are the stream being subscribed to, the parameters of the stream and a callback. The callback, if the connection is successful, will return a stream object with `.on` methods for the filters. It will look something like this.
```javascript
client.stream('statuses/filter', streamParameters, function (stream) {
  stream.on('data', streamFilter);
  stream.on('error', streamError);
});
```
After all the pieces are put together properly `app.js` should look like this.
```javascript
var Twitter = require('twitter');
var env = require('dotenv').config();

var streamFilter = require('./streams/filters');
var streamError = require('./streams/error');
var streamIDs = require('./streams/ids');

var streamParameters = {
  follow: streamIDs.getStreamIDs()
};

var client = new Twitter({
  consumer_key: env.consumer_key,
  consumer_secret: env.consumer_secret,
  access_token_key: env.access_token_key,
  access_token_secret: env.access_token_secret
});

client.stream('statuses/filter', streamParameters, function (stream) {
  stream.on('data', streamFilter);
  stream.on('error', streamError);
});
```
Run the app with the `nodemon` or `node` command.
`nodemon app.js` or `node app.js`

After running this command, if the credentials are correct, there should be some green tweets in the terminal. Sit back and watch all the differet kinds of tweets come in. Recognize and investigate any errors that may log in red. If the Twitter IDs being used are the news organizations provided, wait for some breaking news to happen. The whole terminal will be covered in green tweets.

## What Can Be Done With This?
The better question is what can't be done with this. Well it won't cook you dinner, but being connected directly to an app like Twitter can be very powerful.

A company called Dataminr, that is based in New York City, uses this basic concept to track news events on Twitter before they happen. Dataminr proved their value in 2011 when their technology recognized hashtags of unrest in Arab nations. This unrest would later be named The Arab Spring.

There are an excessive amount of small companies on the internet that sell hashtag aggregation services for weddings, birthdays and other life milestone events. A startup I used to work for called Offerpop aggregates content from hashtags for marketing reasons.

I built an app using this small app as a foundation. My app was called NewsSeed and it matched keywords from Tweets to group new stories from different news sources. The possibilties are limitless.

## Handling Sync and Async
A challenge that may present itself is handling each tweet synchronously and asynchronously. Going back to their filters, when each tweet is passed into each filter it will be syncronous. It will go through every line of code until the end, unless it is met with an asynchronous function.

One of the first things that comes to mind for handling each Tweet is storing them into a database. If this is something that needs to be done, handling retweets is going to propose a challenge if similar retweets are not to be stored in the database. When each of these Twitter ID's tweets are retweet, the filter is going to recieve every retweet. That could be hundreds or thousands of tweets, that are very similar, coming through the filter. It is probably not desireable to store all of them into a database. That is why they are all going through a filter.

One solution is to create a syncronous cache at the beginning of the filter. To do this in the filters directory create a folder called `cache` and put an `index.js` inside of it.

`cd streams && mkdir cache && cd cache && touch index.js`

The `index.js` in the `cache` directory will just be a simple object with helper methods on it. As the tweets come in use the story link or another unique value as the key that will be placed onto this `cache` object. The cache that I used for my NewsSeed app looked like this.
```javascript
var cache = {
  stories: {},
  check: function(storyLink, tweetToString) {
    if(this.stories[storyLink] && this.stories[storyLink].tweet && this.stories[storyLink].tweet === tweetToString) {
      return true;
    }

    return false;
  },
  set: function(storyLink, tweetToString) {
    this.stories[storyLink] = {
      tweet: tweetToString
    };
  },
  delete: function(key, storyLink) {
    delete this[key][storyLink];
  }
};

module.exports = cache;
```
Now the filter that is being used might look something like this
```javascript
var chalk = require('chalk');
var cache = require('./cache');

var streamFilter = function(tweet) {
	var storyLink = // A function that gets the storyLink
	var tweetToString = // A function that parses the tweet into a string

	// If our tweet is not in cache, put it in the cache
	if (!cache.check(storyLink, tweetToString)) {
		cache.set(storyLink, tweetToString);

		// do something asynchronous

		console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
    }
};

module.exports = streamFilter;
```
Because all of the methods in the cache are syncronous similar tweets that are already set in the cache will skip the code in the condtional statement.

## Conclusion
The key take aways from this small project are environmental variables, the Twitter API and the sync vs async workflow. There was a good portion on enviromental varaibles. What they are, how to use them and how to keep them safe were all covered. Knowing the Twitter API can be very powerful. This project only scratched the surface of the data that could be recieved from Twitter. Twitter's OAuth workflow could also be a good thing to know. Finally, sync and async workflow are the blessing and curse of javascript. Mastering it is very important.