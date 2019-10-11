const encountersModel = require('../models/encounters');

async function addEncounter(name, encounters, userId) {
  try{
  const newEncounter = new encountersModel({name, encounters, createdBy: userId});
  return newEncounter.save()
  } catch (e) {
    return e;
  }
}

async function getEncounters(userId) {
  try{
  return encountersModel.find({createdBy: userId});
  } catch (e) {
    return e;
  }
}

async function getOneEncounter(objectId, userId) {
  try{
    return encountersModel.findOne({_id:objectId, createdBy: userId});
  } catch (e) {
    return e;
  }

}

async function deleteOne(objectId, userId) {
  return encountersModel.remove({_id:objectId, createdBy: userId});
}

async function updateOne(objectId, name, encounters, userId) {
  return encountersModel.updateOne({_id: objectId, createdBy: userId}, {$set:{name, encounters}});
}

async function roll(objectId, userId) {
  const vector = await getOneEncounter(objectId, userId);
  const chance = vector.encounters.reduce((acc, encounter) => {return acc + encounter.chance}, 0);
  const randomValue = Math.floor((Math.random() * chance) +1);
  let chanceAcc = 0;
  let description = '';

  for(let i = 0; i < vector.encounters.length && chanceAcc < randomValue; i++){
    description = vector.encounters[i].description;
    chanceAcc += vector.encounters[i].chance;
  }

  const results =  description.map(async desc => desc.includes('_id:') ? roll(desc.replace('_id:',''), userId) : desc);
  const awaitResults = await Promise.all(results);
  return {name: vector.name, results: awaitResults , roll: randomValue};
}

module.exports = {
  addEncounter,
  getEncounters,
  getOneEncounter,
  updateOne,
  deleteOne,
  roll,
};
