// Desafio 1
// const girafa = true;
// const elefante = true;
// const macaco = false;
// const baleia = false

function compareTrue(param1, param2) {
  if (param1 === true && param2 === true) {
    return true;
  } else {
    return false;
  }
}
// console.log(compareTrue(girafa, elefante));
// compareTrue(girafa, macaco);
// compareTrue(elefante, macaco);
// compareTrue(macaco, baleia);

// Desafio 2

function calcArea(base, height) {
  let totalArea = (base * height) / 2;
  return totalArea;
}
// calcArea(10, 50);
// calcArea(5, 2);
// calcArea(51, 1);

// Desafio 3
function splitSentence(frase) {
  let resultado = frase.split(' ');
  return resultado;
}
// console.log(splitSentence('go Trybe'));
// console.log(splitSentence('vamo que vamo'));
// console.log(splitSentence('foguete'));

// Desafio 4
function concatName(nomes) {
  for (let index in nomes){
    return nomes[nomes.length - 1] + ', ' + nomes[0];
  }
}
// console.log(concatName(['foguete', 'não', 'tem', 'ré']));

// Desafio 5
function footballPoints(wins, ties) {
  let vitoria = wins * 3;
  let empate = ties * 1;
  let total = vitoria + empate;
  return total;
}
// console.log(footballPoints(14, 8));
// console.log(footballPoints(1, 2));
// console.log(footballPoints(0, 0));

// Desafio 6
function highestCount(array) {
  let maiorNumero = array[0];
  for (let index in array) {
    if (array[index] > maiorNumero) {
      maiorNumero = array[index];
    }
  }
  let contador = 0;
  for (let index in array) {
    if (array[index] === maiorNumero) {
      contador += 1;
    }
  }
  return contador;
  // return maiorNumero;
}
console.log(highestCount([1, 9, 2, 3, 9, 5, 7]));
console.log(highestCount([0, 4, 4, 4, 9, 2, 1]));
console.log(highestCount([0, 0, 0]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
// Melhorando a lógica dessa questão.
  if ((Math.abs(mouse - cat1)) > (Math.abs(mouse - cat2))) {
    return 'cat2';
  } else if ((Math.abs(mouse - cat1)) === (Math.abs(mouse - cat2))) {
    return 'os gatos trombam e o rato foge';
  } else {
    return 'cat1';
  }
}
console.log(catAndMouse(0, 3, 2));
console.log(catAndMouse(10, 4, 22));
console.log(catAndMouse(1, 0, 2));

//   if (mouse === 0 && cat1 === 3 && cat2 === 2){
//     return 'cat2';
//   }
//   if (mouse === 10 && cat1 === 4 && cat2 === 22){
//     return 'cat1';
//   }
//   if (mouse === 1 && cat1 === 0 && cat2 ===2){
//     return 'os gatos trombam e o rato foge';
//   }
// }
// catAndMouse(0, 3, 2);
// catAndMouse(10, 4, 22);
// catAndMouse(1, 0, 2);

// Desafio 8
function fizzBuzz(entrada) {
  let array = [];
  for (let index = 0; index < entrada.length; index += 1) {
  if (entrada[index] % 3 === 0 && entrada[index] % 5 === 0) {
   array.push('fizzBuzz');
  } else if (entrada[index] % 3 === 0) {
   array.push('fizz');
  } else if (entrada[index] % 5 === 0) {
   array.push('buzz');
  } else {
   array.push('bug!');
 }
}
  return array;
}
console.log(fizzBuzz([2, 15, 7, 9, 45]));
console.log(fizzBuzz([7, 9]));
console.log(fizzBuzz([9, 25]));

// Desafio 9
function encode(string) {
// Código um pouco melhorado.
  let novaFrase = string;
  novaFrase = novaFrase.replace(/a/g, '1');
  novaFrase = novaFrase.replace(/e/g, '2');
  novaFrase = novaFrase.replace(/i/g, '3');
  novaFrase = novaFrase.replace(/o/g, '4');
  novaFrase = novaFrase.replace(/u/g, '5');
  return novaFrase;
}
// console.log(encode('Hello'));
// console.log(encode('How are you today?'));
// console.log(encode('This is an encoding test.'));
// console.log(encode('go Trybe!'));

// let fraseCodificada = []
// for (const index in string) {
//   if (string[index] === 'a') {
//     fraseCodificada.push('1')
//   }
//   else if (string[index] === 'e') {
//     fraseCodificada.push('2')
//   }
//   else if (string[index] === 'i') {
//     fraseCodificada.push('3')
//   }
//   else if (string[index] === 'o') {
//     fraseCodificada.push('4')
//   }
//   else if (string[index] === 'u') {
//     fraseCodificada.push('5')
//   }
//   else {
//     fraseCodificada.push(string[index])
//   }
// }
// return fraseCodificada.join('');
// }
// console.log(encode('Hello'));
// console.log(encode('How are you today?'));
// console.log(encode('This is an encoding test.'));
// console.log(encode('go Trybe!'));

function decode(string) {
// Código um pouco melhorado.
  let novaFrase = string;
  novaFrase = novaFrase.replace(/1/g, 'a');
  novaFrase = novaFrase.replace(/2/g, 'e');
  novaFrase = novaFrase.replace(/3/g, 'i');
  novaFrase = novaFrase.replace(/4/g, 'o');
  novaFrase = novaFrase.replace(/5/g, 'u');
  return novaFrase;
}
// console.log(decode('h2ll4'));
// console.log(decode('H4w 1r2 y45 t4d1y?'));
// console.log(decode('Th3s 3s 1n 2nc4d3ng t2st.'));
// console.log(decode('g4 Tryb2!'));

// let fraseDecodificada = []
// for (const index in string) {
//   if (string[index] === '1') {
//     fraseDecodificada.push('a')
//   }
//   else if (string[index] === '2') {
//     fraseDecodificada.push('e')
//   }
//   else if (string[index] === '3') {
//     fraseDecodificada.push('i')
//   }
//   else if (string[index] === '4') {
//     fraseDecodificada.push('o')
//   }
//   else if (string[index] === '5') {
//     fraseDecodificada.push('u')
//   }
//   else {
//     fraseDecodificada.push(string[index])
//   }
// }
// return fraseDecodificada.join('');
// }
// console.log(decode('h2ll4'));
// console.log(decode('H4w 1r2 y45 t4d1y?'));
// console.log(decode('Th3s 3s 1n 2nc4d3ng t2st.'));
// console.log(decode('g4 Tryb2!'));

// Desafio 10
function techList(lista, nome) {
  let array = [];
  if (lista.length === 0) {
    return 'Vazio!';
  } else {
    let listaPreenchida = lista.sort();
    for (let index = 0; index < lista.length; index += 1) {
      array.push({
        tech: lista[index],
        name: nome,
      })
    }
    return array;
  }
}
// console.log(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Marcos'));
// console.log(techList([], ''));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
}
