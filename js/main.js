// PANTALLAS
const gameScreenNode = document.querySelector("#game-screen");
const splashScreenNode = document.querySelector("#splash-screen");
const gameOverScreenNode = document.querySelector("#game-over");

// GAME BOX

const gameBoxNode = document.querySelector("#game-box");

// AUDIOS

const collisionSound = document.querySelector("#choque")
const recogerSoun = document.querySelector("#recogida")
const movingSound = document.querySelector("#movimieno")
movingSound.playbackRate = 2.0


// BOTONES
const startBtnNode = document.querySelector("#start-btn");
const resetBtnNode = document.querySelector("#reset-btn");

// ELEMENTOS DEL GAME SCREEN

const scoreNode = document.querySelector("#score");
const highscoreNode = document.querySelector("#highscore")

let score = 0
let highscore = 0


// VARIABLES GLOBALES

let pacmanOb = null;
//let obstaculoObj = null
let obstaculoArr = [];
//let bolaObj = null
let bolasArr = [];
let nextObst = 3;
let IntervalId1 = null;

let bordeBox = gameBoxNode.offsetWidth

// FUNCIONES GLOBALES

function startGame() {
  splashScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  score = 0

  pacmanOb = new Pacman();


  obstaculoArr = [];
  bolasArr = [];
  nextObst = 3

  bolasAppear();

  IntervalId1 = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));
}

function gameLoop() {
  pacmanOb.movimiento();
  bolaCollision();
  obstaculoColission();
  bordesColission();

  // VERIFICAR COLISSION
  resolveCollisions(obstaculoArr, bolasArr); 
  resolveCollisions(bolasArr, obstaculoArr); 

}



// VERIFICAR COLISION

function isColliding(obj1, obj2) { 
    if ( obj1.x < obj2.x + obj2.w && 
        obj1.x + obj1.w > obj2.x && 
        obj1.y < obj2.y + obj2.h && 
        obj1.y + obj1.h > obj2.y ) { 

obj1.x = Math.random() * 400; obj1.y = Math.random() * 400; } } 

// Función para resolver colisiones entre obstaculoArr y bolasArr 

 function resolveCollisions(arr1, arr2) { 
    arr1.forEach(obj1 => { 
        arr2.forEach(obj2 => { 
       if ( isColliding(obj1, obj2)){console.log("detectado")}; }); }); } 


// VERIFICAR COLISION


function obstaculoAppear() {
  let randomPosititioY = Math.random() * 400;

  let randomPositionX = Math.random() * 400;


  let obstaculoObj = new Obstaculos(
    randomPosititioY,
    randomPositionX
  );
  // si esta en la misma posision que panda se cambia la posicion
 if (
      pacmanOb.x < obstaculoObj.x + obstaculoObj.w &&
      pacmanOb.x + pacmanOb.w > obstaculoObj.x &&
      pacmanOb.y < obstaculoObj.y + obstaculoObj.h &&
      pacmanOb.y + pacmanOb.h >obstaculoObj.y
    ) {randomPositionX = Math.random() * 400; randomPosititioY = Math.random() * 400
    } else { 
 obstaculoArr.push(obstaculoObj)}
}

function bolasAppear() {
  let randomPosititionBolaY = Math.random() * 400;

  let randomPositionBolaX = Math.random() * 400;

  let bolaObj = new Bolas(randomPosititionBolaY, randomPositionBolaX);
  bolasArr.push(bolaObj);
}

function bolaCollision() {
  bolasArr.forEach((eachBola, index) => {
    if (
      pacmanOb.x < eachBola.x + eachBola.w &&
      pacmanOb.x + pacmanOb.w > eachBola.x &&
      pacmanOb.y < eachBola.y + eachBola.h &&
      pacmanOb.y + pacmanOb.h > eachBola.y
    ) {
        recogerSoun.play()

        // SCORE
      score++
      scoreNode.innerText = score

      // highscore

      if(score > highscore)
      highscore = score
      highscoreNode.innerText = highscore    

      bolasArr.splice(index, 1);
      eachBola.node.remove()
      bolasAppear();
      
      if (scoreNode.innerText >= nextObst) {
        obstaculoAppear();
        nextObst += 3;
        pacmanOb.pacmanSpeed++
        
      }
    }
  });
}

function obstaculoColission() {
  obstaculoArr.forEach((eachObstaculo) => {
    if (
      pacmanOb.x < eachObstaculo.x + eachObstaculo.w &&
      pacmanOb.x + pacmanOb.w > eachObstaculo.x &&
      pacmanOb.y < eachObstaculo.y + eachObstaculo.h &&
      pacmanOb.y + pacmanOb.h > eachObstaculo.y
    ) {
      gameOver();

    }
  });
}

function bordesColission() {
  if (pacmanOb.x < 0) {
    gameOver();
  } else if (pacmanOb.x > 560) {
    gameOver();
  } else if (pacmanOb.y < 0) {
    gameOver();
  } else if (pacmanOb.y > 560) gameOver();
}

function gameOver() {
  clearInterval(IntervalId1);
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  pacmanOb.node.remove();
  gameBoxNode.innerHTML = null;

  collisionSound.play()

}



// GAME LOOP INTERVAL

// EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  startGame();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    pacmanOb.orientacion = "arriba";
    pacmanOb.node.src = "./images/Arriba.png";
    movingSound.play()
  } else if (event.code === "ArrowDown") {
    pacmanOb.orientacion = "abajo";
    pacmanOb.node.src = "./images/Abajo.png";
    movingSound.play()
  } else if (event.code === "ArrowLeft") {
    pacmanOb.orientacion = "izquierda";
    pacmanOb.node.src = "./images/Izquierda.png";
    movingSound.play()
  } else if (event.code === "ArrowRight") {
    pacmanOb.orientacion = "derecha";
    pacmanOb.node.src = "./images/Pacman.png";
    movingSound.play()
  }
});

resetBtnNode.addEventListener("click", () => {
  gameOverScreenNode.style.display = "none";
  startGame();
});
