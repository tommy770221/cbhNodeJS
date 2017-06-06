var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout/starter', { title: 'Express' });
});

router.get('/hospital', function(req, res, next) {
    res.render('hospital', { title: 'Express' });
});

module.exports = router;
