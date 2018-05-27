const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  time: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('Appointment', appointmentSchema);