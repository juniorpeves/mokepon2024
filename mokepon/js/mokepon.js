const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const buttonMascotaJugador = document.getElementById('buttonMascota')
const buttonReset = document.getElementById('button-reset')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascotaJugador')
const spanMascotaEnemigo = document.getElementById('mascotaEnemigo')

const spanVidasJugador = document.getElementById('vidasJugador')
const spanVidasEnemigo = document.getElementById('vidasEnemigo')
// Creando variable  por elemento ID del html
const sectionMensajes = document.getElementById('resultado')
const ataquesDeJugador = document.getElementById('ataques-del-jugador')
const ataquesDeEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

// Variables globales
let jugadorId = null            // ID del jugador
let mokepones = []
let ataqueJugadorArray = []
let ataquesMokeponEnemigo
let ataqueEnemigoArray = []
let resultRound
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mJugadorObjeto
let opcionDeMokepones

let arrayX

// Declarando variables para botones que aun no existen
let buttonFire
let buttonWater
let buttonGrass
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let vidasEnemigo = 0
let vidasJugador = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        // Creación de punto 0 para el mokepon
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        // Creación de la imagen en lienzo
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    // Convirtiendo el drawImage en metodo de la clase
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

// Objetos Instancias - desde una clase
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png')
// Creación de enemigos
let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.png')

// Objetos Literales - desde un push
hipodoge.ataques.push(
    {nombre: '💧', id: 'buttonWater'},
    {nombre: '💧', id: 'buttonWater'},
    {nombre: '💧', id: 'buttonWater'},
    {nombre: '🔥', id: 'buttonFire'},
    {nombre: '🪴', id: 'buttonGrass'},    
)
ratigueya.ataques.push(
    {nombre: '🔥', id: 'buttonFire'},
    {nombre: '🔥', id: 'buttonFire'},
    {nombre: '🔥', id: 'buttonFire'},
    {nombre: '💧', id: 'buttonWater'},   
    {nombre: '🪴', id: 'buttonGrass'},    
)
capipepo.ataques.push(
    {nombre: '🪴', id: 'buttonGrass'},    
    {nombre: '🪴', id: 'buttonGrass'},    
    {nombre: '🪴', id: 'buttonGrass'},    
    {nombre: '💧', id: 'buttonWater'},
    {nombre: '🔥', id: 'buttonFire'},    
)
hipodogeEnemigo.ataques.push(
    {nombre: '💧', id: 'buttonWater'}, {nombre: '💧', id: 'buttonWater'}, {nombre: '💧', id: 'buttonWater'}, 
    {nombre: '🔥', id: 'buttonFire'}, {nombre: '🪴', id: 'buttonGrass'}, 
)
ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id: 'buttonFire'}, {nombre: '🔥', id: 'buttonFire'}, {nombre: '🔥', id: 'buttonFire'},
    {nombre: '💧', id: 'buttonWater'}, {nombre: '🪴', id: 'buttonGrass'},    
)
capipepoEnemigo.ataques.push(
    {nombre: '🪴', id: 'buttonGrass'}, {nombre: '🪴', id: 'buttonGrass'}, {nombre: '🪴', id: 'buttonGrass'},
    {nombre: '💧', id: 'buttonWater'}, {nombre: '🔥', id: 'buttonFire'},    
)

mokepones.push(hipodoge, capipepo, ratigueya)

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1))
}

