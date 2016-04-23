var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PledgeSchema = new Schema({
  email: String,
  nick: String,
  amount: Number,
  anonymous: Boolean,
});

module.exports = mongoose.model('Pledge', PledgeSchema);
