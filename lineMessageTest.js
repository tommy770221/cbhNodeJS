/**
 * Created by Tommy on 2017/6/1.
 */
var mongoose=require('./models/mongo/connect.js');

var kittySchema = mongoose.Schema({
    name: String,
    address:Object
});
var Kitten = mongoose.model('Kitten', kittySchema);
var address
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
var address={
    "results" : [
        {
            "address_components" : [
                {
                    "long_name" : "77",
                    "short_name" : "77",
                    "types" : [ "street_number" ]
                },
                {
                    "long_name" : "光華路",
                    "short_name" : "光華路",
                    "types" : [ "route" ]
                },
                {
                    "long_name" : "清水區",
                    "short_name" : "清水區",
                    "types" : [ "administrative_area_level_3", "political" ]
                },
                {
                    "long_name" : "台中市",
                    "short_name" : "台中市",
                    "types" : [ "administrative_area_level_1", "political" ]
                },
                {
                    "long_name" : "台灣",
                    "short_name" : "TW",
                    "types" : [ "country", "political" ]
                },
                {
                    "long_name" : "436",
                    "short_name" : "436",
                    "types" : [ "postal_code" ]
                }
            ],
            "formatted_address" : "436台灣台中市清水區光華路77號",
            "geometry" : {
                "location" : {
                    "lat" : 24.264685,
                    "lng" : 120.572509
                },
                "location_type" : "ROOFTOP",
                "viewport" : {
                    "northeast" : {
                        "lat" : 24.2660339802915,
                        "lng" : 120.5738579802915
                    },
                    "southwest" : {
                        "lat" : 24.2633360197085,
                        "lng" : 120.5711600197085
                    }
                }
            },
            "place_id" : "ChIJC0EcoIcUaTQRAmfMOgaVMh0",
            "types" : [ "street_address" ]
        }
    ],
    "status" : "OK"
};

var fluffy = new Kitten({ name: 'fluffy',address:address });
fluffy.speak; // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak;
    mongoose.disconnect();
});
