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
    routes: [
      {path: '/about/', url: 'about.html',},
      {path: '/login/', url: 'login.html',},
      {path: '/registro/', url: 'registro.html',},
      {path: '/inicio/', url: 'inicio.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {

})


$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$("#btnInicioSesion").on("click", fnIniciarSesion);

})


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {

})



$$(document).on('page:init', '.page[data-name="about"]', function (e) {

})

$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
$$("#boton-plegable").on("click", fnPlegartarjetas);
//llamarPartidosChampions();
//llamarPartidosCopadelaliga();
//llamarPartidosPremierLeague();
//pruebaApi();
});

/* Mis funciones */
const apiKey = '71755f9287199e45805472d2ecbdaa14';
var email, clave, nombre, apellido;

function fnPlegartarjetas() {
  var $contenidoPlegable = $$(this).closest(".card").find("#plegable-contenido");
  
  if ($contenidoPlegable.hasClass("plegable-content")) {
    $contenidoPlegable.removeClass("plegable-content").addClass("desplegable-content");
  } else if($contenidoPlegable.hasClass("desplegable-content")) {
    
    $contenidoPlegable.removeClass("desplegable-content").addClass("plegable-content");
  }
}


  




function fnIniciarSesion() {
  email = $$("#loginEmail").val();
  clave = $$("#loginClave").val();

  if (email!="" && clave!="") {


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


//LLama partidos del fixture de la copa de la liga y datos de la liga


function llamarPartidosCopadelaliga() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  
  var matchInfoContainer = document.getElementById("matchInfo");

  fetch("https://v3.football.api-sports.io/fixtures?date=2023-10-30&league=1032&season=2023&timezone=America/Argentina/Buenos_Aires", requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

 
      let html = `
        <div class="card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src="${liga.logo}" />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
            </div>
          </div>
          <hr>
          <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

        html += `
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src="${matchData.teams.home.logo}" id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${matchData.goals.home}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src="${matchData.teams.away.logo}" id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${matchData.goals.away}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `</div></div>`; 
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);
    })
    .catch(error => console.log('error', error));
}


function llamarPartidosPremierLeague(){
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  
  var matchInfoContainer = document.getElementById("matchInfo2");

  fetch("https://v3.football.api-sports.io/fixtures?date=2023-10-30&league=39&season=2023&timezone=America/Argentina/Buenos_Aires", requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

 
      let html = `
        <div class="card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src="${liga.logo}" />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
            </div>
          </div>
          <hr>
          <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

        html += `
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src="${matchData.teams.home.logo}" id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${matchData.goals.home}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src="${matchData.teams.away.logo}" id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${matchData.goals.away}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `</div></div>`; 
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);
    })
    .catch(error => console.log('error', error));
}





//Llama partidos del fixture de la champions del dia y datos de la liga

function llamarPartidosChampions() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

 
  var matchInfoContainer = document.getElementById("matchInfo3");

  fetch("https://v3.football.api-sports.io/fixtures?date=2023-10-30&league=2&season=2023&timezone=America/Argentina/Buenos_Aires", requestOptions)
    .then(response => response.json())
    .then(data => {
      var partidos = data.response;
      var liga = data.response[0].league;

    
      let html = `
        <div class="card">
          <div class="card-header">
            <div id="liga-nombre">
              <div id="liga-logo">
                <img id="image-logo" src="${liga.logo}" />
              </div>
              <h3 class="nombre-liga">${liga.name}</h3>
            </div>
          </div>
          <hr>
          <div class="card-content card-content-padding">
      `;

      partidos.forEach(matchData => {
        const fechaHora = new Date(matchData.fixture.date);
        const horas = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const horaYMinutos = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

        html += `
          <div class="equipo-info">
            <div id="logo-equipo1">
              <img src="${matchData.teams.home.logo}" id="equipo1-logo" class="logo-equipo1" />
            </div>
            <div id="nombre-equipo1" class="nombre-equipo">${matchData.teams.home.name}</div>
            <div id="marcador-equipo1" class="marcador-equipo1">
              <p id="goles-local">${matchData.goals.home}</p>
            </div>
          </div>
          <div class="horario-notificacion">
            <div id="horario-partido"><p id="status-partido">${horaYMinutos}</p></div>
            <div id="notificacion-desactiva-fixture"><i class="f7-icons">bell_slash</i></div>
          </div>
          <div class="equipo-info2">
            <div id="logo-equipo2">
              <img src="${matchData.teams.away.logo}" id="equipo2-logo" class="logo-equipo2" />
            </div>
            <div id="nombre-equipo2" class="nombre-equipo2">${matchData.teams.away.name}</div>
            <div id="marcador-equipo2" class="marcador-equipo2">
              <p id="goles-visitante">${matchData.goals.away}</p>
            </div>
          </div>
          <hr>
        `;
      });

      html += `</div></div>`; 
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = html;
      matchInfoContainer.appendChild(card);
    })
    .catch(error => console.log('error', error));
}









// Funcion de prueba

function pruebaApi (){
  fetch ("https://v3.football.api-sports.io/fixtures?date=2023-10-25&league=2&season=2023&timezone=America/Argentina/Buenos_Aires", {
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
