let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let abonnesSchema = new Schema({
  email: String,
  nom: String
});

module.exports = abonnesSchema;
