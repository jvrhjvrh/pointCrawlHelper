const locationsModel = require('../models/locations');

async function addLocation(name, description, userId) {
    const newLocation = new locationsModel({name, description, createdBy: userId});
    return newLocation.save()
}

async function getLocations(userId) {
    return locationsModel.find({createdBy: userId});
}

async function getOneLocation(objectId, userId) {
  return locationsModel.findOne({_id:objectId, createdBy: userId});
}

async function deleteOne(objectId, userId) {
  return locationsModel.remove({_id:objectId, createdBy: userId});
}

async function updateOne(objectId, name, encounters, userId) {
  return locationsModel.updateOne({_id: objectId, createdBy: userId}, {$set:{name, encounters}});
}

module.exports = {
  addLocation,
  getLocations,
  updateOne,
  deleteOne,
  getOneLocation,
};
