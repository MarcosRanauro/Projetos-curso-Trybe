const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const animalAge = data.species.filter((nome) => nome.name === animal)[0]
    .residents.every((residente) => residente.age >= age);
  return animalAge;
}

module.exports = getAnimalsOlderThan;
