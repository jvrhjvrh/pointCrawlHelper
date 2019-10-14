const locationsService = require('../services/locationsService');

async function save(req, res) {
  const userId = req.verifiedToken.id;
  const body = req.body;
  try{
    const resp = await locationsService.addLocation(body.name, body.description, userId);
    res.send(resp)
  } catch (e) {
    res.status(500).send(e);
  }
}

async function index(req,res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await locationsService.getLocations(userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getOne(req, res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await locationsService.getOneLocation(req.params.objectId, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function deleteOne(req, res) {
  const userId = req.verifiedToken.id;
  try{
    const resp = await locationsService.deleteOne(req.params.objectId, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function update(req, res) {
  const userId = req.verifiedToken.id;
  const body = req.body;
  try{
    const resp = await locationsService.updateOne(req.params.objectId, body.name, body.description, userId);
    res.send(resp);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  save,
  index,
  update,
  deleteOne,
  getOne,
};
