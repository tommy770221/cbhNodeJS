/**
 * Created by Tommy on 2017/5/29.
 */
var nodejieba = require("nodejieba");
var  Set = require("collections/set");
var models = require('./models/index.js');
var async = require("async");
nodejieba.load({
    dict: './userDicTraditional/jieba.dict.utf8',
    hmmDict: './userDicTraditional/hmm_model.utf8',
    userDict: './userDicTraditional/user.dict.utf8',
    idfDict: './userDicTraditional/idf.utf8',
    stopWordDict: './userDicTraditional/stop_words.utf8'
});

var sentence = "生病感冒頭痛流鼻水肌肉痠痛";

var result;

// 没有主动调用nodejieba.load载入词典的时候，
// 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
// 词典只会被加载一次。
result = nodejieba.cut(sentence);
console.log(result);

function abc(s) {
    console.log(s.length)
    s.forEach(function (proj) {
        console.log(proj.category);
    })

  return s;
}
var s = new Set();
async.eachSeries(result,function (itemRe,callback) {

    models.Disease.findAll({where: ["symptom like '%"+itemRe+"%'"]}).then(function (projects) {
         console.log(itemRe);
         projects.forEach(function (proj) {
             //console.log(proj.category);
             s.add(proj);
             console.log(proj.category+proj.doc_category)
         });
       callback(null,abc(s));
    }).catch(function (err) {
        // handle error;
        console.log("proj error : "+ err);
    });;
    console.log("123")
}, function(err,s){
    console.log("err is:" + err);
    console.log(s)
});




//result = nodejieba.cut(sentence, true);
//console.log(result);

//result = nodejieba.cutHMM(sentence);
//console.log(result);

//result = nodejieba.cutAll(sentence);
//console.log(result);

//result = nodejieba.cutForSearch(sentence);
//console.log(result);

//result = nodejieba.tag(sentence);
//console.log(result);

// topN = 5;
//result = nodejieba.extract(sentence, topN);
//console.log(result);

//result = nodejieba.cut("男默女淚");
//console.log(result);
//nodejieba.insertWord("男默女淚");
//result = nodejieba.cut("男默女淚");
//console.log(result);

//result = nodejieba.cutSmall("南京市長江大橋", 3);
//console.log(result);
//var topN = 100;
//console.log(nodejieba.extract("生病感冒頭痛流鼻水肌肉痠痛", topN));