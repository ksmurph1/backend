const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(passport.initialize());

require('./src/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Fairshots backend.'
}));

module.exports = app;