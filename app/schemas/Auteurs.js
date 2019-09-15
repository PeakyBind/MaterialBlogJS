var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auteursSchema = new Schema({
  pseudo: String
});

module.exports = auteursSchema;
