const data = require('../data/zoo_data');

function countAnimals(animal) {
  const { species } = data;
  if (animal === undefined) {
    return species.reduce((acc, curl) => {
      acc[curl.name] = curl.residents.length;
      return acc;
    }, {});
  }
  const getSpecies = species.find((specie) => specie.name === animal.specie).residents;
  if (animal.sex) {
    return getSpecies.filter((specie) => specie.sex === animal.sex).length;
  }
  return getSpecies.length;
}

module.exports = countAnimals;
