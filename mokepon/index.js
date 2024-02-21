// Importación de libreria express
const express = require('express')
// Creando aplicación (Generando instancia del servidor)
const app = express()
// Creando lista de jugadores vacio
const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
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

// Mantener escuchando las peticiones indicando un puerto
app.listen(8080, () =>{
    console.log("Servidor funcionando")
})