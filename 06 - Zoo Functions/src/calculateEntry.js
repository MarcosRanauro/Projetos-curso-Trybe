const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const child = entrants.filter((pessoa) => pessoa.age < 18).length;
  const adult = entrants.filter((pessoa) => pessoa.age >= 18 && pessoa.age < 50).length;
  const senior = entrants.filter((pessoa) => pessoa.age >= 50).length;
  return { child, adult, senior };
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const sumEntry = countEntrants(entrants);
  const childEntry = (sumEntry.child) * data.prices.child;
  const adultEntry = (sumEntry.adult) * data.prices.adult;
  const seniorEntry = (sumEntry.senior) * data.prices.senior;
  return childEntry + adultEntry + seniorEntry;
}

module.exports = { calculateEntry, countEntrants };
