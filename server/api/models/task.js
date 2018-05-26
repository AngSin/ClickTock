const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  duration: String,
  description: String,
  date: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('Task', taskSchema);