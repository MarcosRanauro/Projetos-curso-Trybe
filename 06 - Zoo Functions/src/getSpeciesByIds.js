const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const specieId = ids.map((id) => data.species.filter((specie) => (specie.id === id))[0]);
  return specieId;
}

module.exports = getSpeciesByIds;
