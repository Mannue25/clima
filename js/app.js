const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

// Función para buscar el clima.

function buscarClima(e) {
  e.preventDefault();

  //Validar la información
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }
  // consultar la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

    container.appendChild(alerta);

    //Eliminar la alerta después de 5 segundos.

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {
  const appID = "2d45840e1affecce1d2f6f1ccaac72d1";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID} `;


  //Muestra un spinner de carga

  Spinner();

  fetch(url)
    .then((res) => res.json())
    .then((datos) => {
      //Limpiar el HTML

      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("Ciudad no Encontrada");
        return;
      }

      // imprime la respuesta en el HTML.

      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const { name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinCentigrados(temp);
  const maxTemp = kelvinCentigrados(temp_max);
  const minTemp = kelvinCentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

    // Pintar la API en el Frontend

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = ` Max: ${maxTemp} &#8451`;
  tempMaxima.classList.add =('text-sm');

  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = ` Min: ${minTemp} &#8451`;
  tempMinima.classList.add('text-sm')

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  
  resultadoDiv.appendChild(nombreCiudad)
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

function kelvinCentigrados(grados) {
  return parseInt(grados - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    
    `;

    resultado.appendChild(divSpinner);
}