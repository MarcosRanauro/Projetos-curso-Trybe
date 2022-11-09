const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const personId = data.employees.find((person) => person.id === id);
  const firstAnimal = personId.responsibleFor[0];
  const oldAnimal = data.species.find((specie) => specie.id === firstAnimal);
  const maxAge = oldAnimal.residents.sort((a, b) => b.age - a.age);
  return Object.values(maxAge[0]);
}

module.exports = getOldestFromFirstSpecies;
