// Desafio 11
function generatePhoneNumber(array) {
  let phone = '(' + array[0] + array[1] + ')'
if (array.length !== 11) {
  return 'Array com tamanho incorreto.'
} for (index = 0; index < array.length; index += 1) {
    if (array[index] > 9 || array[index] < 0) {
      return 'não é possível gerar um número de telefone com esses valores'
  }
  let repeats = 0;
  for (index2 = 0; index2 < array.length; index2 += 1) {
      if (repeats < 3 && array[index] === array[index2]) {
        repeats += 1;
        }
    } if (repeats >= 3) {
      return 'não é possível gerar um número de telefone com esses valores'
  }
}
  for (index = 2; index < array.length; index += 1) {
    if (phone.length == 4) {
      phone = phone.concat(' ');
  } else if (phone.length == 10) {
      phone = phone.concat('-');
  }
  phone = phone.concat(array[index]);
}
    return phone;
}

// Desafio 12
function triangleCheck(linhaA, linhaB, linhaC) {
  if (linhaA > linhaB + linhaC || linhaB > linhaA + linhaC || linhaC > linhaA + linhaB && linhaA < Math.abs(linhaB - linhaC) || linhaB < Math.abs(linhaA - linhaC) || linhaC < Math.abs(linhaB - linhaA)) {
    return false;
  } return true;
}

// Desafio 13
function hydrate(string) {
  let numbers = /\d+/g;
  let water = 0;
  for (index = 0; index < string.match(numbers).length; index += 1) {
    water += (+string.match(numbers)[index]);
  } if (water < 2) {
    return water + ' copo de água';
  }
  return water + ' copos de água';
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
