var mongoose = require('mongoose');
var schema = require('./../schemas/Articles');

var model = mongoose.model('Article', schema);

module.exports = model;
