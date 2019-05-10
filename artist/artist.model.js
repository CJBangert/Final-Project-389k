var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;

const ArtistSchema = new Schema({
    name: { type: String, index:{unique: true}, required: true },
    genre: { type: String, required: true },
    tour_id:{type:[Number], default: [], required: true}
});

const ConcertSchema = new Schema({
    lineup: { type: [String], required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true},
    location: { type: String, required: true},
    friends_going: {type: [String], default: [], required: true},
    id:{type:Number, required: true}
});

const VenueSchema = new Schema({
    name: { type: String, index:{unique: true}, required: true },
    id:{ type:[Number], default: [], required: true}
});


module.exports = mongoose.model('Concert', ConcertSchema);