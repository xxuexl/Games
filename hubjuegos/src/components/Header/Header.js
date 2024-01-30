import { getUser } from "../../global/state/globalState";
import { changeColorRGB } from "../../utils";
import { initControler } from "../../utils";
import "./Header.css";

//Hay un template o se crea una nueva función con createElement.
const template = () => `
  <h2>Welcome to my little world! 🐹</h2>
  <img
    src="https://play-lh.googleusercontent.com/2eZns9LsV9PbOmEE0iAD5vcznn4W3ctI0WrwioAkkyBB1c2026g3trX_wVqCJ_tiPRk"
    alt="title hub game website (app)"
    class="logo"
  />
  <nav>
    <img
      src="https://cdn-icons-png.flaticon.com/512/1157/1157969.png"
      alt=" change to style mode page"
      id="changeColor"
    />
    <img
      src="https://cdn-icons-png.flaticon.com/512/6134/6134689.png"
      alt=" navigate to home app"
      id="buttonDashboard"
    />
    <img
      src="https://cdn-icons-png.flaticon.com/512/3094/3094700.png"
      alt="logout"
      id="buttonLogout"
    />
  </nav>
`;

/* 2 - Añadir los eventos con sus escuchadores(listeners) a los 
elementos superiores */
const addListeners = () => {
  //! -------------->COLOR CHANGE RANDOM------ evento click del boton de cambio de color

  const changeColor = document.getElementById("changeColor");
  changeColor.addEventListener("click", (e) => {
    const color = changeColorRGB();
    document.body.style.background = color;
  });

  //! ---------------> DASHBOARD ----- evento click del boton que nos lleva a los juegos

  const buttonDashboard = document.getElementById("buttonDashboard");
  buttonDashboard.addEventListener("click", (e) => {
    // llamamos al initController con el dashboard para que pinte la pagina del dashboard
    initControler("Dashboard");
  });

  //! ----------------> LOGOUT ----------------
  const buttonLogout = document.getElementById("buttonLogout");
  buttonLogout.addEventListener("click", (e) => {
    const userState = getUser().name;
    const currentUser = localStorage.getItem(userState);
    const parseCurrentUser = JSON.parse(currentUser);
    const updateUser = { ...parseCurrentUser, token: false };
    const stringUpdateUser = JSON.stringify(updateUser);
    localStorage.removeItem(userState);
    sessionStorage.removeItem("currentUser");
    localStorage.setItem(userState, stringUpdateUser);

    initControler("Login");
  });
};
export const PrintTemplateHeader = () => {
  document.querySelector("header").innerHTML = template();
  addListeners();
};
