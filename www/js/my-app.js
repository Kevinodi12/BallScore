// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [{
      path: '/about/',
      url: 'about.html',
    },
    {
      path: '/login/',
      url: 'login.html',
    },
    {
      path: '/registro/',
      url: 'registro.html',
    },
    {
      path: '/inicio/',
      url: 'inicio.html',

    },
    {
      path: '/registroFin/',
      url: 'registroFin.html',
    },
    {
      path: '/partidosFutMan/',
      url: 'partidosFutMan.html',
    }

  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
 pruebaApi(fechaFormateadadiasiguiente);
})


$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$("#btnInicioSesion").on("click", fnIniciarSesion);

})


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$("#btnRegistrar").on("click", fnRegistro);

})

$$(document).on('page:init', '.page[data-name="registroFin"]', function (e) {})


$$(document).on('page:init', '.page[data-name="about"]', function (e) {

})



$$(document).on('page:init', '.page[data-name="partidosFutMan"]', function (e) {
  llamarPartidosChampionsMan();
})



$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  $$("#boton-plegable").on("click", fnPlegartarjetas);
 // llamarPartidosChampions(fechaFormateada);
  //llamarPartidosCopadelaliga(fechaFormateada);
  // llamarPartidosPremierLeague();
  //llamarPartidosLaLiga();
  //llamarPartidosSerieA();
  // llamarPartidosBundesliga();
  //llamarPartidosLigue1();
  //llamarPartidosCopaArgentina();
  //llamarPartidosCopaLibertadores();
 
});

/*Variables Globales*/

const apiKey = '71755f9287199e45805472d2ecbdaa14';
var email, clave, nombre, apellido, numeroTelefono;
var db = firebase.firestore();
var colUsuarios = db.collection("Usuarios");

// Variables Fechas
var fechaActual = new Date();
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1;
var año = fechaActual.getFullYear();
var fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
var fechaSiguiente = new Date();
fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

var yyyy = fechaSiguiente.getFullYear();
var mm = String(fechaSiguiente.getMonth() + 1).padStart(2, '0');
var dd = String(fechaSiguiente.getDate()).padStart(2, '0');

var fechaFormateadadiasiguiente = yyyy + '-' + mm + '-' + dd;

console.log(fechaFormateadadiasiguiente);




/* Mis funciones */

function fnPlegartarjetas() {
  var $contenidoPlegable = $$(this).closest(".card").find("#plegable-contenido");

  if ($contenidoPlegable.hasClass("plegable-content")) {
    $contenidoPlegable.removeClass("plegable-content").addClass("desplegable-content");
  } else if ($contenidoPlegable.hasClass("desplegable-content")) {

    $contenidoPlegable.removeClass("desplegable-content").addClass("plegable-content");
  }
}





// Funcion de inicio de sesion

function fnIniciarSesion() {
  email = $$("#loginEmail").val();
  clave = $$("#loginClave").val();

  if (email != "" && clave != "") {


    firebase.auth().signInWithEmailAndPassword(email, clave)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        console.log("Bienvenid@!!! " + email);

        mainView.router.navigate('/inicio/');
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);
      });




  }
}


//Funcion de registro

function fnRegistro() {
  var nombre = $$("#nombreRegistro").val();
  var apellido = $$("#apellidoRegistro").val();
  var email = $$("#emailRegistro").val();
  var clave = $$("#claveRegistro").val();
  var telefono = $$("#celularRegistro").val();

  if (email != "" && clave != "") {
    firebase.auth().createUserWithEmailAndPassword(email, clave)
      .then((userCredential) => {
 
        var user = userCredential.user;
        console.log("¡Bienvenid@!!! " + email);

    
        if (nombre != "" && telefono != "") {
          var datos = {
            nombre: nombre,
            email: email,
            apellido: apellido,
            numeroTelefono: telefono
          };

    
          var colUsuarios = firebase.firestore().collection("Usuarios");

         
          colUsuarios.doc(email).set(datos)
            .then(function () {
              console.log("Datos del usuario agregados a Firestore.");
              mainView.router.navigate('/registroFin/');
            })
            .catch(function (error) {
              console.error("Error al agregar datos del usuario a Firestore: ", error);
            });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          console.error("El correo electrónico ya está en uso.");
        }
      });
  }
}






//LLama partidos del fixture de la copa de la liga y datos de la liga


function llamarPartidosCopadelaliga(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fecha}&league=1032&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;


        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";
        html += `
        <div id="contenedor-mas-Info">
               <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
            </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}

function llamarPartidosPremierLeague() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo2");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateada}&league=39&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";


        html += `
        <div id="contenedor-mas-Info">
        <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
     </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}





//Llama partidos del fixture de la champions del dia y datos de la liga

function llamarPartidosChampions(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo3");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fecha}&league=2&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";

        html += `
        <div id="contenedor-mas-Info">
        <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
     </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}


function llamarPartidosSerieA() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo4");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateada}&league=135&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";

        html += `
        <div id="contenedor-mas-Info">
        <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
     </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}


function llamarPartidosLaLiga() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo5");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateada}&league=140&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";


        html += `
        <div id="contenedor-mas-Info">
        <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
     </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}



/*PARTIDOS DIA SIGUIENTE */

function llamarPartidosChampionsMan(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo1Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=2&season=${año}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
              <button id="boton-plegable" class="button button-fill boton-plegable-header">
                <i class="f7-icons">chevron_down</i>
              </button>
            </div>
          </div>
          <div id="plegable-contenido" class="plegable-content" style="display: none;">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;


        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";
        html += `
        <div id="contenedor-mas-Info">
               <button class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></button>
            </div>
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src=${matchData.teams.home.logo} id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${golesLocal}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src=${matchData.teams.away.logo} id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${golesVisitante}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `
            </div>
          </div>
        </div>
      `;

      let card = document.createElement('div');
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);

      const botonPlegable = card.querySelector("#boton-plegable");
      const contenidoPlegable = card.querySelector("#plegable-contenido");

      botonPlegable.addEventListener("click", () => {
        if (contenidoPlegable.style.display === "none") {
          contenidoPlegable.style.display = "block";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_up</i>';
        } else {
          contenidoPlegable.style.display = "none";
          botonPlegable.innerHTML = '<i class="f7-icons">chevron_down</i>';
        }
      });
    })
    .catch(error => console.log('error', error));
}




// Funcion de prueba

function pruebaApi(fecha) {
  
var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=2&season=${año}&timezone=America/Argentina/Buenos_Aires`
  
  fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });

}