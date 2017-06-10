var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
    const id = req.query.id;
    models.HospitalRegisteredRecord.findById(1).then(function(response) {
        console.log(response);
        res.render('layout/hospital/record', {data: response});
    });
});

module.exports = router;