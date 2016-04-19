'use strict';
var express = require('express');
var request = require('request');

var app = express();

app.use(express.static('app'))

app.listen(process.env.PORT || 3000);
