var http = require('http');
var express = require('express');
var endpoints = require('./endpoints');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var server = http.createServer(app);

var startedAt = new Date();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

endpoints(app);


server.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  console.log('started at', startedAt.toISOString());
  console.log('running on port', port);
});


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

module.exports = server;
