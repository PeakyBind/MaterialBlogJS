var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newslettersSchema = new Schema({
  datePublication: { type: Date, required: true },
  contenu: { type: String, required: true}
});

module.exports = newslettersSchema;
