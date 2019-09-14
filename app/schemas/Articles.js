var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auteursSchema = new Schema({
  pseudo: String
});

var categoriesSchema = new Schema({
  nom: String
});


var articlesSchema = new Schema({
  titre: String,
  image: String,
  contenu: String,
  categorie: categoriesSchema,
  auteur: auteursSchema
});

module.exports = articlesSchema;
