var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designSchema = new Schema({
    screenCapture: String,
    title: String,
    price: String,
    private: Boolean,
    user_name: String,
    like: Number
},{collection:'designs'});

module.exports = mongoose.model('Design', designSchema);