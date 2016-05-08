var _ = require('lodash');
var fs = require('fs');
var mail = require('./backend/lib/mail');
var mongoose = require('mongoose');
require('./backend/models/pledge');
var mongoUri = process.env.MONGODB_URI;
var db = mongoose.connect(mongoUri);

var Pledge = mongoose.model('Pledge');

console.log(process.argv);

var token = process.argv[2];
var amount = parseInt(process.argv[3]);

Pledge.findOne({'paymentToken': token}, function(err, p) {
  if(p && Math.floor(p.amount) <= amount) {
    console.log("Payment accepted");
    p.paid = true;

    Promise.all([p.save(), mail.paymentConfirmed(p)]).then(function() {
      process.exit();
    })
  } else {
    console.error("Not accepted", p, token, amount);
    process.exit();
  }
});
