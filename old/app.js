// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('./app_api/models/db');

const apiRoutes = require('./app_api/routes/index');

const index = require('./app_server/routes/index');
const users = require('./app_server/routes/users');
const planet = require('./app_server/routes/planets');
const about = require('./app_server/routes/about');

const app = express();

app.use('/api', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// app.use('/', index);
// app.use('/api', apiRoutes);


// ----------------------------- VIEWS -----------------------------

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use('/api', apiRoutes)


app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//angular build
app.use(express.static(path.join(__dirname, 'app_public')));

app.use('/', index);
app.use('/users', users);
app.use('/planets', planet);
app.use('/about', about);

// ----------------------------- CATCH 404 -----------------------------
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ----------------------------- ERROR HANDLER -----------------------------
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ----------------------------- EXPORTS -----------------------------
module.exports = app;