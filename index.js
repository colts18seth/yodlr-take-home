const debug = require('debug')('frontend-code-challenge');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const cors = require('cors');
const nunjucks = require('nunjucks');

const users = require('./routes/users');

const app = express();
const log = logger(app);

nunjucks.configure('public/views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public/views')));

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  log.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
  log.info(
    'Express server listening on http://localhost:%d',
    server.address().port
  );
});