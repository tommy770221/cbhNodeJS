var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var models = require('../models/index');



/* GET diseases listing. */
router.get('/', function(req, res, next) {


    models.Disease.findAll(
       { limit: req.query.limit,
         offset: (req.query.page-1)*req.query.limit
       }).then(function(diseases) {
        var pageCount=5;
        var pages = paginate.getArrayPages(req)(3, pageCount, req.query.page);
       res.render('layout/disease/list',{title:"Customers",data:diseases, pages: pages,pageCount:pageCount});
      // res.json(todos[0]);
   }).catch(function (err) {
       // handle error;
       if(err){
           var errornya  = ("Error Selecting : %s ",err );
           console.log("errornya : "+errornya)
           req.flash('msg_error', errornya);
       }
   });;
});

router.post('/add', function(req, res, next) {
    req.assert('name', 'Please fill the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {


        var disease = {
            doc_category: req.body.doc_category,
            category: req.body.category,
            big_category: req.body.big_category,
            symptom : req.body.symptom
        }
        models.Disease.save(disease);

        var insert_sql = 'INSERT INTO customer SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, customer, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Insert : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('customer/add-customer',
                        {
                            name: req.param('name'),
                            address: req.param('address'),
                            email: req.param('email'),
                            phone: req.param('phone'),
                        });
                }else{
                    req.flash('msg_info', 'Create customer success');
                    res.redirect('/customers');
                }
            });
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
        res.render('customer/add-customer',
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


module.exports = router;
