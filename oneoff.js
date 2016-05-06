var mail = require('./backend/lib/mail');
var mongoose = require('mongoose');
require('./backend/models/pledge');
var mongoUri = process.env.MONGODB_URI;
var db = mongoose.connect(mongoUri);

var Pledge = mongoose.model('Pledge');

Pledge.find({}, function(err, pledges) {
  return console.log(pledges.map(p => p.email).join('\n'));
});
