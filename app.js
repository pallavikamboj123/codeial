var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const flash = require('connect-flash');

const localStrategy = require('passport-local').Strategy;
//var async = require('async');
require('dotenv').config();
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const cookie_keys = process.env.COOKIE_KEYS;
var mongoDB = `mongodb+srv://${db_user}:${db_password}@cluster0-fwajg.mongodb.net/membersonly?retryWrites=true&w=majority`;
mongoose.connect(mongoDB,{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'mongoose connection error'));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./models/user');
var Message = require('./models/message');
var app = express();
app.engine('pug', require('pug').__express)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session setup
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session(
    {
      secret:'secret',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({mongooseConnection: mongoose.connection})
    }
  )
);
//configure passport
require('./config/passport')(passport);

//connect flash
app.use(flash());


app.use('/', indexRouter);




  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
