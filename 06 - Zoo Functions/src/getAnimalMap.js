const data = require('../data/zoo_data');

const { species } = data;

const getLocation = () => {
  const locations = species.map(({ location }) => location);
  return [...new Set(locations)];
};

const getResidents = (residents, filter = 'none') => {
  if (filter === 'male' || filter === 'female') {
    return residents
      .reduce((total, { name, sex }) => {
        if (filter === sex) return [...total, name];
        return total;
      }, []);
  }
  return residents
    .reduce((total, { name }) => [...total, name], []);
};

const getAnimalLocation = (position, filter = 'none') => {
  const animals = species
    .filter(({ location }) => location === position);
  if (filter === 'none') return animals.map((animal) => animal.name);
  const residentsArray = animals.map(({ name, residents }) => {
    const object = {
      [name]: getResidents(residents, filter),
    };
    return object;
  });
  return residentsArray;
};

const sortAnimals = (array) => {
  const newObject = array;
  getLocation().forEach((location) =>
    array[location].forEach(((animal, index) =>
      Object.keys(animal).forEach((specie) => {
        newObject[location][index][specie] = array[location][index][specie].sort();
      }))));
  return newObject;
};

const setAnimalLocation = (filter, sort) => {
  const objectAnimals = getLocation()
    .reduce((total, location) => {
      const animals = {
        [location]: getAnimalLocation(location, filter),
      };
      return { ...total, ...animals };
    }, {});
  if (sort) return sortAnimals(objectAnimals);
  return objectAnimals;
};

function getAnimalMap(options) {
  // seu código aqui
  if (options === undefined) return setAnimalLocation();
  if (options.includeNames === undefined) return setAnimalLocation();
  if (options.sex !== undefined) return setAnimalLocation(options.sex, options.sorted);
  if (options.includeNames === true) return setAnimalLocation('byName', options.sorted);
}

module.exports = getAnimalMap;
