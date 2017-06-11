var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var models = require('../models/index');
var expressValidator = require('express-validator');
var util = require('util');
var baseDir='/cbhJs';

router.get('/:id', function(req, res, next) {
    if (!req.params.id) {
        res.redirect(baseDir + '/doctor');
        return;
    }
    models.Comment.count().then(function (count) {
        models.Comment.findAll({
            where: {
                doctor_id: req.params.id
            },
            limit: 5,
            offset: (req.query.page-1)*5,
            order: [
                ['create_time', 'DESC']
            ]
        }).then(function (comment) {
            models.Doctor.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function (doctor) {
                var pageCount = Math.floor(count / 5) + 1;
                var pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);
                var totalRating = 0;
                var commentCnt = 0;
                for (var key in comment) {
                    totalRating += comment[key].rating;
                    commentCnt ++;
                }
                console.log(totalRating)
                res.render('layout/comment/list', {
                    title: "Comment",
                    data: comment,
                    doctor: doctor,
                    pages: pages,
                    pageCount: pageCount,
                    currentPage: req.query.page,
                    averageRating: Math.floor(totalRating / commentCnt)
                });
            }).catch(function (err) {
                // handle error;
                if (err) {
                    var errornya = ("Error Selecting : %s ", err );
                    console.log("errornya : " + errornya)
                    req.flash('msg_error', errornya);
                }
            });
        });
    });
});

router.post('/add', function(req, res, next) {
    req.assert('name', 'Please fill in the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        models.sequelize.transaction(function (t,comment) {
            comment = {
                name: req.body.name,
                comment: req.body.comment,
                doctor_id: req.body['doctor_id'],
                rating: req.body.rating
            };
            // chain all your queries here. make sure you return them.
            return models.Comment.create(comment, {transaction: t}).then(function (comment) {
                console.log(comment);
                return "result";
            });

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            console.log(result);
            res.redirect(baseDir + '/comment/' + req.body['doctor_id']);
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
        res.render('layout/comment/list',
            {
                name: req.param('name'),
                address: req.param('address')
            });
    }

});

router.get('/add/:id', function(req, res, next) {
    if (!req.params.id) {
        res.redirect(baseDir + '/doctor');
        return;
    }
    models.Doctor.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (doctor) {
        res.render( 'layout/comment/create',
            {
                title: 'Add New Comment',
                doctor_id: req.params.id,
                doctor: doctor
        });
    }).catch(function (err) {
        // handle error;
        if (err) {
            var errornya = ("Error Selecting : %s ", err );
            console.log("errornya : " + errornya)
            req.flash('msg_error', errornya);
        }
    });
});

module.exports = router;