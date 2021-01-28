var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    exist: Boolean,
    email: String,
    liked: Array
},{collection:'users'});

module.exports = mongoose.model('users', userSchema);