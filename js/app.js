// * VARIABLES
const formulario = document.querySelector('#formulario');
const selectMoneda = document.querySelector('#moneda');
const selectCriptomonedas = document.querySelector('#criptomonedas');
const divResultado = document.querySelector('#resultado');



// * FUNCIONES
// * Obtiene las 10 criptomonedas mas importante y los añada el select
const obtenerCriptomonedas = async () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  try {
    const respuesta = await fetch(URL);
    const resultado = await respuesta.json();
    const criptomonedas = resultado.Data;
    mostrarCriptoMonedas(criptomonedas);
  } catch (error) {
    console.log(error);
  }
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

  cotizar(moneda, criptomoneda);
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



// * Cotiza una criptomoneda
const cotizar = (moneda, criptomoneda) => {
  const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      const { DISPLAY } = resultado;
      const cotizacion = DISPLAY[criptomoneda][moneda]
      mostrarCotizacion(cotizacion);
    });
};



// * Muestra la cotizacion en pantalla
const mostrarCotizacion = (cotizacion) => {

  limpiarHtml();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;
  const precio = document.createElement('P');
  precio.classList.add('precio');
  precio.innerHTML = ` El precio es: <span>${PRICE}</span> `;

  const precioAlto = document.createElement('P');
  precioAlto.innerHTML = `Precio mas alto del dia <span>${HIGHDAY}</span> `;

  const precioBajo = document.createElement('P');
  precioBajo.innerHTML = `Precio mas bajo del dia <span>${LOWDAY}</span> `;

  const ultimasHoras = document.createElement('P');
  ultimasHoras.innerHTML = `Variación ultimas 24 Horas <span>${CHANGEPCT24HOUR}%</span> `;

  const ultimaActualizacion = document.createElement('P');
  ultimaActualizacion.innerHTML = `Ultima actualización <span>${LASTUPDATE}</span> `;

  divResultado.append(precio, precioAlto, precioBajo, ultimasHoras, ultimaActualizacion);
};



// * Muestra spinner
const mostrarSpinner = () => {

  limpiarHtml();

  const spinner = document.createElement('DIV');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  divResultado.appendChild(spinner);
};


// * Limpia el html previo 
const limpiarHtml = () => {
  while (divResultado.firstChild) {
    divResultado.firstChild.remove();
  }
};



// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  obtenerCriptomonedas();
  formulario.addEventListener('submit', cotizarCriptomoneda);
});

