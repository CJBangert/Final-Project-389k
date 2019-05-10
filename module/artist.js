var mongoose = require('mongoose')

const ArtistSchema = new Schema({
    name: { type: String, index:{unique: true}, required: true },
    genre: { type: String, required: true },
    tour_id:{type:[Number], default: [], required: true}
});


var artist = mongoose.model('artists', ArtistSchema);

module.exports = artist;


