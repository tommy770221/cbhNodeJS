var express = require('express');
var router = express.Router();
var models = require('../models/index');


/* GET diseases listing. */
router.get('/', function(req, res, next) {
    models.HospitalInfo.findAll(
        { limit: 5,
            offset: 0
        }
    ).then(function(todos) {
        res.json(todos[0]);
    });
});


module.exports = router;