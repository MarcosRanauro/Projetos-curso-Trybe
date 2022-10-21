window.onload = function () {

function criandoPaleta () {
    const pegandoElemento = document.getElementById('color-palette');

    for (let index = 0; index < 4; index += 1) {
        let paletas = document.createElement('div');
        pegandoElemento.appendChild(paletas);
        paletas.className = 'color';
        if (index > 0) {
        paletas.id = 'color' + index;
        }
    }
}
criandoPaleta();

function coresIniciais () {
    const pegandoQuadros = document.getElementsByClassName('color');
    const cores = ['black', 'blue', 'orange', 'green'];
    for (let index = 0; index < pegandoQuadros.length; index += 1) {
        pegandoQuadros[index].style.backgroundColor = cores[index];
    }
}
coresIniciais();

function gerandoCores () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;

}
gerandoCores();


function botaoCores () {
    const pegandoBotao = document.getElementById('button-random-color');
    const pegandoCores2 = document.getElementsByClassName('color');
    pegandoBotao.addEventListener('click', function(){
        for (let index = 1; index < 4; index += 1) {
          pegandoCores2[index].style.backgroundColor = gerandoCores();
          const cor2 = document.getElementById("color1").style.backgroundColor;
          const cor3 = document.getElementById("color2").style.backgroundColor;
          const cor4 = document.getElementById("color3").style.backgroundColor;
          localStorage.setItem('colorPalette', JSON.stringify([cor2, cor3, cor4]));
        }
    })
}
botaoCores();

function tabela () {
    const pegandoElementoTabela = document.getElementById('pixel-board');
    for (let index = 0; index < 25; index += 1) {
     const pixels = document.createElement('div');
     pixels.className = 'pixel';
     pegandoElementoTabela.appendChild(pixels);
    }
  }
  tabela();

  function corPreta () {
    const preto = document.getElementsByClassName('color')[0];
     preto.classList.add('selected');

 }
 corPreta();

 function trocandoClasses () {
    const trocandoClasse = document.getElementById('color-palette');
    trocandoClasse.addEventListener('click', function(e){
        const pegandoClasseSelected = document.querySelector('.selected')
        pegandoClasseSelected.classList.remove('selected')
        e.target.classList.add('selected')
    })
 }
 trocandoClasses();

 function pintandoPixels () {
    const pegandoSecaoPixels = document.getElementById('pixel-board');
    pegandoSecaoPixels.addEventListener('click', function(elementos){
        elementos.target.style.backgroundColor = document.getElementsByClassName('selected')[0].style.backgroundColor
    })
 }
 pintandoPixels();

 const capturandoBotao = document.getElementById('clear-board');
 const capturandoPixel = document.getElementsByClassName('pixel');
function limpandoPixels () {
    capturandoBotao.addEventListener('click', () =>{
            for (let index = 0; index < capturandoPixel.length; index += 1) {
                capturandoPixel[index].style.backgroundColor = 'white';
            }
    })
}
limpandoPixels();

if (localStorage.getItem('colorPalette') !== null){
    document.getElementsByClassName('color')[1].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[0],
    document.getElementsByClassName('color')[2].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[1],
    document.getElementsByClassName('color')[3].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[2]
}
}

let savedBoard = [];
const pixels = document.getElementById('pixel');
  function saveBoard() {
    for (let index = 0; index < pixels.length; index += 1) {
      savedBoard[index] = 'white';
      pixels[index].addEventListener('click', function () {
        savedBoard[index] = pixels[index].style.backgroundColor;
        localStorage.setItem('pixelBoard', JSON.stringify(savedBoard));
      });
    }
  }

  function loadBoard() {
    savedBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    if (savedBoard === null) {
      savedBoard = [];
    } else {
      for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].style.backgroundColor = savedBoard[index];
      }
    }
  }

const getVQV = document.getElementById('generate-board1');
getVQV.addEventListener('click', function () {
    const getBoardSize = document.getElementById('board-size').value;
    if (isNaN(getBoardSize)) {
        alert ('Board inválido');
    } else {
        for (let index = pixels.length - 1; index >= 0; index -= 1) {
            pixels[index].remove();
          }
    }
    pixels = getBoardSize;
    saveBoard();
    loadBoard();
})
