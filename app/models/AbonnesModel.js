// ./app/models/AbonnesModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/Abonnes');

var model = mongoose.model('Abonne', schema);

module.exports = model;
