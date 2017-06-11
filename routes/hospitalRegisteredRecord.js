var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
    models.HospitalRegisteredRecord.findAll().then(function(response){
        res.render('layout/hospital/patientlist', {data: response});
    });
});

router.get('/:id', function(req, res, next) {
    models.HospitalRegisteredRecord.findById(req.params.id).then(function(response) {
        res.render('layout/hospital/record', {data: response});
    });
});

module.exports = router;