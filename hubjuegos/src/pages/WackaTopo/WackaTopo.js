// Se importan los datos del archivo CSS.

import "./WackaTopo.css";

//? -----------------------TEMPLATE INICIAL---------------------------------------------------------------
/* Ésto es el HTML template del DOM, es nuestra base. Se encuentran los elementos principales como "Ids,buttons,holes,score etc..."-
En el contenedor "div" se establece el juego con todos los hoyos.*/
const template = () => `
    <h1>Let's hit all the moles!</h1>
    <div class="game-info"> 
        <div id="score">Score: 0</div> 
        <div id="timer">Time: 30s</div> 
    </div> 
    <button id="startButton">Start Playing</button> 
    <button id="endButton" disabled>End Playing</button> 
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

//?-----1---------CREACIÓN DE LA FUNCIÓN PRINCIPAL DEL JUEGO-----------------------------------------------
// Se crea la función arrow principal que contiene varias funciones para hacer funcionar el juego.
const runGame = () => {
  //?---2---------Creación de nuevas variables que se emplearán posteriormente---------------------------
  /*Se crean variables de cada elemento del template HTML superior, para
convertirlos en representaciones de JS, así se interactuar con ellos. 
    
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

  //?----3----------Creación de Función 1------------------------------------------------------------------
  /* Se declara una nueva función (no arrow function, ya que tiene la limitación de no poder usarse con this) con una condición:
Si el juego no ha finalizado, aumentar el "score" de "scoreDisplay" que fue previamente declarado, gracias a
un Template String con "score".
En la última línea se indica que elimine la clase "mole"/topo del objeto actual ("hole") */

  function handleMoleClick() {
    if (!gameOver) {
      console.log(`score increasing`);
      score++;
      console.log(`score increased to ${score}`);
      scoreDisplay.textContent = `Score: ${score}`;
    }
    this.classList.remove("mole"); //"this" corresponde al elemento que está relacionado con el objeto que llama a la función,
    //con el EventListener(abajo), el cual es "hole".
  }

  //?-----4------------Creación de Función 2----------------------------------------------------------------------
  const comeout = () => {
    /* Se crea una función para recorrer cada "hole"/agujero.
    Se accede a todos los elementos con clase "hole" para eliminar la representación de "mole"(en CSS es una img) con el método "remove".

    Con el método "removeEventListener", le doy la instrucción de:
    Al hacer "click" en el elemento "hole"(el cual tiene 9 representaciones), eliminar el "mole"/topo
    e incrementar el "score" una vez cuando se le hace click.*/

    holes.forEach((hole) => {
      hole.classList.remove("mole");
      hole.removeEventListener("click", handleMoleClick);
    });

    /* Con esta declaración se indica seleccionar un núm de manera aleatoria del 0 - 9 para "holes"*/
    let randomNumber = Math.floor(Math.random() * 9);
    let randomHole = holes[randomNumber];

    randomHole.classList.add("mole"); // Se modifica la clase "mole" para que aparezca en el agujero que "randomHole" elija
    randomHole.addEventListener("click", handleMoleClick);
    /*Se adjunta un "EventListener" para que cuando "mole" aparezca se pueda hacer click en él.
Debido a "handleMoleClick" se incrementará el score y el "mole" desaparecerá. */
  };
  //?----5------------Creación de Función 3----------------------------------------------------------------------
  //Se crea una función para empezar el juego cuando se cliquea en el botón

  const startGame = () => {
    if (!gameOver) {
      // Condición en la que si el juego todavía no ha acabado, no pase nada (return está vacío)
      return;
    }
    /*Cuando el juego empieza, se establece que el juego no ha terminado, un "score" de 0 y un "timer" de 30 segundos.
El botón de empezar el juego se bloqueará y el botón de acabar el juego se habilitará */
    gameOver = false;
    score = 0;
    console.log(scoreDisplay);
    scoreDisplay.textContent = `Score: ${score}`; //Hace referencia al contenido del DOM, para inyectar ahí la cifra.
    timer = 30;
    timerDisplay.textContent = `Time: ${timer}s`;

    startButton.disabled = true;
    endButton.disabled = false;

    //Se crea una cuenta atrás con el método "setInterval" con 2 argumentos.

    countdown = setInterval(() => {
      timer--; // disminuye el temporizador en 1.
      timerDisplay.textContent = `Time: ${timer}s`; //Hace referencia al contenido del DOM, para inyectar ahí la cifra.
      //1º Misión a realizar, en este caso cuando el temporizador llegue a 0 el juego termina, y aparecerá una alerta con un mensaje.
      if (timer <= 0) {
        clearInterval(countdown);
        gameOver = true;
        alert(`Game Over!🤪\nYour final score is...😼: ${score}`);
        startButton.disabled = false;
        endButton.disabled = true;
      }
    }, 1000); // 2º Argumento: Se establece los milisegundos para el intervalo(Cada 1 segundo)

    /* Se crea otro intervalo en el que si el juego aún no ha terminado, la salida del topo sea cada segundo */
    moleInterval = setInterval(() => {
      if (!gameOver) comeout();
    }, 1000);

    console.log("Game started");
  };

  //?----6------------Creación de Función 4---------------------------------------------------------------------
  /* Se crea una función para cuando el juego termina. Con la función global(método) "clearInterval" para el temporizador y la
aparición del topo. Al mismo tiempo aparece una alerta con un mensaje
Se resetean "score" y "timer". Se establecen de nuevo los valores de las las referencias al DOM y se habilitan y deshabilitan los botones*/

  const endGame = () => {
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    alert(`Game Over!🤪\nYour final score is...😼: ${score}`);
    score = 0;
    timer = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    startButton.disabled = false;
    endButton.disabled = true;
  };

  //? ---7-------------Creación de eventos-----------------------------------------------------------------
  /** Se crea una nueva constante que representa los eventos. Se crea una variable para cada "Button"
     para poder añadir en ellos los eventos. Se adquieren del DOM con "getElementById" */

  const addEventListeners = () => {
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    startButton.addEventListener("click", startGame); //Al hacer click realiza la función "startGame"
    endButton.addEventListener("click", endGame); //Al hacer click realiza la función "endGame"
  };

  addEventListeners(); // Hace funcionar el código.
};

//? ----8-----------FUNCION QUE SE EXPORTA QUE PINTA LA PAGINA-----------------------------------------------
/* Permite exportar esta función arrow.
Inyecta el template inicial de este juego al elemento "main" del DOM */
export const PrintWackaTopoPage = () => {
  document.querySelector("main").innerHTML = template();

  runGame(); //Hace funcionar el código.
};
