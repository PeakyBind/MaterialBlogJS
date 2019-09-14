let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newslettersSchema = new Schema({
  datePublication: Date,
  contenu: String
});

module.exports = newslettersSchema;
