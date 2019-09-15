var mongoose = require('mongoose');
var schema = require('./../schemas/UsersSchema');

var model = mongoose.model('User', schema);

module.exports = model;
