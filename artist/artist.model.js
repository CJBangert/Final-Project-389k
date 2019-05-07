var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    name: { type: String, index:{unique: true}, required: true },
    genre: { type: String, required: true },
    tour_id:{type:[Number], default: [], required: true}
});