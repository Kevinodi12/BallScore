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
/* var settings = {
    "url": "https://v3.football.api-sports.io/leagues",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "x-rapidapi-key": "ede666ceff001501432bb2465411b1db",
      "x-rapidapi-host": "v3.football.api-sports.io"
    }, 
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  */ 

})

/* Mis funciones */

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
