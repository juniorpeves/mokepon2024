// Importación de libreria express
const express = require('express')
const cors = require('cors')
// Creando aplicación (Generando instancia del servidor)
const app = express()

app.use(cors())         // Deshabilita los errores relacionados con cors
app.use(express.json()) // Habilitar recibir peticiones POST en *.json

// Creando lista de jugadores vacio
const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

// Función por solicitud de cliente
app.get("/unirse", (req, res)=>{
    // Creando ID aleatorio (número convertido a cadena de texto)
    const id = `${Math.random()}`
    // Creando jugador 
    const jugador = new Jugador(id)
    // Agregando id de jugador en lista
    jugadores.push(jugador)
    // Permitiendo llamadas desde cualquier origen
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:jugadorId",(req, res)=>{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

// Mantener escuchando las peticiones indicando un puerto
app.listen(8080, () =>{
    console.log("Servidor funcionando")
})