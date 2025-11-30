// ----------------------------- REQUIRE -----------------------------
const createError = require('http-errors');
const express = require('express');

const fs = require('fs');

const http = require('http');
const https = require('https');

// const privateKey = fs.readFileSync('./key.pem', 'utf8');
// const certificate = fs.readFileSync('./cert.pem', 'utf8');

const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8');


const credentials = { key: privateKey, cert: certificate };
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

require('./app_api/models/db');

const index = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const users = require('./app_server/routes/users');
const planet = require('./app_server/routes/planets');
const about = require('./app_server/routes/about');

const app = express();

const session = require('express-session');
const passport = require('passport');

const User = require('./app_api/models/users');

// CORS dev (ng serve 4200).
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });

// ----------------------------- SET VIEWS -----------------------------
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'tracknestSecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ----------------------------- LOGIN -----------------------------
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// ----------------------------- PUBLIC FOLDERS -----------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

app.use('/', index);
app.use('/api', apiRoutes);

app.use('/users', users);
app.use('/planets', planet);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// ----------------------------- LISENERS -----------------------------
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8000, () => {
  console.log("HTTP server running at http://localhost:8000");
});

httpsServer.listen(443, () => {
  console.log("HTTPS server running at https://localhost:443");
});

module.exports = app;