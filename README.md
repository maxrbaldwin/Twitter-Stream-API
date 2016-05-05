# NodeJS and Twitter's Stream API

By far, Twitter has one of the most developer friendly APIs on the internet. Whether you are learning about APIs, creating an app for your startup, learning about OAuth or just hacking around, Twitter’s API will be very easy to use. 

On top of the standard REST APIs that would be expected out of any API, Twitter also has a stream API. Twitter’s stream API is commonly referred to as a “firehose” and should be visualized as such. With the proper credentials Twitter gives developers access to live feeds for any hashtag, user ID or @ mention. This means as a user tweets or a hashtag trends, Twitter will send data about those tweets directly to your app as it happens.

## Our App
A small app can be created with NodeJS that can handle all the data that Twitter will throw at it. This app can be later incorporated into a larger app. The app will start off by setting our environmental variables while the app starts. It will create a connection to the Twitter stream API. Finally, It will field all of the tweets that are sent in its direction. 

Later, there will be some examples about what can be done with each tweet, as well as how to handle the synchronous and asynchronous struggles of each tweet.

## Our NPMs
There are two primary NPMs, Dotenv and Twitter, that will be used in this app and then another one, Chalk, that will be used for reading data in the console. 

Dotenv is used for managing environmental variables. The credentials that Twitter provides will be referenced as environmental variables to follow the best practice of never hard coding any credentials. The “.env” file that these credentials will be referenced from will be mentioned in our “.gitignore” file so that they never end up on Github.

Our credentials will be passed to the other primary NPM, Twitter. The Twitter NPM uses the very popular NPM Request to establish, maintain and reconnect if necessary to Twitter’s stream API.  

There is also one dev dependency that is being used called Nodemon. Nodemon can be used in any NodeJS project. Rather than starting the app with “node app.js” start the app with “nodemon app.js.” Nodemon will watch the projects files and restart the app when a file is saved. This NPM is strictly for convenience. It gets rid of the annoying task of having to start and stop an app every time there is a change.

## Getting Your Twitter Credentials
To get credentials for this Twitter app, navigate to Twitter’s developer apps page (https://apps.twitter.com/). On this page there is a button near the top right corner that says, “Create New app.” On the create new app page, fill out the necessary information and agree to the terms and conditions. The field for callback URL is unnecessary for this app because there is no Oauth. Just fill that field in with “http://localhost.com.” When Twitter is done registering this new app, navigate to the “Keys and Access Tokens” tab after clicking on the app name. On this page there are four important details. The consumer key, consumer secret, access token and access token secret will be environmental variables in our app.

## Environmental Variables
Environmental variables are a set of values that are specific to the environment that they are running in. There are many values on a computer or server that can be set as an enviromental variables. An example would be the port number that an app is running on. 

When building an app with the NPM Express, one of the last things that is done after configuring the app is running the listen function. The listen function requires a port number be passed to it. In a local development environment the port number might be 3000, 5000, 9999 or any other four digit number. Although, when this app is deployed to a production server the app might be run on port 80 or another port dictated by the hosting service. 

Heroku, a popular hosting service, will always dictate a port number and pass it as an environmental variable to an app. Therefore, in our development environment an environmental variable should be used as well to mimic the expected behavior in production.

For this Twitter app, as stated before the consumer key, consumer secret, access token and access token secret will be environmental variables. If this app was being worked on by multiple developers the consumer key and consumer secret will stay the same, but the access token and access token secret could be different for each developer working on the project.

In NodeJS there are a handful of ways to store and instantiate environmental in an app. In this case a more traditional path will be followed. All environmental variables will be stored in a “.env” file and injected into the environment when the app starts using the Dotenv NPM.

## What Can I Do With This?

## Handling Sync and Async