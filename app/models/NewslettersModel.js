var mongoose = require('mongoose');
var schema = require('./../schemas/Newsletter');

var model = mongoose.model('Newsletter', schema);

module.exports = model;
