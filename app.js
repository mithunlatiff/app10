var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser');
var flash = require('express-flash-messages')
var moment = require('moment');
var schema = require('./schema');

var mysql = require('mysql'),
    connection = require('express-myconnection'),
    config = {
      host: 'process.env.MYSQL101_PORT_3306_TCP_ADDR',
      user: 'root',
      password: 'mcmcm',
      port: 3306,
      database: 'nodejs'
    };
var index = require('./routes/index');
var users = require('./routes/users');
/*Profile Routes*/
var profile = require('./routes/profile');

var app = express();
app.use(flash());
app.locals.moment = require('moment');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'OzhclfxGp956SMjtq',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));


// DB connection
app.use(connection(mysql, config, 'request'));

app.use('/', index);
app.use('/users', users);
app.use('/profiles', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
