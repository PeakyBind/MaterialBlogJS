var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
  nom: { type: String, required: true }
});

module.exports = categoriesSchema;
