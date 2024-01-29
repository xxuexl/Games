// Cada componente (en este caso "Footer")tiene su css y js correspondiente
import "./Footer.css";
const template = () => `
<h3><span>With 💘 to </span> Neoland and all the Gamers😊</h3>

`;
// Exportación de función que pinta el componente
export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
