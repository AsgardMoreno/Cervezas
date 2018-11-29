var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'sp';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

let loginSesion = document.querySelector('.logIn');
let closeMySesion = document.querySelector('.logOut')

function Sesion(){
    firebase.auth().signInWithPopup(provider)
    .then(loginSuccesfull)
    .catch(loginError)
}

function closeSesion(){
    firebase.auth().signOut()
    loginSesion.classList.remove('hide')
}

closeMySesion.addEventListener('click', closeSesion)
loginSesion.addEventListener('click', Sesion)
console.log('ok')

let userChange= function(user){
    if (user){
        console.log("ok")
        document.querySelector(".usuario").innerHTML =
        `
        <header>Usuario: ${user.displayName}</br>
        Correo: ${user.email}
        </header>
    
        `
        //si hay
    }
    else {
        document.querySelector(".usuario").innerHTML =
        `
        
        <header>SignedOut</header>
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
    loginSesion.classList.add('hide')
}

let loginError = function(error) {
    console.log('Ocurrio un error al Inciar Sesion')
    console.log(error)
}