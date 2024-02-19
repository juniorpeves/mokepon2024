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
let mokepones = []
let ataqueJugadorArray = []
let ataquesMokeponEnemigo
let ataqueEnemigoArray = []
let resultRound
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let opcionDeMokepones

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

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        // Creación de punto 0 para el mokepon
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        // Creación de la imagen en lienzo
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

// Objetos Instancias - desde una clase
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp', 5)

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

mokepones.push(hipodoge, capipepo, ratigueya)

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
}

function seleccionMascotaJugador(){
    // Bloqueando secciones
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'

    // Desbloqueando seccion de mapa y dibujando en el linezo
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    // Escuchando cuando las mascotas han sido eleccionadas con checked
    if(inputHipodoge.checked){
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
    extraerAtaques(mascotaJugador)
    seleccionMascotaEnemigo()
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
                console.log(ataqueJugadorArray)
                boton.style.background='#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugadorArray.push('Water')
                console.log(ataqueJugadorArray)
                boton.style.background='#112f58'
                boton.disabled = true
            }else{
                ataqueJugadorArray.push('Grass')
                console.log(ataqueJugadorArray)
                boton.style.background='#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length-1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigoArray.push('Fire')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigoArray.push('Water')
    } else {
        ataqueEnemigoArray.push('Grass')
    }
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugadorArray.length === 5){
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

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+1)
}

function pintarPersonaje(){
    capipepo.x = capipepo.x + capipepo.velocidadX
    capipepo.y = capipepo.y + capipepo.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

function moverUp(){
    capipepo.velocidadY = -5
}
function moverDown(){
    capipepo.velocidadY = 5
}
function moverLeft(){
    capipepo.velocidadX = -5
}
function moverRight(){
    capipepo.velocidadX = 5
}

function detenerMovimiento(){
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
}

function sePreiosonoUnaTecla(event){
    switch (event.key) {
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
    intervalo = setInterval(pintarPersonaje, 50)
    // Escuchando los eventos de teclado
    window.addEventListener('keydown', sePreiosonoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)

}

window.addEventListener('load', iniciarJuego)