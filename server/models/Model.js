const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  url: String,
  created: new Date()
});

module.exports = mongoose.model('Product', productSchema);;
