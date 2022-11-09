const data = require('../data/zoo_data');

function isManager(id) {
  const getManager = data.employees.some((gerente) => gerente.managers.includes(id));
  return getManager;
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  return data.employees.filter((gerente) => gerente.managers.includes(managerId))
    .map((gerente) => `${gerente.firstName} ${gerente.lastName}`);
}

module.exports = { isManager, getRelatedEmployees };
