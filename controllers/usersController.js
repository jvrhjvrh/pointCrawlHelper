const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersService = require('../services/usersService');

async function createUser(req, res) {
  const user = req.body;
  try{
    const resp = await usersService.createUser(user);
    const token = await jwt.sign({name: resp.name, email: resp.email, id: resp._id},'minhaChaveSecreta');
    res.send({token});
  } catch (e) {
    res.status(500).send({error: `${e}`});
  }
}

async function getUsers(req, res) {
  try{
    const resp = await usersService.getUsers();
    res.send(resp)
  } catch (e) {
    res.status(500).send(e);
  }
}

//todo finish login
async function login(req, res) {
  try{
    const resp = await usersService.getUserByName(req.body.name);
    if(resp) {
      const isEqual = await bcrypt.compare(req.body.password, resp.password);
      if(isEqual){
        const token = await jwt.sign({name: resp.name, email: resp.email, id: resp._id},'minhaChaveSecreta');
        res.send({token});
      } else {
        res.status(400).send({error: 'Invalid Username or password'})
      }
    } else {
      res.status(400).send({error: 'Invalid Username or password'})
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = {
  createUser,
  login,
  getUsers,
};