let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let abonnesSchema = new Schema({
  email: { type: String, required: true },
  nom: { type: String, required: true}
});

module.exports = abonnesSchema;
