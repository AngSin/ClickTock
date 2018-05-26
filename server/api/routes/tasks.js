const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Task = require('../models/task');

router.get('/', (req, res, next) => {
  Task
    .find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    duration: req.body.duration,
    description: req.body.description,
    date: new Date()
  });
  task
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdTask: task
      });
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.get('/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  Task.findById(id)
    .exec()
    .then(doc => { 
      console.log("From database ", doc);
      if (doc) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({
          message: "No valid entry found for provided id"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
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
