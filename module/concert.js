    
var mongoose = require('mongoose');

const ConcertSchema = new mongoose.Schema({
    lineup: { type: [String], required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true},
    location: { type: String, required: true},
    friends_going: {type: [String], default: [], required: true},
    id:{type:String, required: true}
});

var concert = mongoose.model('concerts', ConcertSchema);
module.exports = concert;