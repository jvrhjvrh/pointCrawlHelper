const encountersModel = require('../models/encounters');

async function addEncounter(name, encounters) {
  try{
  const test = new encountersModel({name, encounters});
  return test.save()
  } catch (e) {
    return e;
  }
}

async function getEncounters() {
  try{
  return encountersModel.find();
  } catch (e) {
    return e;
  }
}

async function getOneEncounter(objectId) {
  try{
    return encountersModel.findOne({_id:objectId});
  } catch (e) {
    return e;
  }

}

async function deleteOne(objectId) {
  return encountersModel.remove({_id:objectId});
}

async function updateOne(objectId, name, encounters) {
  return encountersModel.updateOne({_id: objectId}, {$set:{name, encounters}});
}

async function roll(objectId) {
  const vector = await getOneEncounter(objectId);
  const chance = vector.encounters.reduce((acc, encounter) => {return acc + encounter.chance}, 0);
  const randomValue = Math.floor((Math.random() * chance) +1);
  let chanceAcc = 0;
  let description = '';

  for(let i = 0; i < vector.encounters.length && chanceAcc < randomValue; i++){
    description = vector.encounters[i].description;
    chanceAcc += vector.encounters[i].chance;
  }

  const results =  description.map(async desc => desc.includes('_id:') ? roll(desc.replace('_id:','')) : desc);
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
