var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var models = require('../models/index');
var expressValidator = require('express-validator');
var util = require('util');
var baseDir='/cbhJs';

router.get('/', function(req, res, next) {

    models.Doctor.count().then(function (count) {
        models.Doctor.findAll(
            {
                limit: 12,
                offset: (req.query.page-1)*12
            }).then(function(doctor) {
            var pageCount=Math.floor(count/12)+1;
            var pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);
            res.render('layout/doctors/list',{title:"Doctor",data:doctor, pages: pages,pageCount:pageCount});
        }).catch(function (err) {
            // handle error;
            if(err){
                var errornya  = ("Error Selecting : %s ",err );
                console.log("errornya : "+errornya)
                req.flash('msg_error', errornya);
            }
        });
    });
});

router.post('/add', function(req, res, next) {
    req.assert('name', 'Please fill in the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {

        models.sequelize.transaction(function (t,doctor) {
            doctor = {
                name: req.body.name,
                description: req.body.description
            };
            // chain all your queries here. make sure you return them.
            return models.Doctor.create(doctor, {transaction: t}).then(function (doctor) {
                console.log(doctor);
                return "result";
            });

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            console.log(result);
            res.redirect(baseDir + '/doctor');
        }).catch(function (err) {
            console.log(err);
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });


    }else{
        console.log(errors);
        errors_detail = "Sorry, some errors occurred!<ul>";
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('layout/doctors/list',
            {
                name: req.param('name'),
                address: req.param('address')
            });
    }

});

router.get('/add', function(req, res, next) {
    res.render( 'layout/doctors/create',
        {
            title: 'Add New Doctor'
        });
});

module.exports = router;