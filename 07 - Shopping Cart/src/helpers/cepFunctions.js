export const getAddress = async (cep) => {
  const URL_ONE = `https://cep.awesomeapi.com.br/json/${cep}`;
  const URL_TWO = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  const response = await Promise.any([
    fetch(URL_ONE),
    fetch(URL_TWO),
  ]);
  const data = await response.json();
  return data;
};

export const searchCep = async () => {
  const getCepInput = document.querySelector('.cep-input');
  const getCepArea = document.querySelector('.cart__address');
  if (getCepInput.value === '00000000') {
    getCepArea.innerText = 'CEP não encontrado';
    return;
  }
  const data = await getAddress(getCepInput.value);
  if (data.state === undefined) {
    getCepArea.innerText = 'CEP não encontrado';
  } else {
    const { city, state, district, address } = data;
    getCepArea.innerText = `${address} - ${district} - ${city} - ${state}`;
  }
};
