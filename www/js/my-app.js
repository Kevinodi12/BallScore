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
llamarApi();
mostrarDatos();
});

/* Mis funciones */
const apiKey = '71755f9287199e45805472d2ecbdaa14';
var email, clave, nombre, apellido;

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



function llamarApi() {
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", '71755f9287199e45805472d2ecbdaa14');
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  var matchInfoContainer = document.getElementById("matchInfo");

  fetch("https://v3.football.api-sports.io/fixtures?live=all", requestOptions)
      .then(response => response.json())
      .then(data => {
      
          var partidos = data.response;

       
          partidos.forEach(matchData => {

            
              var html = `
                  <div id="liga-logo"><img src="${matchData.league.logo}" alt="Logo Liga"></div>
                  <div id="tiempo-partido">${matchData.fixture.status.elapsed}</div>
                  <div id="logo-equipo1"><img src="${matchData.teams.home.logo}" alt="Logo Equipo 1"></div>
                  <div id="nombre-equipo1">${matchData.teams.home.name}</div>
                  <div id="marcador-equipo1">${matchData.goals.home} </div>
                  <div id="logo-equipo2"><img src="${matchData.teams.away.logo}" alt="Logo Equipo 2"></div>
                  <div id="nombre-equipo2">${matchData.teams.away.name}</div>
                  <div id="marcador-equipo2">${matchData.goals.away} </div>
              `;

              
              var card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = html;
              matchInfoContainer.appendChild(card);
          });
      })
      .catch(error => console.log('error', error));
}





