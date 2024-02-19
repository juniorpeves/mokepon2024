function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+1)
}
function eleccion(jugada){
    let resultado = ""
    if (jugada ==1){
        resultado = "Piedra 🪨"
    } else if(jugador == 2){
        resultado = "Papel 📰"
    } else if(jugador == 3){
        resultado = "Tijera ✂️"
    } else {
        resultado = "Mal elegido"
    }
    return resultado
}        
// 1 es piedra, 2 es papel, 3 es tijera
let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0
while(triunfos < 3 && perdidas < 3){
    pc = aleatorio(1,3)
    jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para atijera")

    alert("PC elige: " + eleccion(pc))
    alert("Tu eligeste: " + eleccion(jugador))

    // COMBATE
    if (pc == jugador){
        alert("Empate")
    } else if (jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2){
        alert("Ganaste")
        triunfos +=1
    } else {
        alert("Perdiste")
        perdidas +=1
    }        
}
if(triunfos>perdidas){
    alert("Ganaste 3 partidas")
} else{
    alert("Perdiste 3 partidas")
}

