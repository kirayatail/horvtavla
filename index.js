'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/horvtavla';

var db = mongoose.connect(mongoUri);

app.use(bodyParser.json());

require('./backend/models/pledge');
require('./backend/models/pending');

require('./backend/routes')(app);

app.use(express.static('app'))

app.listen({port: process.env.PORT || 3000}, function() {
  console.log("App running on port " + (process.env.PORT || 3000));
});
