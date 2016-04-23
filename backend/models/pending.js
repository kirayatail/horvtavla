var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PendingSchema = new Schema({
  email: String,
  pledge: Object,
  token: String
});

module.exports = mongoose.model('Pending', PendingSchema);
