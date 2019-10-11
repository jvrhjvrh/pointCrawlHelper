const usersModel = require('../models/users');
const bcrypt = require('bcrypt');

async function createUser(user) {
  if(user.password.length < 6){
    throw 'password length must be at least 6 characters long'
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new usersModel({name:user.name, password:hashedPassword, email:user.email});
  return newUser.save();
}

async function getUsers() {
    return usersModel.find();
}

async function getUserByName(name){
  return usersModel.findOne({name})
}

module.exports = {
  createUser,
  getUsers,
  getUserByName,
};