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
var util = require('util');
var validator = require('validator');


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
app.use(expressValidator());


app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body == 'object' && '_method' in req.body)
    {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(baseDir+'/', index);
app.use(baseDir+'/users', users);
app.use(baseDir+'/disease', disease);
app.use(baseDir+'/hospitalInfo', hospitalInfo);
app.use(baseDir+'/line', lineBot);


app.post('/:urlparam', function(req, res) {

    // VALIDATION
    // checkBody only checks req.body; none of the other req parameters
    // Similarly checkParams only checks in req.params (URL params) and
    // checkQuery only checks req.query (GET params).
    req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
    req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
    req.checkQuery('getparam', 'Invalid getparam').isInt();

    // OR assert can be used to check on all 3 types of params.
    // req.assert('postparam', 'Invalid postparam').notEmpty().isInt();
    // req.assert('urlparam', 'Invalid urlparam').isAlpha();
    // req.assert('getparam', 'Invalid getparam').isInt();

    // SANITIZATION
    // as with validation these will only validate the corresponding
    // request object
    req.sanitizeBody('postparam').toBoolean();
    req.sanitizeParams('urlparam').toBoolean();
    req.sanitizeQuery('getparam').toBoolean();

    // OR find the relevent param in all areas
    req.sanitize('postparam').toBoolean();

    // Alternatively use `var result = yield req.getValidationResult();`
    // when using generators e.g. with co-express
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
            return;
        }
        res.json({
            urlparam: req.params.urlparam,
            getparam: req.query.getparam,
            postparam: req.body.postparam
        });
    });
});

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
console.log("app start");
//app.listen(3000);
