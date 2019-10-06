// ./app/models/CategoriesModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/Categories');

var model = mongoose.model('Categorie', schema);

module.exports = model;
