var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config()

var userRouter = require('./routes/userRouter');
var employeeRouter = require('./routes/employeeRouter');
var placeRouter = require('./routes/placeRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var touristRouter = require('./routes/touristRouter');
var dashboardRouter = require('./routes/dashboardRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());

app.use(cookieParser('the-immortal-coils'));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('build'));
app.use(express.static(path.join(__dirname, 'build')));

var url = process.env.mongoUrl;
if (process.env.NODE_ENV === 'test') {
  url = process.env.testMongoUrl;
}
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then((db) => {
}, (err) => {
  if (err) {
    console.log('👺  Error connecting to MongoDB');
  } else {
    console.log('✅  Connected to MongoDB');
  }
});

app.use('/users', userRouter);
app.use('/employees', employeeRouter);
app.use('/places', placeRouter);
app.use('/schedules', scheduleRouter);
app.use('/tourists', touristRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
