const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskRouter = require('./api/routes/tasks');

mongoose.connect("mongodb://admin:angad@clicktock-shard-00-00-2c1tt.mongodb.net:27017,clicktock-shard-00-01-2c1tt.mongodb.net:27017,clicktock-shard-00-02-2c1tt.mongodb.net:27017/test?ssl=true&replicaSet=ClickTock-shard-0&authSource=admin&retryWrites=true")

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header(
//     'Access-Control-Allow-Headers', 
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET")
//     return res.status(200).json({});
//   }
// });

app.use('/tasks', taskRouter);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 400;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

module.exports = app;