const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json()); // application/json

app.use(authRoutes);

// handler error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://non2:HHIOLVLPeIuDlVrw@cluster0.cp5zr.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log('Server Started');
    app.listen(8000);
  })
  .catch((err) => console.log(err));
