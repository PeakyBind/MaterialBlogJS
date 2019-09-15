var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var auteursSchema = require('./Auteurs');
var categoriesSchema = require('./Categories');
var ObjectId = mongoose.Schema.Types.ObjectId;

var articlesSchema = new Schema({
  titre: String,
  image: String,
  contenu: String,
  categorie: ObjectId,
  auteur: ObjectId
});

module.exports = articlesSchema;
