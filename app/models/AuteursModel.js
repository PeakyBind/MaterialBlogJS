var mongoose = require('mongoose');
var schema = require('./../schemas/Auteurs');

var model = mongoose.model('Auteur', schema);

module.exports = model;
