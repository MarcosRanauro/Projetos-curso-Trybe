const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.filter((pessoa) => pessoa.firstName === employeeName
  || pessoa.lastName === employeeName)[0];
}

module.exports = getEmployeeByName;
