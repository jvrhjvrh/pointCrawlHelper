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
  try{
    return usersModel.find();
  } catch (e) {
    return e;
  }
}

module.exports = {
  createUser,
  getUsers,
};