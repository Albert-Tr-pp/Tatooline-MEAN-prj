// const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

// // Подключение к базе данных
// require('./app_server/models/db');

// // Импорт роутов
// const index = require('./app_server/routes/index');
// const users = require('./app_server/routes/users');

// const planetRoutes = require('.app_server/routes/planets');

// const app = express();

// // Настройка view engine
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'pug');

// // Middleware
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // раскомментируйте после добавления favicon
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // Подключение роутов
// app.use('/', index);
// app.use('/users', users);


// app.use('/planets', planetRoutes);

// // Обработка 404 ошибок
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // Обработчик ошибок
// app.use(function(err, req, res, next) {
//   // Устанавливаем локальные переменные, предоставляя ошибку только в development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // Рендерим страницу ошибки
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;













const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('./app_server/models/db');

const index = require('./app_server/routes/index');
const users = require('./app_server/routes/users');
const planet = require('./app_server/routes/planets'); // Исправленный путь
const about = require('./app_server/routes/about');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/planets', planet); // Подключение роутов для планет
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;