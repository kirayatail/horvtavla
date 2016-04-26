var mongoose = require('mongoose');
var Pledge = mongoose.model('Pledge');
var Pending = mongoose.model('Pending');
var Goal = mongoose.model('Goal');
var crypto = require('crypto');
var Pushover = require('node-pushover');
var _ = require('lodash');
var mail = require('../lib/mail');

var push = new Pushover({token: process.env.PUSHOVER_APP, user: process.env.PUSHOVER_USER});


module.exports = {
  register: function(req, res) {
    var pledge = {
      email: req.body.email,
      amount: req.body.amount,
      nick: req.body.nick,
      anonymous: req.body.anonymous
    };

    Pending.findOne({'email':req.body.email}, function(err, pending) {
      if(err) {
        console.log(err);
        return res.status(500).send({message: 'Database error, see server log.'});
      }

      if(!pending) {
        pending = new Pending({email: req.body.email});

      }

      pending.pledge = pledge;
      crypto.randomBytes(12, (ex, buf) => {
        pending.token = buf.toString('hex');

        pending.save(function(err) {
          if(err) {
            console.log(err);
            return res.status(500).send({message: 'Database error, see server log.'});
          }

          mail.confirmation(pending);

          return res.send({message:"pledge is pending"});
        });
      });
    });
  },

  confirm: function(req, res) {
    var token = req.params.token;
    var shouldPush = false;
    if(!token) {
      return res.status(400).send({message: "Token missing"});
    }

    Pending.findOne({"token": token}, function(err, pending) {
      if(err || !pending) {
        return res.status(404).send({message: "Invalid token", confirmed:false});
      }

      Pledge.findOne({"email": pending.email}, function(err, pledge) {

        if(err) {
          console.log(err);
          return res.status(500).send({message: 'Database error, see server log.'});
        }

        if(!pledge) {
          pledge = new Pledge(pending.pledge);
          shouldPush = true;
        }

        _.assign(pledge, pending.pledge);

        pledge.save(function(err) {
          Pending.remove({"_id": pending._id}, function(err) {

            this.stats(null, {send: function(stats) {
              push.send("Horvtavla", "New pledge registered: "+pending.pledge.amount+" kr\nCurrent sum: "+stats.sum+" kr");
            }});
            return res.send({message: "Pledge confirmed", confirmed: true});
          });
        });
      });
    });
  },
  stats: function(req, res) {
    var nicks = [];
    var anonymous = 0;
    sum = 0;
    Pledge.find({}, function(err, pledges) {
      for(var p of pledges) {
        if(p.amount > 0) {
          sum += p.amount;
          if(p.anonymous) {
            anonymous++;
          } else {
            nicks.push(p.nick);
          }
        }
      }

      return res.send({backers: nicks.sort(), sum: sum, anonymous: anonymous});
    });
  },
  goals: function(req, res) {

    Goal.find({}, function(err, goals) {
      var max = Math.max(...goals.map(e => e.amount));

      res.send({max, goals});
    });
  }
};
