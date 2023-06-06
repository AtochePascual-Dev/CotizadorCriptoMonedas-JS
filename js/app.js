// * VARIABLES
const formulario = document.querySelector('#formulario');
const selectMoneda = document.querySelector('#moneda');
const selectCriptomonedas = document.querySelector('#criptomonedas');



// * FUNCIONES
// * Obtiene las 10 criptomonedas mas importante y los añada el select
const obtenerCriptomonedas = () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      const criptomonedas = resultado.Data;
      mostrarCriptoMonedas(criptomonedas);
    })
};



// * Muestra las criptomonedas obtenidas en el select
const mostrarCriptoMonedas = (criptomonedas) => {

  //  Iteremos sobre las criptomonedas
  criptomonedas.forEach(criptomoneda => {
    const { CoinInfo } = criptomoneda;
    const { Name, FullName } = CoinInfo;
    const option = document.createElement('OPTION');

    option.textContent = FullName;
    option.value = Name;

    selectCriptomonedas.appendChild(option);
  });
};



// * Cotiza una criptomoneda
const cotizarCriptomoneda = (event) => {
  event.preventDefault();

  // obtenemos los valores de los select
  const moneda = selectMoneda.value;
  const criptomoneda = selectCriptomonedas.value;

  // Validamos la informacion
  if ([moneda, criptomoneda].includes('')) {
    mostrarAlerta('Seleccione una Moneda y Criptomoneda');
    return;
  };
}



// * Muestra una alerta en pantalla
const mostrarAlerta = (mensaje) => {
  const exiteAlerta = document.querySelector('.error');

  if (!exiteAlerta) {
    const alertaDiv = document.createElement('DIV');
    alertaDiv.textContent = mensaje;
    alertaDiv.classList.add('error');

    formulario.appendChild(alertaDiv);

    // Eliminamos la alerta
    setTimeout(() => {
      alertaDiv.remove();
    }, 2000);
  }
};


// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  obtenerCriptomonedas();
  formulario.addEventListener('submit', cotizarCriptomoneda);
});
