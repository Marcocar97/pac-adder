// PANTALLAS
const gameScreenNode = document.querySelector("#game-screen")
const splashScreenNode = document.querySelector("#splash-screen")

// GAME BOX

const gameBoxNode = document.querySelector("#game-box")

// BOTONES
const startBtnNode = document.querySelector("#start-btn")

// ELEMENTOS DEL GAME SCREEN

const scoreNode = document.querySelector("#score")

// VARIABLES GLOBALES

let pacmanOb = null
let obstaculoObj = null
let bolaObj = null
let bolasArr = []

// FUNCIONES GLOBALES 

function startGame() {


    splashScreenNode.style.display = "none"

    gameScreenNode.style.display = "flex"

    pacmanOb = new Pacman()

    bolasAppear()
    


    setInterval (() => {
        gameLoop()


    }, Math.round(1000/60))


    



}

function gameLoop(){

pacmanOb.movimientoInicial()
bolaCollision()
bolaDissapear()
obstaculoAppear()
}


function obstaculoAppear(){

    let randomPosititioY = Math.random() * 720

    let randomPositionX = Math.random() * 740

    let distanciaEntreObstaculos = 100

    if(scoreNode.innerText > "2" && scoreNode.innerText % 2){
        obstaculoObj = new Obstaculos(randomPosititioY + distanciaEntreObstaculos, randomPositionX )}
    

}

function bolasAppear(){

    let randomPosititionBolaY = Math.random() * 720

    let randomPositionBolaX = Math.random() * 740

    let distanciaEntreBolas = 100

    bolaObj = new Bolas(randomPosititionBolaY + distanciaEntreBolas, randomPositionBolaX )
    bolasArr.push(bolaObj)

}

function bolaCollision (){

    if (pacmanOb.x < bolaObj.x + bolaObj.w &&
        pacmanOb.x + pacmanOb.w > bolaObj.x &&
        pacmanOb.y < bolaObj.y + bolaObj.h &&
        pacmanOb.y + pacmanOb.h > bolaObj.y){

            scoreNode.innerText ++
            bolasAppear()
        
    } 
}

function bolaDissapear (){
    let firstBola = bolasArr[0]

    if (pacmanOb.x < firstBola.x + firstBola.w &&
        pacmanOb.x + pacmanOb.w > firstBola.x &&
        pacmanOb.y < firstBola.y + firstBola.h &&
        pacmanOb.y + pacmanOb.h > firstBola.y){
        bolasArr.shift()
        firstBola.node.remove()
        
    }
}



// GAME LOOP INTERVAL


// EVENT LISTENERS

startBtnNode.addEventListener("click", () =>{
    startGame()
})

gameBoxNode.addEventListener("click", () => {
pacmanOb.movimientoHaciaTop()
} )

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp"){
        pacmanOb.movimientoHaciaTop()
    }
})

gameBoxNode.addEventListener("click", () => {
    pacmanOb.movimientoHaciaBottom()
    } )
    
    window.addEventListener("keydown", (event) => {
        console.log(event.code)
        if (event.code === "ArrowDown"){
            pacmanOb.movimientoHaciaBottom()
        }
    })

    gameBoxNode.addEventListener("click", () => {
        pacmanOb.movimientoHaciaLeft()
        } )
        
        window.addEventListener("keydown", (event) => {
            console.log(event.code)
            if (event.code === "ArrowLeft"){
                pacmanOb.movimientoHaciaLeft()
            }
        })