var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var router = express.Router();
var nodejieba = require("nodejieba");
var paginate = require('express-paginate');


var baseDir='/cbhJs';
var index = require('./routes/index');
var users = require('./routes/users');
var disease = require('./routes/disease.js');
var hospitalInfo = require('./routes/hospitalInfo.js');
var lineBot = require('./routes/lineBot.js');

var app = express();

app.locals.baseDir=baseDir;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(baseDir,express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({secret:"secretpass123456"}));
app.use(paginate.middleware(10, 50));

app.use(baseDir+'/', index);
app.use(baseDir+'/users', users);
app.use(baseDir+'/disease', disease);
app.use(baseDir+'/hospitalInfo', hospitalInfo);
app.use(baseDir+'/line', lineBot);




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
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body == 'object' && '_method' in req.body)
    {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));


module.exports = app;
console.log("app start");
//app.listen(3000);
