var _ = require('lodash');
var fs = require('fs');
var mail = require('../lib/mail');
var mongoose = require('mongoose');
// require('../models/pledge');
var controller = require('./pledgecontroller');
// var mongoUri = process.env.MONGODB_URI;
// var db = mongoose.connect(mongoUri);

var Pledge = mongoose.model('Pledge');

var wordlist = fs.readFileSync('wordlist').toString().trim().split(/[\r\n]/g);
module.exports = function(req, res) {

  Pledge.find({}, function(err, pledges) {
    var tasks = [];

    var deadline = controller.getDeadline();

    _.forEach(pledges, p => {
      if(!p.paymentToken) {
        p.paymentToken = wordlist.pop();
        p.paid = false;
        console.log("Adding token to ", p.email);
        tasks.push(p.save());
      }


      if((Date.now() + 10000) >= deadline.register || p.email === process.env.MAGIC_EMAIL)  {
        mail.payment(p);
      }
    });

    Promise.all(tasks).then(function(result) {
      console.log("Done saving!");
      return res.status(200).send({message: "Batch process complete"});
    }, function(err) {
      console.error(err);
      return res.status(420).send({message: "Database error!"});
    })
  });
}
