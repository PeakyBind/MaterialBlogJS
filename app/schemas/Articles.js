var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var articlesSchema = new Schema({
  titre: { type: String, required: true},
  image: String,
  contenu: String,
  categorie: { type: ObjectId, ref: 'Categorie'},
  auteur: { type: ObjectId, ref: 'Auteur'}
});

module.exports = articlesSchema;
