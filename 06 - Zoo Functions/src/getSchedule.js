const data = require('../data/zoo_data');

const { hours, species } = data;

const days = Object.keys(hours);

const checkAnimal = (animal) => species.find(({ name }) => name === animal);

const animalOfDay = (weekend) => {
  if (weekend === 'Monday') {
    return 'The zoo will be closed!';
  }
  return species.filter(({ availability }) => availability.includes(weekend))
    .map((animals) => animals.name);
};

const hoursOpened = (day) => {
  if (day === 'Monday') {
    return 'CLOSED';
  }
  return `Open from ${hours[day].open}am until ${hours[day].close}pm`;
};

const daysSchedule = (day) => {
  const daySchedule = {
    [day]: {
      exhibition: animalOfDay(day),
      officeHour: hoursOpened(day),
    },
  };
  return daySchedule;
};

const showAll = () => {
  const schedule = days.reduce((total, day) => ({ ...total, ...daysSchedule(day) }), {});
  return schedule;
};

function getSchedule(scheduleTarget) {
  const animal = checkAnimal(scheduleTarget);
  const today = days.find((day) => day === scheduleTarget);
  if (animal !== undefined) return animal.availability;
  const allAnimals = showAll();
  if (today !== undefined) {
    return daysSchedule(scheduleTarget);
  }
  return allAnimals;
}

module.exports = getSchedule;
