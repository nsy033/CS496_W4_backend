var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    colorCode:String,
    analogous1:String,
    analogous2:String,
    analogous3:String,
    analogous4:String,
    analogous5:String
},{collection:'appliers'});

module.exports = mongoose.model('Test', testSchema);