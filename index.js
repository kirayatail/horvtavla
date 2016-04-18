'use strict';
var express = require('express');
var request = require('request');

var app = express();

app.get('/roles', function(req, res) {
    request.get('http://jappa.jobs/api/role').pipe(res);
});

app.use(express.static('app'))

app.listen(process.env.PORT || 3000);
