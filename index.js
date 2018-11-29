var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

let loginSesion = document.querySelector('.login');

function Sesion(){
    firebase.auth().signInWithPopup(provider)
    .then(loginSuccesfull)
    .catch(loginError)
}

function closeSesion(){
    firebase.auth().signOut()
}

closeMySesion.addEventListener('click', closeSesion)
loginSesion.addEventListener('click', Sesion)
console.log('ok')

let userChange= function(user){
    if (user){
        console.log("ok")
        document.querySelector(".suarios").innerHTML =
        `
        <h2>Usuario: ${user.displayName}</h2>
        <h3>Correo: ${user.email}</h3>
        `
        //si hay
        q
    }
    else {
        document.querySelector(".suarios").innerHTML =
        `
        
        <h3>SignedOut</h3>
        `
        //no hay
    }
console.log('Cambio de Usuario...')
console.log(user)
}

firebase.auth().onAuthStateChanged(userChange)

//Iniciar Sesion

let loginSuccesfull= function(resultado){
    console.log('Login con exito')
    console.log(resultado)
}

let loginError = function(error) {
    console.log('Ocurrio un error al Inciar Sesion')
    console.log(error)
}