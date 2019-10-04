const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
  name: {type: String, required: true},
  encounters: {type: Array, required: true},
});

module.exports = mongoose.model('Encounters', EncounterSchema, 'encounters');
