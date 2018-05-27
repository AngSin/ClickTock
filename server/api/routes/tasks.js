const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Task = require('../models/task');

router.get('/', (req, res, next) => {
  Task
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const datePadding = date < 10 ? '0' : '';
  const monthPadding = month < 10 ? '0' : '';
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const hoursPadding = hours < 10 ? '0' : '';
  const minutesPadding = minutes < 10 ? '0' : '';
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    duration: req.body.duration,
    description: req.body.description,
    date: `${ datePadding }${ date }/${ monthPadding }${ month }/${ today.getFullYear() }`,
    time: `${hoursPadding}${hours}:${minutesPadding}${minutes}`
  });
  task
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Task added",
        createdTask: task
      });
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.get('/:date', (req, res, next) => {
  const dateNum = req.params.date;
  const date = dateNum.substr(0,2) + "/" + dateNum.substr(2,2) + "/" + dateNum.substr(-4);
  Task.find({ date })
    .exec()
    .then(doc => { 
      console.log("From database ", doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  const updateOps = {};
  for (field in req.body) {
    console.log(field);
    updateOps[field] = req.body[field];
  }
  Task
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
});

router.delete('/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  Task
    .findOneAndRemove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
});

module.exports = router;
