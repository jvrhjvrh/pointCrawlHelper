const encountersModel = require('../models/encounters');

async function addEncounter(name, encounters, userId) {
  const newEncounter = new encountersModel(
    {
      name,
      encounters,
      createdBy: userId,
    },
  );
  return newEncounter.save()
}

async function getEncounters(userId) {
  return encountersModel.find(
    {
      createdBy: userId
    },
  );
}

async function getOneEncounter(objectId, userId) {
    return encountersModel.findOne(
      {
        _id: objectId,
        createdBy: userId,
      },
    );
}

async function deleteOne(objectId, userId) {
  return encountersModel.remove(
    {
      _id: objectId,
      createdBy: userId,
    },
  );
}

async function updateOne(objectId, name, encounters, userId) {
  return encountersModel.updateOne(
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

async function roll(objectId, userId) {
  const vector = await getOneEncounter(objectId, userId);
  const chance = vector.encounters.reduce((acc, encounter) => acc + encounter.chance);
  const randomValue = Math.floor((Math.random() * chance) +1);
  let chanceAcc = 0;
  let description = '';

  for(let i = 0; i < vector.encounters.length && chanceAcc < randomValue; i++){
    description = vector.encounters[i].description;
    chanceAcc += vector.encounters[i].chance;
  }

  const results =  description.map(async desc => desc.includes('_id:') ? roll(desc.replace('_id:',''), userId) : desc);
  const awaitResults = await Promise.all(results);
  return {
    name: vector.name,
    results: awaitResults,
    roll: randomValue,
  };
}

module.exports = {
  addEncounter,
  getEncounters,
  getOneEncounter,
  updateOne,
  deleteOne,
  roll,
};
