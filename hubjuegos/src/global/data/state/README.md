//! -----------------------------------------------------------------------------------
//?-----------------> INICIALIZACION EN LAZY DEL ESTADO ------------------------------
//! -----------------------------------------------------------------------------------

/\* AL PONER LA INICIALIZACIÓN EN LAZY los estados adquieren su valor del
sessionStorage o del localStorage en caso de tener la info guardada en
estos dos almacenamientos del navegador.
Si hay valor -> Se asigna al valor de currentUser
Si no hay valor -> Será un string vacío

1º - Crear los estados y darles su valor inicial antes de modificarlos.

"currrentUser" - Usuario actualmente logado en la aplicación.
Se inicializa de manera lazy verificando si hay algún valor en el
sessionStorage.
Si hay valor -> Se asigna al valor de currentUser
Si no hay valor -> Será un string vacío

"userData" - Objeto que contiene los datos del usuario actual(noombre, token y lista
de favoritos)

Se inicializa de manera lazy verificando un valor en el localStorage asoaciado
al nombre del usuario actual (currentUser.name).

"dataGlobal" - Objeto que almacena datos globables.

SE HACE ESTO PORQUE AL RECARGAR LA PAGINA LOS ESTADOS VUELVEN A SU VALOR INCIAL
(SON VOLÁTILES).SIN ÉSTO, EL RECARGO SERÍA "STRING vacíoS.
Ésto permite que valore si en el sessionStorage existe currentUser.
Si existe, hace un SET(asignar valor a propiedad) en este objeto.
Empleo de ternario \*/

const currentUser = {
name: sessionStorage.getItem("currentUser")
? sessionStorage.getItem("currentUser") //Si hay valor, se asigna al valor de currentUser
: "", //Si no hay valor -> Será un string vacío
};

/_--> Este estado incluye los datos de user con sus favoritos y es
igual que lo que se settea en el local storage para guardar sus favoritos. _/

let userData = localStorage.getItem(currentUser.name)
? JSON.parse(localStorage.getItem(currentUser.name))
: {
name: "",
token: false,
fav: [],
};

// ---> DATA GLOBAL DE LA APLICACIÓN-------------------------------------
/\* Aquí se guardan los datos que vengan de las API y que serán utilizados en

- los diferentes apartados de la app.
- Ej: Si tuviéramos dos páginas (una de pokemon y otra de ricky
- morty), en cada clave guardaríamos el valor de los datos de cada página.
  \*/
  const dataGlobal = {
  pokemon: [],
  ricky: [],
  };

//! --------------------------------------------------------------------------------------------
//? ----------------------------- FUNCIONES GET Y FUNCIONES SET---------------------------------
//! --------------------------------------------------------------------------------------------

/\*\* Los estados se utilizan mediante -> Funciones set y get:

- - Funciones GET: El valor actual del estado.
- . Funciones SET: Setean el valor que recibe como parametro en el estado que modifica.
  El código define funciones get y set para cada uno de los estados.\*/

//! --------------- SET Y GET currentUser ------------------------------------------------------

export const setUser = (username) => {
currentUser.name = username;
};

export const getUser = () => {
return currentUser;
};

//! -------------------- SET y GET dataGlobal---------------------------------------------------

export const setData = (data, page) => {
switch (page) {
case "Pokemon":
dataGlobal.pokemon = data;

      break;

    default:
      break;

}
};

export const getData = (page) => {
switch (page) {
case "Pokemon":
return dataGlobal.pokemon;
default:
break;
}
return dataGlobal;
};

//! -------------------SET y GET de userData ---------------------------

export const setUserData = (data) => {
console.log(".....metiendo datos en el contexto");
userData.fav = data?.fav;
userData.name = data?.name;
userData.token = data?.token;

/\*\*En este caso lo setea y lo modifica en el localStorage

- Si corresponde el nombre que se introduce en el login con el que hay
- en el localStorage, se puede recuperar los datos de los favoritos. \*/

const stringUser = JSON.stringify(userData);
localStorage.removeItem(`${currentUser.name}`);
console.log(userData.name);
localStorage.setItem(`${currentUser.name}`, stringUser);
};

export const getUserData = () => {
return userData;
};
