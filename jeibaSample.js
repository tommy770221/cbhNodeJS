/**
 * Created by Tommy on 2017/5/29.
 */
var nodejieba = require("nodejieba");
nodejieba.load({
    dict: './userDicTraditional/jieba.dict.utf8',
    hmmDict: './userDicTraditional/hmm_model.utf8',
    userDict: './userDicTraditional/user.dict.utf8',
    idfDict: './userDicTraditional/idf.utf8',
    stopWordDict: './userDicTraditional/stop_words.utf8'
});
var sentence = "我是拖拉機學院手扶拖拉機專業的。不用多久，我就會升職加薪，當上CEO，走上人生顛峰。";

var result;

// 没有主动调用nodejieba.load载入词典的时候，
// 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
// 词典只会被加载一次。
result = nodejieba.cut(sentence);
console.log(result);

result = nodejieba.cut(sentence, true);
console.log(result);

result = nodejieba.cutHMM(sentence);
console.log(result);

result = nodejieba.cutAll(sentence);
console.log(result);

result = nodejieba.cutForSearch(sentence);
console.log(result);

result = nodejieba.tag(sentence);
console.log(result);

var topN = 5;
result = nodejieba.extract(sentence, topN);
console.log(result);

result = nodejieba.cut("男默女淚");
console.log(result);
nodejieba.insertWord("男默女淚");
result = nodejieba.cut("男默女淚");
console.log(result);

result = nodejieba.cutSmall("南京市長江大橋", 3);
console.log(result);
var topN = 100;
console.log(nodejieba.extract("生病感冒頭痛流鼻水肌肉痠痛", topN));