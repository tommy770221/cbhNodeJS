/**
 * Created by Tommy on 2017/5/30.
 */
var express = require('express');
var linebot = require('linebot');
var router = express.Router();
var bot = linebot({
    channelId:  '1502550438',
    channelSecret: 'a8a230a30fa049d9eeaf648df717e872 ',
    channelAccessToken: 'olYRbnrQWWUcWchziJynJvh8mKvk1NehTooEbvWpRFOcrwhJ3OWKjoqRmMLof0cl9BCqKOsP9kUczSV7/8YcEQAT+bey31BIgiwuZ45tM7uaScMJDAjnAvEIDtfjAm9G/2/2rH5dZrF7THNWfTzaagdB04t89/1O/w1cDnyilFU='
});
var linebotParser = bot.parser();


/* GET home page. */
router.all('/webhook', function(req, res, next) {
    bot.parse(req.body);
    return ;
});
bot.on('message',  function (event) {
    console.log(event);
    event.reply('Hello, world').then(function (data) {
        // success
        console.log("data");
        console.log(data);
    }).catch(function (error) {
        // error
        console.log("error");
        console.log(error);
    });
});
module.exports = router;