//! Variaveis Globais.
//* Variveis para validação do login do header.
const getEmail = document.getElementById('email');
const getPassword = document.getElementById('password');
const getButtonEntrar = document.querySelector('.login-button');
//* Variaveis do contador do textarea.
const getTextArea = document.getElementById('textarea');
const getCounter = document.getElementById('counter');
//* Variaveis da validação e do botão de enviar.
const getChecked = document.getElementById('agreement');
const getBtn = document.getElementById('submit-btn');
//* Variaveis para retornar os dados digitados do formulário.
const getForm = document.getElementById('evaluation-form');
const getName = document.getElementById('input-name');
const getLastName = document.getElementById('input-lastname');
const getInputEmail = document.getElementById('input-email');
const getHouse = document.getElementById('house');
const getFamily = document.querySelectorAll('input[name="family"]');
const getTechnologies = document.querySelectorAll('input[class="subject"]');
const getEvaluation = document.querySelectorAll('input[name="rate"]');

//! Função de erro do header.
function loginError() {
  getButtonEntrar.addEventListener('click', () => {
    const valorEmail = getEmail.value;
    const valorPassword = getPassword.value;

    if (valorEmail === 'tryber@teste.com' && valorPassword === '123456') {
      alert('Olá, Tryber!');
    } else {
      alert('Email ou senha inválidos.');
    }
  });
}

//! Função de contador do Textarea.
const getTextAreaLimit = getTextArea.maxLength;
getCounter.innerHTML = getTextAreaLimit;
function counter() {
  const max = getTextAreaLimit;
  const count = max - getTextArea.value.length;
  getCounter.innerHTML = count;
}
getTextArea.addEventListener('input', counter);
// getTextArea.addEventListener('keyup', () => {
//   getCounter.innerHTML = 500 - getTextArea.value.length;
// });

//! Função para habilitar botão de enviar.
function checkButton() {
  getBtn.disabled = true;
  getChecked.addEventListener('click', () => {
    if (getBtn.disabled === true) {
      getBtn.disabled = false;
    } else {
      getBtn.disabled = true;
    }
  });
}

//! Função para enviar formulário.
function createNewForm(objectValue) {
  const getSectionForm = document.getElementById('form-data');
  for (let index = 0; index < objectValue.length; index += 1) {
    const span = document.createElement('span');
    span.innerHTML = `${objectValue[index]}`;
    getSectionForm.appendChild(span);
  }
}

//* Função para pegar o input da familia.
function inputFamily() {
  let nameFamily = '';
  for (let index = 0; index < getFamily.length; index += 1) {
    if (getFamily[index].checked) {
      nameFamily = getFamily[index].value;
    }
  }
  return nameFamily;
}

//* Função para pegar o input de conteúdos.
function inputTechnologies() {
  const technologiesOptions = [];
  for (let index = 0; index < getTechnologies.length; index += 1) {
    if (getTechnologies[index].checked) {
      technologiesOptions.push(getTechnologies[index].value);
    }
  }
  return technologiesOptions.join(', ');
}

//* Função pera pegar o input de avaliação;
function inputEvaluation() {
  let evaluationValue = '';
  for (let index = 0; index < getEvaluation.length; index += 1) {
    if (getEvaluation[index].checked) {
      evaluationValue = getEvaluation[index].value;
    }
  }
  return evaluationValue;
}

//* Evento para gerar o objeto do novo formulário.
getForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const objectValue = [
    'Obrigado por enviar seus dados.',
    `Nome: ${getName.value} ${getLastName.value}`,
    `Email: ${getInputEmail.value}`,
    `Casa: ${getHouse.value}`,
    `Família: ${inputFamily()}`,
    `Matérias: ${inputTechnologies()}`,
    `Avaliação: ${inputEvaluation()}`,
    `Observações: ${getTextArea.value}`,
  ];
  createNewForm(objectValue);
  getForm.style.display = 'none';
});

//! Chamada de funções.
loginError();
checkButton();
