import { getUserData, setUserData } from "../../global/state/globalState";
import "./CardPokemons.css";

/*-- El componente recibe un parámetro(data).Será un array de datos relacionados con Pkm*/

export const CardsPokemons = (data) => {
  /*-- Obtenemos los datos del usuario para saber cuáles son sus favoritos para posteriormente
añadir el corazón en ellos*/

  const appUser = getUserData();
  document.getElementById("galleryPokemon").innerHTML = "";

  /*-- Con método "map" se recorre cada elemento del array "data", el cual tiene información sobre Pkm.
Se crea una clase dinámica para cada uno de los tipos. */

  data.map((pokemon) => {
    const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`; //${pokemon.type[0].type.name} Estructura de Poke Api por lo que hay que seguirla.

    /*-- Se crea un template HTML con un "figure" para cada Pkm que incluye su imagen,nombre y un corazón (botón "favorito").
Por cada Pkm se genera un bloque de HTML(en este caso éste) con toda la información del Pkm.

"favorite" tiene clase dinamica con un ternario. Si incluye "Pkm id" en fav. del¡ usuario --> 
Se selecciona "like" - Luego en Css se les añade un corazón rojo a todos los que tengan like */

    const templateFigure = ` <figure class=${classCustomType} id=${pokemon.id}>
      <img src=${pokemon.image} alt=${pokemon.name} />
      <h2>${pokemon.name}</h2>
      <span class="material-symbols-outlined  ${
        appUser.fav.includes(pokemon.id.toString()) ? "like" : ""
      }"> favorite </span>
    </figure>`;

    /*-- Añade el contenido de templateFigure(que es un template string) al HTML del elemento DOM con 
el ID galleryPokemon */

    document.getElementById("galleryPokemon").innerHTML += templateFigure;

    /** Para que "span favorite" sea clicable hay que darle su evento correspondiente.
Se crea una función para meter eventos y pasamos toda la data como param.*/

    addListeners(data);
  });
};
//?------------------------------------------------------------------------------------
//-- Se traen los datos del usuario, especialmente sus favoritos.

const addListeners = (data) => {
  const appUser = getUserData();

  /*-- Se seleccionan todos los span(son los corazones). Se recorren todos y se añade
el evento de tipo click*/

  const spanAll = document.querySelectorAll("span");
  spanAll.forEach((span) => {
    span.addEventListener("click", (e) => {
      /*-- La condición verifica si el elemento id del nodo padre de "span"
(Este es el "figure" cuyo id es = id del pkm), está presente en el array de "appUser.fav" */

      if (appUser.fav.includes(e.target.parentNode.id)) {
        /**-- Si lo incluye se le saca del array. Primero se llaman los datos del usuario 
para actualizar sus fav(array con los id de los pokm fav) */

        const appUser = getUserData();

        /**-- Se crea nuevo array con todos los id de los pkmn favoritos menos
el que queremos quitar como favorito */

        const newFavArray = [];

        appUser.fav.forEach((id) => {
          if (e.target.parentNode.id != id) newFavArray.push(id);
        });

        /**-- Tras crear el "newFavArray", se añadirá a la función "setUserData", junto a los datos del usuario(appUser).
1ª Se hace una copia con "spread operator". 2º A clave "fav" le metemos como valor newFavArray solo.
La función "setUserData" los transferirá al localStorage.

Luego se crea un toggle, si el corazon que se clica es ya favorito, se quita.
Si no es favorito, se convierte en favorito*/

        setUserData({
          ...appUser,
          fav: newFavArray,
        });
        span.classList.toggle("like");
      } else {
        const appUser = getUserData();
        appUser.fav.push(e.target.parentNode.id);
        setUserData(appUser);

        span.classList.toggle("like");
      }
    });
  });
};

/*-- Este código define el componente *`CardsPokemons`* que recibe un array de datos 
"data" relacionados con Pokémon.
Renderiza las tarjetas/cards correspondientes a esos Pokémon */
