// * VARIABLES
const formulario = document.querySelector('#formulario');
const moneda = document.querySelector('#moneda');
const criptomonedas = document.querySelector('#criptomonedas');

// * FUNCIONES
// * Obtiene las 10 criptomonedas mas importante y los añada el select
const obtenerCriptomonedas = () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      const criptomonedas = resultado.Data;
    })
};

// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  obtenerCriptomonedas();
});
