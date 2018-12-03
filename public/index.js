var usuarioActivo = null;

function inicioDeSesion(){   
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
    loginSesion.classList.remove('esconder')
    closeMySesion.classList.add('esconder')
    
}

closeMySesion.addEventListener('click', closeSesion)
loginSesion.addEventListener('click', Sesion)
console.log('ok')

let userChange= function(user){
  
    if (user){
        inicio = console.log("ok")
        document.querySelector(".usuario").innerHTML =
        `
        <p class="userInfo">Bienvenido ${user.displayName}</br>
        Correo: ${user.email}
        </p>
        <img src='${user.photoURL}' class="imgUsuario">
    
        `
        loginSesion.classList.add('esconder')
        closeMySesion.classList.remove('esconder')
        usuarioActivo = true; 
    }
    else {
        document.querySelector(".usuario").innerHTML =
        `
        <header>SignedOut</header>
        `
        usuarioActivo = false;
    }
comprobarUsuario()
console.log('Cambio de Usuario...')
console.log(user)
}

firebase.auth().onAuthStateChanged(userChange)


let loginSuccesfull= function(resultado){
    console.log('Login con exito')
    console.log(resultado)
    
}

let loginError = function(error){
    console.log('Ocurrio un error al Inciar Sesion')
    console.log(error)
}

}


function comprobarUsuario(){
        
    if (usuarioActivo == true){
        
        document.querySelector('.Slogin').classList.remove('hide2');
        document.querySelector('.menuOptions').classList.remove('hide2');
        document.getElementById('cerveza');
        cerveza.style.width = (7 * 6.2) + "em";
    }
    if (usuarioActivo !== true){
        document.querySelector('.Slogin').classList.add('hide2');
        document.querySelector('.menuOptions').classList.add('hide2');

    }
}
inicioDeSesion()
console.log('esta conectado el usuario?  '+ usuarioActivo)


