// Importación de libreria express
const express = require('express')
const cors = require('cors')
// Creando aplicación (Generando instancia del servidor)
const app = express()

app.use(cors())         // Deshabilita los errores relacionados con cors
app.use(express.json()) // Habilitar recibir peticiones POST en *.json

const jugadores = []    // Creando lista de jugadores vacio

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){    // Metodo para asignar mokepon a jugador
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res)=>{        // Servicio solicitud de cliente GET
    const id = `${Math.random()}`       // Creando ID aleatorio (número convertido a cadena de texto)
    const jugador = new Jugador(id)     // Creando jugador 
    jugadores.push(jugador)             // Agregando id de jugador en lista
    res.setHeader("Access-Control-Allow-Origin", "*")   // Permitiendo llamadas desde cualquier origen
    res.send(id)
})

app.post("/mokepon/:jugadorId",(req, res)=>{        // Servicio para identiicar usuario (Por ID) POST
    const jugadorId = req.params.jugadorId || ""
    const nombreMokepon = req.body.mokepon || ""
    const mokepon = new Mokepon(nombreMokepon)      // Creación de objeto tipo Mokepon

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)  //Buscando jugadorId en la lista de jugadores

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end() // Servicio finalizado
})

app.post("/mokepon/:jugadorId/posicion",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || ""
    const y = req.body.y || ""

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)  //Buscando jugadorId en la lista de jugadores

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }
    
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques",(req, res)=>{        // Servicio para identiicar usuario (Por ID) POST
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)  //Buscando jugadorId en la lista de jugadores

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end() // Servicio finalizado
})

// Mantener escuchando las peticiones indicando un puerto
app.listen(8080, () =>{
    console.log("Servidor funcionando")
})