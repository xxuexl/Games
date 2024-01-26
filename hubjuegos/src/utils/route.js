import { getUser } from "../global/state/globalState";
import { Login, PrintPokemonPage, printTemplateDashboard } from "../pages";

export const initControler = (pagesRender) => {
  switch (pagesRender) {
    // --> Si no hay User en este caso pinta el login
    case undefined:
      localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
      break;

    case "Pokemon":
      PrintPokemonPage();
      break;
    case "Dashboard":
      printTemplateDashboard();
      break;
    case "Topo":
      "Topo()";
      break;
    case "Login":
      Login();
      break;
    case "Memory":
      "Memory()";
      break;
  }
};

//switch - Evalúa las diferentes opciones y llama a funciones específicas de renderizado.
// Este controlador determina qué página o componente debe renderizarse
// según el valor de pagesRender.
