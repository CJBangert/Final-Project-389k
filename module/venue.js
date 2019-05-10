var mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    name: { type: String, index:{unique: true}, required: true },
    id:{ type:[Number], default: [], required: true}
});

var venue = mongoose.model('venues', VenueSchema);

module.exports = venue;