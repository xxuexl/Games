//?-----1---------CREACIÓN DE LA FUNCIÓN PRINCIPAL DEL JUEGO-----------------------------------------------
/* Se crea la función arrow principal que contiene varias funciones para hacer 
funcionar el juego.Gracias a export se podrá utilizar en otros módulos/archivos.*/
export const runGame = () => {
  //?---2---------Creación de nuevas variables que se emplearán posteriormente---------------------------
  /*Se crean variables de cada elemento del template inicial HTML, para
  convertirlos en representaciones de JS, y así interactuar con ellos. 
      
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
  /* Se declara una nueva función con el parám. "event" con una condición:
  Si el juego no ha finalizado, aumentar el "score" de "scoreDisplay", gracias a
  un Template String con "score".
  En la última línea se indica que elimine la clase "mole"/topo del objeto actual ("hole") */

  const handleMoleClick = (event) => {
    if (!gameOver) {
      console.log(`score increasing`);
      score++;
      console.log(`score increased to ${score}`);
      scoreDisplay.textContent = `Score: ${score}`;
    }

    event.currentTarget.classList.remove("mole");
  };
  /* Con "event" y "currentTarget"(propiedad del objeto del evento) se hará 
  referencia al objeto("hole") del evento cuando suceda dicho evento
  (en la parte inferior se le llama cuando se hace "click").

  Con "classList" se elimina con el método "remove" la clase "mole" del elemento
  en el que se registró el evento. */

  //?-----4------------Creación de Función 2----------------------------------------------------------------------
  const comeout = () => {
    /* Se crea una función para recorrer cada "hole"/agujero.
      Se accede a todos los elementos con clase "hole" para eliminar la representación de "mole"(en CSS es una img) 
      con el método "remove".
  
      Con el método "removeEventListener", le doy la instrucción de:
      Al hacer "click" en el elemento "hole"(el cual tiene 9 representaciones), eliminar el "mole"/topo
      e incrementar el "score" una vez cuando se le hace click(de "handleMoleClick").*/

    holes.forEach((hole) => {
      hole.classList.remove("mole");
      hole.removeEventListener("click", handleMoleClick);
    });

    /* Con esta declaración selecciona un núm de manera aleatoria del 0 - 9 para "holes"*/
    let randomNumber = Math.floor(Math.random() * 9);
    let randomHole = holes[randomNumber];

    randomHole.classList.add("mole"); // Se modifica la clase "mole" para que aparezca en el agujero que "randomHole" elija
    randomHole.addEventListener("click", handleMoleClick);
    /*Se adjunta un "EventListener" para que cuando "mole" aparezca se pueda hacer click en él.
  Debido a "handleMoleClick" se incrementará el score y el "mole" desaparecerá. */
  };
  //?----5------------Creación de Función 3----------------------------------------------------------------------
  //Se crea una función para empezar el juego cuando se cliquea en el botón.

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

    //Se crea una cuenta atrás con el método "setInterval" con 2 argumentos:

    countdown = setInterval(() => {
      timer--; // disminuye el temporizador en 1.
      timerDisplay.textContent = `Time: ${timer}s`; //Hace referencia al contenido del DOM, para inyectar ahí la cifra.

      //1º Argumento: Cuando el temporizador llegue a 0 el juego termina, y aparecerá una alerta con un mensaje.
      if (timer <= 0) {
        clearInterval(countdown);
        gameOver = true;
        alert(`Game Over!🤪\nYour final score is...😼: ${score}`);
        startButton.disabled = false;
        endButton.disabled = true;
      }
    }, 1000); // Se establecen los milisegundos para el intervalo(Cada 1 seg)

    /* 2º Argumento: Se crea otro intervalo en el que si el juego aún no ha terminado, 
    la salida del topo sea cada segundo */
    moleInterval = setInterval(() => {
      if (!gameOver) comeout();
    }, 1000);

    console.log("Game started");
  };

  //?----6------------Creación de Función 4---------------------------------------------------------------------
  /* Se crea una función para cuando el juego termine con la función global(método) "clearInterval" para 
  el temporizador y la aparición del topo. Al mismo tiempo aparece una alerta con un mensaje.
  Se resetean "score" y "timer". Se establecen de nuevo los valores de las las referencias al DOM y 
  se habilitan y deshabilitan los botones*/

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
  /** Se crea una nueva función que asignará los eventos a los botones. Se crea una variable para cada botón
       para poder añadir en ellos los eventos. Con "getElementById" se obtienen
       las referencias a los elementos del DOM */

  const addEventListeners = () => {
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    startButton.addEventListener("click", startGame); //Al hacer click realiza la función "startGame"
    endButton.addEventListener("click", endGame); //Al hacer click realiza la función "endGame"
  };

  addEventListeners(); // Se llama a la función para que ejecute las operaciones de asignación de eventos.
};
