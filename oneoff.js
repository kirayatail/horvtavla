var _ = require('lodash');
var fs = require('fs');
var mail = require('./backend/lib/mail');
var mongoose = require('mongoose');
require('./backend/models/pledge');
var mongoUri = process.env.MONGODB_URI;
var db = mongoose.connect(mongoUri);

var Pledge = mongoose.model('Pledge');

var wordlist = fs.readFileSync('wordlist').toString().trim().split(/[\r\n]/g);

Pledge.find({}, function(err, pledges) {
  var tasks = [];

  _.forEach(pledges, p => {
    if(!p.paymentToken) {
      p.paymentToken = wordlist.pop();
      p.paid = false;
      console.log("Adding token to ", p.email);
      tasks.push(p.save());
    }
  });

  Promise.all(tasks).then(function(res) {
    console.log("Done saving!");
    console.log(res);
    process.exit();
  }, function(err) {
    console.error(err);
    process.exit();
  })
});
