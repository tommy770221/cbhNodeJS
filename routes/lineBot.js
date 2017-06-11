/**
 * Created by Tommy on 2017/5/30.
 */
var express = require('express');
var linebot = require('linebot');
var router = express.Router();
var nodejieba = require("nodejieba");
var  Set = require("collections/set");
var models = require('../models/index.js');
var async = require("async");
nodejieba.load({
    dict: './userDicTraditional/jieba.dict.utf8',
    hmmDict: './userDicTraditional/hmm_model.utf8',
    userDict: './userDicTraditional/user.dict.utf8',
    idfDict: './userDicTraditional/idf.utf8',
    stopWordDict: './userDicTraditional/stop_words.utf8'
});
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
bot.on('message', function (event) {
    switch (event.message.type) {
        case 'text':
            switch (event.message.text) {
                case 'Me':
                    event.source.profile().then(function (profile) {
                        return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
                    });
                    break;
                case 'Picture':
                    event.reply({
                        type: 'image',
                        originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png',
                        previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png'
                    });
                    break;
                case 'Location':
                    event.reply({
                        type: 'location',
                        title: 'LINE Plus Corporation',
                        address: '1 Empire tower, Sathorn, Bangkok 10120, Thailand',
                        latitude: 13.7202068,
                        longitude: 100.5298698
                    });
                    break;
                case 'Push':
                    bot.push('U6350b7606935db981705282747c82ee1', ['Hey!', 'สวัสดี ' + String.fromCharCode(0xD83D, 0xDE01)]);
                    break;
                case 'Push2':
                    bot.push(['U6350b7606935db981705282747c82ee1', 'U6350b7606935db981705282747c82ee1'], ['Hey!', 'สวัสดี ' + String.fromCharCode(0xD83D, 0xDE01)]);
                    break;
                case 'Multicast':
                    bot.push(['U6350b7606935db981705282747c82ee1', 'U6350b7606935db981705282747c82ee1'], 'Multicast!');
                    break;
                case 'Confirm':
                    event.reply({
                        type: 'template',
                        altText: 'this is a confirm template',
                        template: {
                            type: 'confirm',
                            text: 'Are you sure?',
                            actions: [{
                                type: 'message',
                                label: 'Yes',
                                text: 'yes'
                            }, {
                                type: 'message',
                                label: 'No',
                                text: 'no'
                            }]
                        }
                    });
                    break;
                case 'Multiple':
                    return event.reply(['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']);
                    break;
                case 'Version':
                    event.reply('linebot@' + require('../package.json').version);
                    break;
                default:
                    {
                        var result = nodejieba.cut(event.message.text);
                        console.log(result);
                        var s = new Set();
                        var x=0;
                        async.eachSeries(result,function (itemRe,callback) {
                        models.Disease.findAll({where: ["symptom like '%"+itemRe+"%'"]}).then(function (projects) {
                                x++;
                                console.log(itemRe);
                                projects.forEach(function (proj) {
                                    //console.log(proj.category);
                                    s.add(proj);
                                    console.log(proj.category+proj.doc_category)
                                });
                                callback(null,abc(s,x,projects.length,event));
                            }).catch(function (err) {
                                // handle error;
                                console.log("proj error : "+ err);
                            });;
                            console.log("123")
                        }, function(err,s){
                            console.log("err is:" + err);
                            console.log(s);
                        });

                    }
                    break;
            }
            break;
        case 'image':
            event.message.content().then(function (data) {
                const s = data.toString('base64').substring(0, 30);
                return event.reply('Nice picture! ' + s);
            }).catch(function (err) {
                return event.reply(err.toString());
            });
            break;
        case 'video':
            event.reply('Nice movie!');
            break;
        case 'audio':
            event.reply('Nice song!');
            break;
        case 'location':
            event.reply({
						type: 'location',
						title: 'LINE Plus Corporation',
						address: '1 Empire tower, Sathorn, Bangkok 10120, Thailand',
						latitude: 13.7202068,
						longitude: 100.5298698
});
            break;
        case 'sticker':
            event.reply({
                type: 'sticker',
                packageId: 1,
                stickerId: 1
            });
            break;
        default:
            event.reply('Unknow message: ' + JSON.stringify(event));
            break;
    }
});

bot.on('follow', function (event) {
    event.reply('follow: ' + event.source.userId);
});

bot.on('unfollow', function (event) {
    event.reply('unfollow: ' + event.source.userId);
});

bot.on('join', function (event) {
    event.reply('join: ' + event.source.groupId);
});

bot.on('leave', function (event) {
    event.reply('leave: ' + event.source.groupId);
});

bot.on('postback', function (event) {
    event.reply('postback: ' + event.postback.data);
});

bot.on('beacon', function (event) {
    event.reply('beacon: ' + event.beacon.hwid);
});

function abc(s,x,lengh,event) {
    console.log(s.length);

    s.forEach(function (proj) {
        console.log(proj.category);
    });
    try{
        if(x==lengh){
            var category='';
            s.forEach(function (proj) {
             category=category+proj.category;
                console.log(proj.category);
            });
            event.reply(category).then(function (data) {
                console.log('Success', data);
            }).catch(function (error) {
                console.log('Error', error);
            });
        }
    }catch(error) {
        console.log('Error', error);
    };

    return s;
}

module.exports = router;
