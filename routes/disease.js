var express = require('express');
var router = express.Router();
var models = require('../models/index');



/* GET diseases listing. */
router.get('/', function(req, res, next) {
   models.Disease.findAll(
       { limit: 5,
         offset: 0
       }).then(function(diseases) {
       res.render('layout/disease/list',{title:"Customers",data:diseases});
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


module.exports = router;
