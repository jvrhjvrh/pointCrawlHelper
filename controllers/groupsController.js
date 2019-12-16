const groupsService = require('../services/groupsService');

async function save(req, res) {
  const userId = req.verifiedToken.id;
  const body = req.body;
  try{
    const resp = await groupsService.addGroup(body.name, userId);
    res.send(resp)
  } catch (e) {
    res.status(500).send(e);
  }
}

async function index(req,res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await groupsService.getGroups(userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }

}

async function getOne(req, res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await groupsService.getOneGroup(req.params.objectId, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }

}

async function deleteOne(req, res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await groupsService.deleteOne(req.params.objectId, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function update(req, res) {
  const userId = req.verifiedToken.id;
  const body = req.body;
  try{
    const resp = await groupsService.updateOne(req.params.objectId, body.name, body.encounters, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function roll(req, res) {
  const userId = req.verifiedToken.id;
  try {
    const resp = await groupsService.roll(req.params.objectId, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  save,
  index,
  getOne,
  update,
  deleteOne,
  roll,
};
