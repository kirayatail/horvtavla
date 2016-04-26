var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoalSchema = new Schema({
  name: String,
  amount: Number
});
