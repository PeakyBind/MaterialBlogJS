var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var categoriesSchema = new Schema({
  nom: { type: String, required: true },
  articles: [{ type: ObjectId, ref: 'Article'}],
});

module.exports = categoriesSchema;
