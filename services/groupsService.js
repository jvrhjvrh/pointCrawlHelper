const groupsModel = require('../models/groups');

async function addGroup(name, userId) {
  const newEncounter = new groupsModel(
    {
      name,
      manager: userId,
    },
  );
  const response = await newEncounter.save();
  console.log(response);
  return response;
}

async function getGroups(userId) {
  return groupsModel.find(
    {
      createdBy: userId
    },
  );
}

async function getOneGroup(objectId, userId) {
  return groupsModel.findOne(
    {
      _id: objectId,
      createdBy: userId,
    },
  );
}

async function deleteOne(objectId, userId) {
  return groupsModel.remove(
    {
      _id: objectId,
      createdBy: userId,
    },
  );
}

async function updateOne(objectId, name, encounters, userId) {
  return groupsModel.updateOne(
    {
      _id: objectId,
      createdBy: userId,
    },
    {
      $set: {
        name,
        encounters,
      },
    },
  );
}

module.exports = {
  addGroup,
  getGroups,
  getOneGroup,
  deleteOne,
  updateOne,
};
