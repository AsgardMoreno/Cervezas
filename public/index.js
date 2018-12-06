var usuarioActivo = null;
var cervezas = [];
var imagen;
let botonFile = document.getElementById('cuadroImagen')
//Firebase
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
let id = 'id' + `${Math.floor(Math.random() * (11000-1)+1)}`;
console.log(id)
let cervezaNueva;
let allInputs = document.querySelectorAll('input');
//Función reusable, se le manda el path o la ruta, los datos y el callback (el que se ejecuta una vez que la base de datos guardo los datos)
function saveData(route, data, callback){
    route = `cervezas/+${allInputs[1].value}+${allInputs[2].value}+${id}`;
    const db = firebase.database()
        cervezaNueva = {}
        cervezaNueva.imagen = allInputs[0].value,
        cervezaNueva.cerveceria = allInputs[1].value,    
        cervezaNueva.nombre = allInputs[2].value,
        cervezaNueva.estilo = allInputs[3].value,
        cervezaNueva.alcohol = allInputs[4].value,
        cervezaNueva.pais = allInputs[5].value,
        cervezaNueva.calificacion = allInputs[6].value,
        cervezaNueva.notas = allInputs[7].value
        
        
       
    data = data || cervezaNueva
    db.ref(route).set(data, callback)
    cervezaGuardada()
    
}


function cervezaGuardada(error){
    if(error){
        console.error('Nooooooo!!')
    }else{
        console.log('datos guardados')
        cerrar()
        
    }
}



//Función reusable, se le manda el path o la ruta y el callback (el que se ejecuta una vez que se response la base de datos)
function getDataFromDataBase(route, callback){
    const db = firebase.database();
    db.ref(route).once('value').then(callback);
}

//esta función se ejecuta al momento en que la base de datos regreso los datos.
function setCervezas(snapshot) {
    cervezas = snapshot.val();
    renderCervezas(cervezas);
}


function detalleCerveza(event){
    function seleccionarCerveza(){
        let deseleccion = document.querySelectorAll('.estaCerveza')
        for(z = 0; z < document.querySelectorAll('.estaCerveza').length; z++){
            deseleccion[z].classList.remove('active');
        }
        event.target.classList.toggle('active');

    }
    seleccionarCerveza()

    let cervezaActual = cervezas[event.target.dataset.id];
    console.log(cervezaActual)
    let listado = document.createElement('ul');
    var menu = document.querySelector('.writeMenu');
    Object.keys(cervezaActual).forEach( key => {
        let value = cervezaActual[key];
        if(key !== 'imagen' && key !== 'descripcion' && key !== 'nombre' && key !== 'notas' && key !== 'calificacion'){
            let li = document.createElement('li');
            li.innerText = key.toUpperCase() + ' ' + value;
            menu.appendChild(listado);
            listado.appendChild(li);
        }
    });
    //Titulo
    var h1 = document.createElement('h1');
    h1.innerText = cervezaActual.nombre;
    h1.className = 'nombre';
    
    menu.innerHTML = '';
    menu.appendChild(listado);
    menu.prepend(h1);
    //document.querySelector('.writeMenu .alcohol').innerText = cervezaActual.alcohol+' ºAlc';
}
function renderCervezas(cervezas) {
    let wrapper = document.getElementById('cerveza');
    Object.keys(cervezas).forEach( (key) => {
        var cerveza = cervezas[key];
        let div = document.createElement('div');
        div.className = 'cardName';
        let nameDiv = document.createElement('div');
        nameDiv.className = 'newDiv';
        nameDiv.innerText = cerveza.nombre;
        let img = document.createElement('img');
        img.src = cerveza.imagen;
        img.className = 'estaCerveza';
        img.dataset.id = key;
        img.addEventListener('click', detalleCerveza);
        div.appendChild(nameDiv);
        div.appendChild(img);
        wrapper.prepend(div);
    })
}
let tarjetaAgregar = function(){
    document.querySelector('.tarjeta').classList.remove('hide2');
    

    let cerrar = function(){
        for(x = 1; x < allInputs.length; x++){
            allInputs[x].value = "";
        }
        document.querySelector('.tarjeta').classList.add('hide2');
    }
    document.querySelector('.cerrar').addEventListener('click', cerrar)
    document.getElementById('agregar').addEventListener('click', saveData);
}
function mostrarImagen(){
    let file = document.getElementById('cuadroImagen').files[0];
    console.log(file)
    if (!file) return
    let reader = new FileReader()
    reader.onload = (e) => {
        document.querySelector('.muestraImagen').style
            .backgroundImage = `url('${e.target.result}')`
            
    }
    reader.readAsDataURL(file)
}
botonFile.addEventListener('change', mostrarImagen)



document.getElementById('guardar').addEventListener('click', tarjetaAgregar)


getDataFromDataBase('/cervezas/', setCervezas);

getDataFromDataBase('/cervezas/corona', function(snapshot){
    console.log(snapshot.val())
});
 
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

} //fin de funcionInicio

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


inicioDeSesion();

let filtroSelect = document.querySelectorAll('.filtro');
console.log("filtro " + filtroSelect.value)

function filtros(){
   
}
 




