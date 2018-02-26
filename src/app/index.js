// create app, configurations and api routes
const express = require('express');

const app = express();

// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');

app.use('/', require('@routes'));

module.exports = app;
