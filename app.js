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

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var employeeRouter = require('./routes/employeeRouter');
var placeRouter = require('./routes/placeRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var touristRouter = require('./routes/touristRouter');
var dashboardRouter = require('./routes/dashboardRouter');
var travellingMethodsRouter = require('./routes/travellingMethodRouter');

var app = express();

// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use(bodyParser.json());

app.use(cookieParser('the-immortal-coils'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const url = process.env.mongoUrl;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }).then((db) => {
  }, (err) => {});;
const connection = mongoose.connection; 
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/users', userRouter);
app.use('/employees', employeeRouter);
app.use('/places', placeRouter);
app.use('/schedules', scheduleRouter);
app.use('/tourists', touristRouter);
app.use('/dashboard', dashboardRouter);
app.use('/travellingMethods', travellingMethodsRouter);

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
