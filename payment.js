var _ = require('lodash');
var fs = require('fs');
var mail = require('./backend/lib/mail');
var mongoose = require('mongoose');
require('./backend/models/pledge');
var controller = require('./backend/controllers/pledgecontroller');
var mongoUri = process.env.MONGODB_URI;
var db = mongoose.connect(mongoUri);

var Pledge = mongoose.model('Pledge');

console.log(process.argv);

var token = process.argv[2];
var amount = parseInt(process.argv[3]);

Pledge.find({'paymentToken': token}, function(err, p) {
  if(Math.floor(p.amount) <= amount) {
    console.log("Payment accepted");
    mail.paymentConfirmed(p);
    p.save().then(function() {
      process.exit();
    }):
  }
});
