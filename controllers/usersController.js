const usersService = require('../services/usersService');

async function createUser(req, res) {
  const user = req.body;
  try{
    const resp = await usersService.createUser(user);
    res.send(resp)
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
    const resp = await usersService.getUsers();
    res.send(resp)
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  createUser,
  login,
  getUsers,
};