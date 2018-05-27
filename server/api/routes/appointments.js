const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Appointment = require('../models/appointment');

router.get('/', (req, res, next) => {
  Appointment
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
});

router.post('/', (req, res, next) => {
  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId,
    time: req.body.time,
    description: req.body.description
  });
  appointment
    .save()
    .exec()
    .then(result => {
      res.status(201).json({
        message: "Appointment created",
        newAppointment: appointment
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;