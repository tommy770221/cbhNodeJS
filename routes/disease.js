var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var models = require('../models/index');
var expressValidator = require('express-validator');
var util = require('util');


/* GET diseases listing. */
router.get('/', function(req, res, next) {

    models.Disease.count().then(function (count) {
        models.Disease.findAll(
            {
                limit: req.query.limit,
                offset: (req.query.page-1)*req.query.limit
            }).then(function(diseases) {
            var pageCount=Math.floor(count/req.query.limit)+1;
            var pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);
            res.render('layout/disease/list',{title:"Customers",data:diseases, pages: pages,pageCount:pageCount, currentPage: req.query.page});
        }).catch(function (err) {
            // handle error;
            if(err){
                var errornya  = ("Error Selecting : %s ",err );
                console.log("errornya : "+errornya)
                req.flash('msg_error', errornya);
            }
        });
    })

});

router.post('/add', function(req, res, next) {
    req.assert('doc_category', 'Please fill in the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {

        models.sequelize.transaction(function (t,disease) {
            disease = {
                doc_category: req.body.doc_category,
                category: req.body.category,
                big_category: req.body.big_category,
                symptom : req.body.symptom
            };
            // chain all your queries here. make sure you return them.
            return models.Disease.create(disease, {transaction: t}).then(function (disease) {
                console.log(disease);
                return "result";
            });

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            console.log(result);
            res.json({"success":"success"});
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });


    }else{
        console.log(errors);
        errors_detail = "Sory there are error<ul>";
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('layout/disease/list',
            {
                name: req.param('name'),
                address: req.param('address')
            });
    }

});

router.get('/add', function(req, res, next) {
    res.render( 'layout/disease/create',
        {
            title: 'Add New Disease'
        });
});

router.get('/edit/:id', function(req, res, next) {
    var disease=models.Disease.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function (disease) {
        console.log(disease);
        res.render( 'layout/disease/update',
            {
                title: 'Update  Disease',
                disease:disease
            });
    });
});

router.post('/edit/:id', function(req, res, next) {
    console.log(req.path.id);
    var disease=models.Disease.findOne({
        where: {
            id: req.params.id,
        },
    }).then(function (disease) {
        console.log(disease);

        disease.update({
            doc_category : req.body.doc_category,
            big_category : req.body.big_category,
            category : req.body.category,
            symptom : req.body.symptom,
        },null).then(function (disease) {
            res.render( 'layout/disease/update',
                {
                    title: 'Update  Disease',
                    disease:disease
                });
        });

    });
});

router.delete('/delete/:id', function(req, res, next) {
    var disease=models.Disease.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function (disease) {
        console.log(disease);
        disease.destroy();
        res.redirect(req.baseUrl);
    });
});

module.exports = router;
