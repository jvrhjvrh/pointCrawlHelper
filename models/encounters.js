const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Encounter = new Schema({
  name: { type: String, required: true },
  chance: { type: Number, required: true },
  description: { type: [String], required: true, default: undefined },
});

const EncounterSchema = new Schema({
  name: { type: String, required: true },
  encounters: { type: [Encounter], required: true, default: undefined, validate: {
    validator: (v) => {
      return !!v.length;
    },
    message: "Empty encounter list",
  }},
  createdBy: { type: String, required: true },
});

module.exports = mongoose.model('Encounters', EncounterSchema, 'encounters');
