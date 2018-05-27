const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  duration: String,
  description: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Task', taskSchema);