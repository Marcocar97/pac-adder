// PANTALLAS
const gameScreenNode = document.querySelector("#game-screen")
const splashScreenNode = document.querySelector("#splash-screen")
const gameOverScreenNode = document.querySelector("#game-over")

// GAME BOX

const gameBoxNode = document.querySelector("#game-box")

// BOTONES
const startBtnNode = document.querySelector("#start-btn")
const resetBtnNode = document.querySelector("#reset-btn")

// ELEMENTOS DEL GAME SCREEN

const scoreNode = document.querySelector("#score")

// VARIABLES GLOBALES

let pacmanOb = null
let obstaculoObj = null
let obstaculoArr =[]
let bolaObj = null
let bolasArr = []
let nextObst = 3

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
}


function obstaculoAppear(){

    let randomPosititioY = Math.random() * 650

    let randomPositionX = Math.random() * 650

    let distanciaEntreObstaculos = 100

        obstaculoObj = new Obstaculos(randomPosititioY + distanciaEntreObstaculos, randomPositionX )
        obstaculoArr.push(obstaculoObj)
    
}

function bolasAppear(){

    let randomPosititionBolaY = Math.random() * 650

    let randomPositionBolaX = Math.random() * 650

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
            if (scoreNode.innerText >= nextObst){
                obstaculoAppear()
                nextObst += 3
            }
    
        
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