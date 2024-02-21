// Importación de libreria express
const express = require('express')
// Creando aplicación (Generando instancia del servidor)
const app = express()

// Función por solicitud de cliente
app.get("/", (req, res)=>{
    res.send("Hola")
})

// Mantener escuchando las peticiones indicando un puerto
app.listen(8080, () =>{
    console.log("Servidor funcionando")
})


