var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  email: String,
  pseudo: String,
  password: String
});

module.exports = usersSchema;
