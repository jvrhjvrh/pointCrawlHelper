const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema= new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {type: String, required: true},
});

module.exports = mongoose.model('Location', LocationSchema, 'locations');
