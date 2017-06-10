var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var models = require('../models/index');
var expressValidator = require('express-validator');
var util = require('util');

router.get('/', function(req, res, next) {
    models.Doctors.findAll(
        {
            limit: 5,
            offset: 0
        }
    ).then(function(response) {
        console.log(response);
        res.render('layout/doctors/list', {});
    });
});

module.exports = router;