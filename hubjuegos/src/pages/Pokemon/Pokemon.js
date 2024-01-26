import "./Pokemon.css";

//! ------------------------------------------------------------------------------
//? ------------------------------TEMPLATE INICIAL--------------------------------
//! ------------------------------------------------------------------------------
const template = () => `
  <div id="pokemon">
    <div id="containerFilter">
      <div id="spinnerButtonFilter"></div>
      <div id="filterButton"></div>
      <input
        type="text"
        id="inputPokemon"
        placeholder="Busca tu pokemon favorito"
      />
    </div>
    <div id="paginacion"></div>
    <div id="spinner"></div>
    <div id="galleryPokemon"></div>
  </div>
`;

//! ------------------------------------------------------------------------------
//? ----------------- FUNCION QUE TRAE LOS DATOS DEL CONTEXTO--------------------
//! ------------------------------------------------------------------------------
const dataService = async () => {};

//! ------------------------------------------------------------------------------
//? ---------------------------EVENTOS PARA EL INPUT-----------------------------------
//! ------------------------------------------------------------------------------
const addListeners = () => {};

//! ------------------------------------------------------------------------------
//? ---------------------FUNCION QUE SE EXPORTA QUE PINTA LA PAGINA--------------
//! ------------------------------------------------------------------------------
export const PrintPokemonPage = () => {
  document.querySelector("main").innerHTML = template();
};
