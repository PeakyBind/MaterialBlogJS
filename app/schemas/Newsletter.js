var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newslettersSchema = new Schema({
  datePublication: Date,
  contenu: String
});

module.exports = newslettersSchema;
