/* Se importa toda la función "runGame" de "utils", la cual contiene 
todas las operaciones del juego. 
 Se importan los datos del archivo CSS. */

import { runGame } from "../../utils";
import "./WackaTopo.css";

//? -----------------------TEMPLATE INICIAL---------------------------------------------------------------
/* Ésto es el HTML template del DOM, es nuestra base. Se encuentran los elementos principales 
como "Ids,buttons,holes,score etc..."*/
const template = () => `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Allerta+Stencil">
    <div class="game-info"> 
        <h1>Let's hit all the moles!</h1>
        <div id="score">Score: 0</div> 
        <div id="timer">Time: 30s</div> 
        <button id="startButton">Start Playing</button> 
        <button id="endButton" disabled>End Playing</button> 
    </div> 
 
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

//? ---------------FUNCION QUE SE EXPORTA PARA PINTAR EN PÁGINA WEB-----------------------------------------------
/* Permite exportar esta función arrow.
Inyecta el contenido de "template" elemento en el contenido HTML del 
elemento "main" del DOM */
export const PrintWackaTopoPage = () => {
  document.querySelector("main").innerHTML = template();
  runGame(); //Llama a la función para que ejecute el código
};
