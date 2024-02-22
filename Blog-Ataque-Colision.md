<h1 style="color: Aqua"> Mejorando la selección de ataques del enemigo en el proyecto Mokepon</h1>

En las clases de `javascript` del curso de Programación Basica, donde los mokepon [colisionan](https://platzi.com/new-home/clases/3208-programacion-basica/51944-combate-entre-mokepones-colisionados/) y pelean entre ellos. Me surgio la duda, de porque los ataques siguen siendo aleatorios, si ya tenemos un mokepon enemigo fijo. Por esa razón me tome el tiempo de mejorar el código. 

<h3 style="color:orange"> 1.- Creación de una lista de numeros desordenados para la cantidad de ataques</h3>

```javascript
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
```
<h3 style="color:orange"> 2.- Agregando funciones para que los ataques se guarden en nueva lista</h3>

```javascript
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
```
Con esto ultimo ya podemos tener almacenado en una lista los ataques del enemigo y continuamos con algunos cambios adicionales

<h3 style="color:orange"> 3.- Acomodando funciones </h3>

```javascript
function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if(e.target.textContent === '🔥'){
                ...
            }else if(e.target.textContent === '💧'){
                ...
            }else{
                ...
            }
            iniciarPelea()
        })
    })
}
```

```javascript
function iniciarPelea(){
    if (ataqueJugadorArray.length === 5){
        ataqueAleatorioEnemigo()
        combate()
    }
}
```
En mi [git-mokepon2024](https://github.com/juniorpeves/mokepon2024) esta el código completo que fue usado para este blog