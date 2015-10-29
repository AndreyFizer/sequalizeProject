'use strict';
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // u
var bodyParser = require('body-parser');

var app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'development') {
  console.log('=== >     Server start success in Production version');
  require('./config/development');
}

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,{
    host     : process.env.RDS_HOSTNAME,
    dialect  : 'postgres',
    pool     : {
        max  : 5,
        min  : 0,
        idle : 10000
    }
});

var Models = require('./models/index');
sequelize.Models = new Models(sequelize);

var httpServer = http.createServer(app);
app.set('port', process.env.PORT || '8821');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/static'); // n-o
app.set('view engine', 'html'); //n-o

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 5}));
app.use(bodyParser.json({limit: 1024 * 1024 * 5}));
app.use(cookieParser()); //u
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

httpServer.listen(app.get('port'), function () {
  console.log("=== >     Express server listening on port " + app.get('port'));
  console.log("=== >     HOST: " + process.env.HOST);
  console.log("=== >     RDS_HOSTNAME: " + process.env.RDS_HOSTNAME);
  console.log("=== >     DATABASE: " + process.env.DATABASE);
});

/*module.exports = app;*/
