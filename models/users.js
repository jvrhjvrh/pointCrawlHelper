const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groups = new Schema ({
  id:{type: String}
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: {type: [groups], default: []},
});

module.exports = mongoose.model('User', UserSchema, 'users');
