var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    screenCapture: String,
    title: String,
    price: String
},{collection:'designs'});

module.exports = mongoose.model('Design', testSchema);