function iniciarJuego(){
    // Ocultando la Selección y el Mapa
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    // Iterando el arreglo para mostrar los mokepones
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} >
        </label>
        `
        // inner de cada iteración
        contenedorTarjetas.innerHTML += opcionDeMokepones
        // Buscando los ID para inyectar a las variables
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')

    })
    // Ocultando la seleeción de reiniciar
    sectionReiniciar.style.display = 'none'
    // Escuchando si se hizo click al boton de Seleccionar Mascota
    buttonMascotaJugador.addEventListener('click', seleccionMascotaJugador)
    buttonReset.addEventListener('click',resetGame)
    
    unirseAlJuego()
}

function unirseAlJuego(){
    // Llamadas al servidor hacia que URI
    fetch("http://localhost:8080/unirse")
        .then(function(res){                    // Manipulación de respuesta con .then 
            if(res.ok){                         // Consulta si la petición salio bien
                res.text()
                    .then(function(respuesta){  // Respuesta lista para utilizar
                        console.log(respuesta)
                        jugadorId = respuesta   // Asignando ID a la variable jugadorID
                    })
            }
        })
}

function seleccionarMokepon(mascotaJugador){        //Envio de información al BACKEND, usando POST
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'        // Bloqueando secciones
    if(inputHipodoge.checked){                              // Escuchando cuando las mascotas han sido eleccionadas con checked
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else { 
        alert("Debes seleccionar una mascota")
    }
    seleccionarMokepon(mascotaJugador)

    // Desbloqueando seccion de mapa y dibujando en el linezo
    sectionVerMapa.style.display = 'flex'
    extraerAtaques(mascotaJugador)
    iniciarMapa()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }       
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        opcionAtaques = `
        <button id=${ataque.id} class="button-attack BAtaque">${ataque.nombre}</button>
        `
        // inner de cada iteración
        contenedorAtaques.innerHTML += opcionAtaques
    })

    buttonFire = document.getElementById('buttonFire')
    buttonWater = document.getElementById('buttonWater')
    buttonGrass = document.getElementById('buttonGrass')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if(e.target.textContent === '🔥'){
                ataqueJugadorArray.push('Fire')
                boton.style.background='#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugadorArray.push('Water')
                boton.style.background='#112f58'
                boton.disabled = true
            }else{
                ataqueJugadorArray.push('Grass')
                boton.style.background='#112f58'
                boton.disabled = true
            }
            iniciarPelea()
        })
    })
}

function seleccionMascotaEnemigo(enemigoSeleccionado){
    spanMascotaEnemigo.innerHTML = enemigoSeleccionado.nombre
    ataquesMokeponEnemigo = enemigoSeleccionado.ataques
    secuenciaAtaque()
}

function arrayAtaqueAleatorio(){
    let array = [0,1,2,3,4]
    let arrayN = []

    while (array.length !== arrayN.length) {
        arrayN.push(aleatorio(0,4))
        const coleccion = new Set(arrayN)
        let result = [...coleccion]  
        arrayN = result
    }
    return arrayN
}

function devolverAtaque(enemigo){
    let eeee = []
    for (let i = 0; i < enemigo.length; i++) {
        eeee.push(enemigo[i]['nombre'])
    }
    return eeee
}

function ataqueAleatorioEnemigo(){
    arrayX = arrayAtaqueAleatorio()
    let ataques = devolverAtaque(ataquesMokeponEnemigo)
    for (let i = 0; i < arrayX.length; i++){ 
        if ( ataques[arrayX[i]] == '💧') {
            ataqueEnemigoArray.push('Water')        
        } else if (ataques[arrayX[i]] == '🔥') {
            ataqueEnemigoArray.push('Fire')        
        } else if (ataques[arrayX[i]] == '🪴') {
            ataqueEnemigoArray.push('Grass')        
        }    
    }
}

function iniciarPelea(){
    if (ataqueJugadorArray.length === 5){
        ataqueAleatorioEnemigo()
        combate()
    }
}

function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataqueJugadorArray[jugador]
    indexAtaqueEnemigo = ataqueEnemigoArray[enemigo]
}

function combate(){
    for (let i = 0; i < ataqueJugadorArray.length; i++) {
        if (ataqueJugadorArray[i] == ataqueEnemigoArray[i]){
            indexAmbosOponente(i, i)
            crearMensaje('Empate')
        } else if (ataqueJugadorArray[i] == 'Fire' && ataqueEnemigoArray[i] == 'Grass' || ataqueJugadorArray[i] == 'Water' && ataqueEnemigoArray[i] == 'Fire' || ataqueJugadorArray[i] == 'Grass' && ataqueEnemigoArray[i] == 'Water'){
            indexAmbosOponente(i, i)
            crearMensaje('Ganaste')
            vidasJugador +=1
            spanVidasJugador.innerHTML = vidasJugador
        } else{
            indexAmbosOponente(i, i)
            crearMensaje('Perdiste')
            vidasEnemigo +=1
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas(){
    if (vidasJugador == vidasEnemigo){
        crearMensajeFinal("Empate")
    } else if (vidasJugador > vidasEnemigo){
        crearMensajeFinal("Felicitaciones! ganaste 🎊")
    } else {
        crearMensajeFinal("Lo siento, perdiste")
    }
}

function crearMensaje(mensaje){
    // Creando parrafo por ataque
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    // Haciendo el inner en cada variable
    sectionMensajes.innerHTML = mensaje
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDeJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDeEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFInal){
    //  Habilitando boton de Reiniciar
    sectionReiniciar.style.display = 'block'
    // Posición final para que cumplan el bloqueo de ataques
    sectionMensajes.innerHTML = resultadoFInal
}

function resetGame(){
    location.reload()
}

function pintarCanvas(){
    mJugadorObjeto.x = mJugadorObjeto.x + mJugadorObjeto.velocidadX
    mJugadorObjeto.y = mJugadorObjeto.y + mJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mJugadorObjeto.pintarMokepon()

    enviarPosicion(mJugadorObjeto.x, mJugadorObjeto.y)

    // Instanciando los mokepones en el mapa
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    // Condicional para revisar colision cuando hay velocidad
    if(mJugadorObjeto.velocidadX !== 0 || mJugadorObjeto.velocidadY !== 0){
        revisionColisionX()
    }
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function revisionColisionX(){
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
}

function moverUp(){     mJugadorObjeto.velocidadY = -5}
function moverDown(){   mJugadorObjeto.velocidadY = 5 }
function moverLeft(){   mJugadorObjeto.velocidadX = -5}
function moverRight(){  mJugadorObjeto.velocidadX = 5}

function moverUpTab(){      mJugadorObjeto.y = mJugadorObjeto.y - 5; revisionColisionX()}
function moverDownTab(){    mJugadorObjeto.y = mJugadorObjeto.y + 5; revisionColisionX()}
function moverRightTab(){   mJugadorObjeto.x = mJugadorObjeto.x + 5; revisionColisionX()}
function moverLeftTab(){    mJugadorObjeto.x = mJugadorObjeto.x - 5; revisionColisionX()}

function stopMove(){
    mJugadorObjeto.velocidadX = 0
    mJugadorObjeto.velocidadY = 0
}

function sePreiosonoUnaTecla(e){
    switch (e.key) {
        case 'ArrowUp':
            moverUp()
            break;
        case 'ArrowDown':
            moverDown()
            break;
        case 'ArrowLeft':
            moverLeft()
            break;
        case 'ArrowRight':
            moverRight()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    // Obtener que mascota fue seleccionada para el lienzo
    mJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    // Escuchando cuando se presiona y se suleta la tecla
    window.addEventListener('keydown', sePreiosonoUnaTecla)
    window.addEventListener('keyup', stopMove)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }       
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = mJugadorObjeto.y
    const abajoMascota = mJugadorObjeto.y + mJugadorObjeto.alto
    const derechaMascota = mJugadorObjeto.x + mJugadorObjeto.ancho
    const izquierdaMascota = mJugadorObjeto.x
    
    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo || 
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    // Deteniendo el movimiento, mostrando la seleccion de ataques y ocultando el mapa
    stopMove()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionMascotaEnemigo(enemigo)
    
}

window.addEventListener('load', iniciarJuego)