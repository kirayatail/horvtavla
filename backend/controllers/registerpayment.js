var _ = require('lodash');
var fs = require('fs');
var mail = require('../lib/mail');
var mongoose = require('mongoose');

var Pledge = mongoose.model('Pledge');

module.exports = function(req, res) {
  var pass = req.body.pass;
  var token = req.body.token;
  var amount = req.body.amount;
  
  if(pass != 'cc5665dd24d134b3d5d64befb4dc7470622af30e3af9f21f') {
    return res.status(401).send({message: 'invalid password'});
  }
  Pledge.findOne({'paymentToken': token}, function(err, p) {
    if(p && Math.floor(p.amount) <= amount) {

      if(p.paid) {
        return res.send({message: 'Already registered'});
      }
      p.paid = true;

      Promise.all([p.save(), mail.paymentConfirmed(p)]).then(function() {
        res.send({message: 'Payment accepted'})
      })
    } else {
      res.status(402).send({message: 'Insufficient funds'});
    }
  });
}
