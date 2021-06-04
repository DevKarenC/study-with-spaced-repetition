const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

// logging middleware to help with debugging
app.use(morgan('dev'));

// static middleware to serve up static files (JS, CSS, images)
app.use(express.static(path.join(__dirname, '../public')));

// (body) parsing middleware used to parse JSON bodies
app.use(express.json());

// parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// match all requests to /api by mounting the router as middleware
app.use('/api', require('./api'));

// send notFound.html for any requests that don't match one of our routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './notFound.html'));
});

// catch 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
