// Estructura inicial de nuestra pag. web

// Gracias al archivo de barril me puedo traer las
//siguientes importaciones:
import { PrintTemplateHeader, PrintTemplateFooter } from "../components";

export const initTemplate = () => {
  const app = document.getElementById("app");
};

// Creamos los elementos
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");

// Inyectamos los elementos en el contenedor "app"
app.append(header, main, footer);

// Funciones del contenido de los diferentes componentes
PrintTemplateHeader();

//Invokes the function contents:
//document.querySelector("header").innerHTML = template();
//addListeners();

PrintTemplateFooter();
