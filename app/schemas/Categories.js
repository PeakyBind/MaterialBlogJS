var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
  nom: String
});

module.exports = categoriesSchema;
