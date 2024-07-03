// PANTALLAS
const gameScreenNode = document.querySelector("#game-screen");
const splashScreenNode = document.querySelector("#splash-screen");
const gameOverScreenNode = document.querySelector("#game-over");

// GAME BOX

const gameBoxNode = document.querySelector("#game-box");

// AUDIOS

const collisionSound = document.querySelector("#choque")
const recogerSoun = document.querySelector("#recogida")
const juegoSound = document.querySelector("#juego")


// BOTONES
const startBtnNode = document.querySelector("#start-btn");
const resetBtnNode = document.querySelector("#reset-btn");

// ELEMENTOS DEL GAME SCREEN

const scoreNode = document.querySelector("#score");

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

  pacmanOb = new Pacman();


  obstaculoArr = [];
  bolasArr = [];
  scoreNode.innerText = 0;
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
}

function obstaculoAppear() {
  let randomPosititioY = Math.random() * 400;

  let randomPositionX = Math.random() * 400;


  let obstaculoObj = new Obstaculos(
    randomPosititioY,
    randomPositionX
  );
  obstaculoArr.push(obstaculoObj);
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
      scoreNode.innerText++;
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
        collisionSound.play()
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
  } else if (event.code === "ArrowDown") {
    pacmanOb.orientacion = "abajo";
    pacmanOb.node.src = "./images/Abajo.png";
  } else if (event.code === "ArrowLeft") {
    pacmanOb.orientacion = "izquierda";
    pacmanOb.node.src = "./images/Izquierda.png";
  } else if (event.code === "ArrowRight") {
    pacmanOb.orientacion = "derecha";
    pacmanOb.node.src = "./images/Pacman.png";
  }
});

resetBtnNode.addEventListener("click", () => {
  gameOverScreenNode.style.display = "none";
  startGame();
});
