// PANTALLAS
const gameScreenNode = document.querySelector("#game-screen");
const splashScreenNode = document.querySelector("#splash-screen");
const gameOverScreenNode = document.querySelector("#game-over");

// GAME BOX

const gameBoxNode = document.querySelector("#game-box");

// AUDIOS

const collisionSound = document.querySelector("#choque");
const recogerSoun = document.querySelector("#recogida");
const movingSound = document.querySelector("#movimieno");

movingSound.playbackRate = 2.0;

collisionSound.volume = 0.05;
recogerSoun.volume = 0.05;
movingSound.volume = 0.05;

// BOTONES
const startBtnNode = document.querySelector("#start-btn");
const resetBtnNode = document.querySelector("#reset-btn");
const easyModeBtn = document.querySelector("#easyMode")
const normalModeBtn = document.querySelector("#normalMode")

// ELEMENTOS DEL GAME SCREEN

const scoreNode = document.querySelector("#score");
const highscoreNode = document.querySelector("#highscore");

let score = 0;
let highscore = 0;

// VARIABLES GLOBALES

let pacmanOb = null;
let obstaculoObj = 0
let obstaculoArr = [];
//let bolaObj = null
let bolasArr = [];
let nextObst = 3;
let IntervalId1 = null;

let NormalMode = true

let bordeBox = gameBoxNode.offsetWidth;

// FUNCIONES GLOBALES

function startGame() {
  splashScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  score = 0;

  NormalMode = true

  pacmanOb = new Pacman();

  obstaculoArr = [];
  bolasArr = [];
  nextObst = 3;

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

  obstaculoObj = new Obstaculos(randomPosititioY, randomPositionX);
  // si esta en la misma posision que pancman se cambia la posicion
  while (
    pacmanOb.x < obstaculoObj.x + obstaculoObj.w &&
    pacmanOb.x + pacmanOb.w > obstaculoObj.x &&
    pacmanOb.y < obstaculoObj.y + obstaculoObj.h &&
    pacmanOb.y + pacmanOb.h > obstaculoObj.y
  ) {
    obstaculoObj.x = Math.random() * 400;
    obstaculoObj.y = Math.random() * 400;
    obstaculoObj.node.style.left = `${obstaculoObj.x}px`
    obstaculoObj.node.style.top = `${obstaculoObj.y}px` 
  } 
    obstaculoArr.push(obstaculoObj);

}

function bolasAppear() {
  let randomPosititionBolaY = Math.random() * 400;

  let randomPositionBolaX = Math.random() * 400;

  let bolaObj = new Bolas(randomPosititionBolaY, randomPositionBolaX);
  while (
    bolaObj.x < obstaculoObj.x + obstaculoObj.w &&
    bolaObj.x + bolaObj.w > obstaculoObj.x &&
    bolaObj.y < obstaculoObj.y + obstaculoObj.h &&
    bolaObj.y + bolaObj.h > obstaculoObj.y
  ) {
    bolaObj.x = Math.random() * 400;
    bolaObj.y = Math.random() * 400;
    bolaObj.node.style.left = `${bolaObj.x}px`
    bolaObj.node.style.top = `${bolaObj.y}px` 
  } 


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
      recogerSoun.play();

      // SCORE
      score++;
      scoreNode.innerText = score;

      // highscore

      if (score > highscore) highscore = score;
      highscoreNode.innerText = highscore;

      bolasArr.splice(index, 1);
      eachBola.node.remove();
      bolasAppear();

      if (scoreNode.innerText >= nextObst) {
        obstaculoAppear();
        nextObst += 3;
        pacmanOb.pacmanSpeed++;
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
  if (NormalMode){ 
  if (pacmanOb.x < 0) {
    gameOver();
  } else if (pacmanOb.x > 560) {
    gameOver();
  } 
  if (pacmanOb.y < 0) {
    gameOver();
  } else if (pacmanOb.y > 560) {
    gameOver();
  }
} else {
  if (pacmanOb.x < 0) {
    pacmanOb.x = 560
  } else if (pacmanOb.x > 560) {
    pacmanOb.x = 0
  } else if (pacmanOb.y < 0) {
    pacmanOb.y = 560
  } else if (pacmanOb.y > 560) {
    pacmanOb.y = 0
  }

}

}


function gameOver() {
  clearInterval(IntervalId1);
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  pacmanOb.node.remove();
  gameBoxNode.innerHTML = null;
  scoreNode.innerText = 0

  collisionSound.play();

  NormalMode = true
  normalModeBtn.classList.add("active")
  easyModeBtn.classList.remove("active")
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
    movingSound.play();
  } else if (event.code === "ArrowDown") {
    pacmanOb.orientacion = "abajo";
    pacmanOb.node.src = "./images/Abajo.png";
    movingSound.play();
  } else if (event.code === "ArrowLeft") {
    pacmanOb.orientacion = "izquierda";
    pacmanOb.node.src = "./images/Izquierda.png";
    movingSound.play();
  } else if (event.code === "ArrowRight") {
    pacmanOb.orientacion = "derecha";
    pacmanOb.node.src = "./images/Pacman.png";
    movingSound.play();
  }
});

resetBtnNode.addEventListener("click", () => {
  gameOverScreenNode.style.display = "none";
  startGame();
});

easyModeBtn.addEventListener("click", () => {
  NormalMode = false
  easyModeBtn.classList.add("active")
  normalModeBtn.classList.remove("active")
});

normalModeBtn.addEventListener("click", () => {
  NormalMode = true
  normalModeBtn.classList.add("active")
  easyModeBtn.classList.remove("active")
});