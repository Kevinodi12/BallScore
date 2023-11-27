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

    },
    {
      path: '/inicioNBA/',
      url: 'inicioNBA.html',
    },
    {
      path: '/partidosFutAyer/',
      url: 'partidosFutAyer.html',
    
    },
    { path: '/masInfo/',
      url: 'masInfo.html',
      
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
  //pruebaApi(fechaFormateadadiasiguiente);
  //console.log(fechaFormateadaAnterior);
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
  //llamarPartidosCopaDeLaLigaMan();
 // llamarPartidosPremierLeagueMan();
  //llamarPartidosChampionsMan();
  //llamarPartidosEuropaLeagueMan();
  //llamarCopaArgentinaMan();
  //llamarPartidosLaLigaMan();
  //llamarSerieAMan();

})


$$(document).on('page:init', '.page[data-name="inicioNBA"]', function (e) {
  llamarPartidosNBA();
//pruebaApiNBA();
})

$$(document).on('page:init', '.page[data-name="partidosFutAyer"]', function (e) {
  //llamarPartidosCopadelaligaAyer();
 // llamarPartidosChampionsAyer();
  //llamarPartidosPremierLeagueAyer();
  //llamarPartidosSerieAAyer();
  //llamarPartidosLaLigaAyer();

})


$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  $$("#boton-plegable").on("click", fnPlegartarjetas);
 // llamarPartidosChampions(fechaFormateada);
//llamarPartidosCopadelaliga(fechaFormateada);
  //llamarPartidosEuropaLeague();
  //llamarPartidosPremierLeague();
  //llamarPartidosLaLiga();
  //llamarPartidosSerieA();
  // llamarPartidosBundesliga();
  //llamarPartidosLigue1();
  llamarPartidosCopaArgentina();
  //llamarPartidosCopaLibertadores();
});

$$(document).on('page:init', '.page[data-name="masInfo"]', function (e) {


})

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
var fechaAnterior = new Date(fechaActual);
fechaAnterior.setDate(fechaAnterior.getDate() - 1);
var YYYY = fechaAnterior.getFullYear();
var MM = String(fechaAnterior.getMonth() + 1).padStart(2, '0');
var DD = String(fechaAnterior.getDate()).padStart(2, '0');

var fechaFormateadaAnterior = YYYY + '-' + MM + '-' + DD;




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


//-----------------------------------------------------------------------Partidos Fecha actual---------------------------------------------------------------------------------




//-----------------------------------------------------------------------Copa de la liga Fecha actual---------------------------------------------------------------------------------


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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }




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


//-----------------------------------------------------------------------Premier League Fecha actual---------------------------------------------------------------------------------


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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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


//-----------------------------------------------------------------------Champions League Fecha actual---------------------------------------------------------------------------------



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
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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

//-----------------------------------------------------------------------Serie A Italiana Fecha actual---------------------------------------------------------------------------------


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
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const golesLocal = matchData.goals.home != null ? matchData.goals.home : "-";
        const golesVisitante = matchData.goals.away != null ? matchData.goals.away : "-";
        const estadoPartido = matchData.fixture.status.short;
        
         
        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }

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


//-----------------------------------------------------------------------La Liga Espanola Fecha actual---------------------------------------------------------------------------------


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
        const estadoPartido = matchData.fixture.status.short;
        
         
        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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

function llamarPartidosEuropaLeague() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo6");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateada}&league=3&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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
    .catch(error => console.log('Hoy no hay partidos de Europa League ', error));

}


function llamarPartidosCopaArgentina() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo9");




  var url = `https://v3.football.api-sports.io/fixtures?date=2023-11-22&league=130&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }

        html += `
        <div id="contenedor-mas-Info">
               <a href="/masInfo/" class="button button-tonal" id="boton-masInfo"><i class="f7-icons info-icon">info_circle</i></a>
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


/*----------------------------------------------------------------------PARTIDOS DIA SIGUIENTE-------------------------------------------------------------------------------------- */

//-----------------------------------------------------------------------Copa de la Liga Fecha Manana---------------------------------------------------------------------------------




function llamarPartidosCopaDeLaLigaMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo1Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=1032&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;
        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }
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


//-----------------------------------------------------------------------Premier League Fecha Manana---------------------------------------------------------------------------------



function llamarPartidosPremierLeagueMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo2Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=39&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;
        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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



//-----------------------------------------------------------------------CHAMPIONS LEAGUE FECHA MANANA---------------------------------------------------------------------------------






function llamarPartidosChampionsMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo3Man");




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
        const estadoPartido = matchData.fixture.status.short;
        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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


//-----------------------------------------------------------------------EUROPA LEAGUE FECHA MANANA---------------------------------------------------------------------------------


function llamarPartidosEuropaLeagueMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo4Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=3&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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


function llamarPartidosLaLigaMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo5Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=140&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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


//-----------------------------------------------------------------------SERIE A ITALIANA FECHA MANANA---------------------------------------------------------------------------------


function llamarSerieAMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo6Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=135&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }

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


//-----------------------------------------------------------------------COPA ARGENTINA FECHA MANANA---------------------------------------------------------------------------------


function llamarCopaArgentinaMan() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo7Man");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadadiasiguiente}&league=130&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }

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












//----------------------------------------------------Partidos Ayer ----------------------------------------------------------------


//-----------------------------------------------------------------------COPA DE LA LIGA FECHA AYER--------------------------------------------------------------------------------


function llamarPartidosCopadelaligaAyer(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo1Ayer");




  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadaAnterior}&league=1032&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;

        if (estadoPartido === "NS") {
       
          horaYMinutos;
        } else if (estadoPartido === "1H") {
      
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {
          
          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {
        
          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }

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


//-----------------------------------------------------------------------CHAMPIONS LEAGUE FECHA AYER--------------------------------------------------------------------------------




function llamarPartidosChampionsAyer(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo2Ayer");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadaAnterior}&league=2&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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



function llamarPartidosPremierLeagueAyer(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo3Ayer");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadaAnterior}&league=39&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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



function llamarPartidosSerieAAyer(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo4Ayer");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadaAnterior}&league=135&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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




function llamarPartidosLaLigaAyer(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchInfo5Ayer");

  var url = `https://v3.football.api-sports.io/fixtures?date=${fechaFormateadaAnterior}&league=140&season=${año}&timezone=America/Argentina/Buenos_Aires`;

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
        const estadoPartido = matchData.fixture.status.short;


        if (estadoPartido === "NS") {

          horaYMinutos;
        } else if (estadoPartido === "1H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "HT") {

          horaYMinutos = "ET";
        } else if (estadoPartido === "2H") {

          horaYMinutos = matchData.fixture.status.elapsed + "'";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }


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

  var url = `https://v2.nba.api-sports.io/games?date=2023-11-21`

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


function pruebaApiNBA() {
  var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v1.basketball.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://v1.basketball.api-sports.io/games?league=12&season=2023-2024&date=2023-11-21&timezone=America/Argentina/Buenos_Aires", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .then(data => console.log(data))
  .catch(error => console.log('error', error));
}




/* ---------------------- PARTE NBA ---------------------- */
function llamarPartidosNBA(fecha) {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v1.basketball.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  var matchInfoContainer = document.getElementById("matchNBA1");

  var url = `https://v1.basketball.api-sports.io/games?league=12&season=2023-2024&date=${fechaFormateada}&timezone=America/Argentina/Buenos_Aires`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      console.log(partidos);

      if (!partidos || partidos.length === 0) {
        // Manejar el caso en que no hay partidos
        console.error('No se encontraron partidos.');
        return;
      }

      var liga = partidos[0].league;

      let html = `
        <div class="card plegable-card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src=${liga.logo} />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
            </div>
          </div>
          <div id="plegable-contenido">
            <hr>
            <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        const estadoPartido = matchData.status.short;
        const golesLocal = matchData.scores.home.total != null ? matchData.scores.home.total : "-";
        const golesVisitante = matchData.scores.away.total != null ? matchData.scores.away.total : "-";

        if (estadoPartido === "NS") {
          horaYMinutos;
        } else if (estadoPartido === "Q1") {
          horaYMinutos = "1Q";
        } else if (estadoPartido === "Q2") {
          horaYMinutos = "2Q";
        } else if (estadoPartido === "Q3") {
          horaYMinutos = "3Q";
        } else if (estadoPartido === "Q4") {
          horaYMinutos = "4Q";
        } else if (estadoPartido === "OT") {
          horaYMinutos = "TE";
        } else if (estadoPartido === "BT") {
          horaYMinutos = "TO";
        } else if (estadoPartido === "HT") {
          horaYMinutos = "ET";
        } else if (estadoPartido === "FT") {
          horaYMinutos = "Final";
        }
        

        html += `
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

    })
    .catch(error => console.log('error', error));
}
