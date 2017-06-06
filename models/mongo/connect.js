/**
 * Created by Tommy on 2017/6/1.
 */
var mongoose = require('mongoose');
var options = {
   db: { native_parser: true },
    server: { poolSize: 5 },
   // replset: { rs_name: 'myReplicaSetName' },
   user: 'root',
   pass: 'root'
}
mongoose.connect('mongodb://root:root@127.0.0.1/chatterbot-database');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("now open mongo connect");
});

module.exports=mongoose;