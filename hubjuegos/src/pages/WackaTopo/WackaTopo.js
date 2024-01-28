// Se importan los datos del archivo CSS.

import "./WackaTopo.css";

//? -----------------------TEMPLATE INICIAL--------------------------------
// Ésto es el HTML template del DOM, es nuestra base.

const template = () => `
    <h1>¡Vamos a por todos los topos!</h1>
    <div class="game-info"> 
        <div id="score">Score: 0</div> 
        <div id="timer">Time: 60s</div> 
    </div> 
    <button id="startButton">Start Game</button> 
    <button id="endButton" disabled>End Game</button> 
    <div class="game-container"> 
        <div class="hole" id="hole1"></div> 
        <div class="hole" id="hole2"></div> 
        <div class="hole" id="hole3"></div> 
        <div class="hole" id="hole4"></div> 
        <div class="hole" id="hole5"></div> 
        <div class="hole" id="hole6"></div> 
        <div class="hole" id="hole7"></div> 
        <div class="hole" id="hole8"></div> 
        <div class="hole" id="hole9"></div> 
    </div>`;

//?---1---------CREACIÓN DE LA FUNCIÓN PRINCIPAL DEL JUEGO------------------------------------------
// Se crea la arrow función principal que contiene varias funciones para hacer funcionar el juego.
const runGame = () => {
  //?---2---------Creación de nuevas variables que se emplearán posteriormente-------------------------
  /*Se crean variables de cada elemento del HTML template superior, para
convertirlos en representaciones de JS, para poder interactuar con ellos. 
    
Con "getElementById" se obtiene el elemento del template.
Con "querySelectorAll" se obtienen TODOS los elementos con la class ".hole" */

  const holes = document.querySelectorAll(".hole");
  const startButton = document.getElementById("startButton");
  const endButton = document.getElementById("endButton");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let timer;
  let score = 0;
  let countdown;
  let moleInterval;
  let gameOver = true; // El estado inicial será "Game Over"

  //?---3----------Creación de Función 1---------------------------------------------------------------------------
  /* Se crea una función para recorrer cada "hole"/agujero.
    Se accede a la clase de "hole" para eliminar la representación de "mole"(en CSS es una img) con el método "remove".

    Con el método "removeEventListener", le doy la instrucción de:
    Al hacer "click" en el elemento "hole"(el cual tiene 9 representaciones), elimina el "mole"/topo.
    */
  const comeout = () => {
    const handleMoleClick = () => {
      if (!gameOver) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
      }
      this.classList.remove("mole");
    };

    holes.forEach((hole) => {
      hole.classList.remove("mole");
      hole.removeEventListener("click", handleMoleClick);
    });

    let random = holes[Math.floor(Math.random() * 9)];

    random.classList.add("mole");
    random.addEventListener("click", handleMoleClick);
  };
  //?---4------------Creación de Función 2------------------------------------------------------------------------
  const startGame = () => {
    if (!gameOver) {
      // Prevent starting the game
      // again if it's already in progress
      return;
    }

    gameOver = false;
    score = 0;
    console.log(scoreDisplay);
    scoreDisplay.textContent = `Score: ${score}`;
    timer = 60;
    timerDisplay.textContent = `Time: ${timer}s`;

    startButton.disabled = true;
    endButton.disabled = false;

    countdown = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;

      if (timer <= 0) {
        clearInterval(countdown);
        gameOver = true;
        alert(`Game Over!\nYour final score: ${score}`);
        startButton.disabled = false;
        endButton.disabled = true;
      }
    }, 1000);

    moleInterval = setInterval(() => {
      if (!gameOver) comeout();
    }, 1000);

    console.log("Game started");
  };

  //?---5------------Creación de Función 3---------------------------------------------------------------------
  const endGame = () => {
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    alert(`Game Ended!\nYour final score: ${score}`);
    score = 0;
    timer = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    startButton.disabled = false;
    endButton.disabled = true;
  };

  //? ---6-------------Creación de eventos-----------------------------------------------------------------
  /** Se crea una nueva constante que representa los eventos. Se crea una variable para cada "Button"
     para poder añadir en ellos los eventos. Se adquieren del DOM con "getElementById" */

  const addEventListeners = () => {
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
  }; //Cuando se cliquea empieza o para el juego.

  addEventListeners();
};

//? ---7-----------FUNCION QUE SE EXPORTA QUE PINTA LA PAGINA-----------------------------------------------
export const PrintWackaTopoPage = () => {
  document.querySelector("main").innerHTML = template();

  runGame();
};
