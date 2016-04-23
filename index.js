'use strict';
if(!process.env || !process.env.PROD) require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var mongoUri = process.env.MONGODB_URI;

var db = mongoose.connect(mongoUri);

app.use(bodyParser.json());

require('./backend/models/pledge');
require('./backend/models/pending');

app.get('*',function(req,res,next){
  if(process.env.PROD && req.headers['x-forwarded-proto']!='https')
    res.redirect('https://mypreferreddomain.com'+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})

require('./backend/routes')(app);

app.use(express.static('app'))

app.listen({port: process.env.PORT || 3000}, function() {
  console.log("App running on port " + (process.env.PORT || 3000));
});
