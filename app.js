const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const encountersRouter = require('./routes/encounters');

const mongoUri = 'mongodb+srv://jvrhjvrh:XbRAp9yuFZvYhjMT@baseteste-ydvx0.mongodb.net/test?retryWrites=true&w=majority';
const connectConfig = {
  config: {
    autoIndex: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 20
  }
};
console.log("MONGODB_URI = " + mongoUri);
mongoose.connect(
  mongoUri,
  connectConfig,
);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection open to ${mongoUri}`);
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/encounters', encountersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
