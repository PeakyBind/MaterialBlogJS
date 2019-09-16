var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auteursSchema = new Schema({
  pseudo: { type: String, required: true }
});

module.exports = auteursSchema;
