/* ************************** *
 * *START---DECLARACION DE VARIABLES* *
 * ****************************/
//Booleanos User Logs
let adminLog = false;
let promotorLog = false;

//DOM
let submitAdmin = document.getElementById("signinForm");
let loginUser = document.getElementById("loginForm");
let clientForm = document.getElementById("clientFormSubmit");
let adminPanel = document.getElementById("adminPanel");
let promotorPanel = document.getElementById("promotorPanel");
let submitLoginBtn = document.getElementById("submitLoginBtn");
let signInAdminBtn = document.getElementById("signInAdminBtn");
let logOutBtn = document.getElementById("logOutBtn");
let signInErrorOrSuccessMessage = document.getElementById(
  "signInErrorOrSuccessMessage"
);
let loginErrorOrSuccessMessage = document.getElementById(
  "loginErrorOrSuccessMessage"
);
let userFound;

/*ARRAYS*/
const admins = [];
const promotores = [];
const clientes = [];

/* ************************** *
 * *FINISH---DECLARACION DE VARIABLES* *
 * ****************************/

/* ************************** *
 * *START---EVENTOS* *
 * ****************************/

//Llama a la funcion registro cuando damos click en el boton de Registro
signInAdminBtn.addEventListener("click", () => {
  event.preventDefault(); //Previene que se recargue la pagina, por ahora para evitar que se pierdan datos
  return signInAdmin();
});

//Activa el evento User Login cuando damos click en el boton de Login
submitLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

//Nos Deslogea cuando damos click en el boton de logOut
logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logOut();
});

/*REGLAS PARA VISUALIZAR CADA SECTION O PAGINA*/

/* ************************** *
 * *FINISH---EVENTOS* *
 * ****************************/

/*************
 ///FUNCIONES////// 
 **************/

//Mensajes de Validacion
function displayErrorOrSuccessMessage(message) {
  signInErrorOrSuccessMessage.innerText = message;
}

function displayLoginMessage(message) {
  loginErrorOrSuccessMessage.innerText = message;
}

/*Permite registrar un nuevo admin */
function signInAdmin() {
  let newAdmin = new Admin(
    submitAdmin[0].value,
    submitAdmin[1].value,
    submitAdmin[2].value,
    submitAdmin[3].value
  );

  if (admins.find((element) => element.userName == newAdmin.userName)) {
    console.log("Elige otro nombre de usuario");
    displayErrorOrSuccessMessage(
      "Este Admin Ya esta registrado, pruebe con otro nombre"
    );
  } else {
    localStorage.setItem(newAdmin.userName, JSON.stringify(newAdmin)); //para guardar en localStorge
    // admins.push(newAdmin); //Esto es para guardar en arraya
    console.log(
      `Se ha registrado correctamente. Su Nombre para ingresar es: ${newAdmin.userName}, el nombre de su evento es: ${newAdmin.eventName}`
    );
    displayErrorOrSuccessMessage("Se ha registrado correctamente.");
    submitAdmin.reset();
  }
}

//login TENGO QUE AJUSTARLA AL LOCALSTORAGE(por ahora ajuste el localstorage al array, en vez de conectar las funciones al local)
function login() {
  let userName = loginUser[0].value;
  let password = loginUser[1].value;
  for (const admin of admins) {
    if (admin.userName == userName && admin.password == password) {
      userFound = admin;
    }
  }
  if (userFound.userName == userName && userFound.password == password && adminLog == false) {
    console.log(`Admin encontrado ${userFound.userName}`);
    adminPanel.classList.remove("none");
    console.log("Login realizado correctamente");
    displayLoginMessage("Bienvenido " + userName);
    loginUser.reset(); //Limpia el formulario despues de haber logeado
    adminLog = true;
  } else if (adminLog == true) {
    displayLoginMessage("Ya estas logeado");
  }
  else {
    console.log("Vuelva a intentarlo");
    displayLoginMessage("No se ha podido logear, vuelva a intentarlo.");
  }
}

//Deslogeo Testeado
function logOut() {
  adminLog = false;
  adminPanel.classList.add("none");
  alert("Admin " + userFound.userName + " deslogeado");
}


//Carga el contenido de todo el local Storagw y lo guarda en el array admins
function allStorage() { 
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      admins.push( JSON.parse(localStorage.getItem(keys[i])) );
  }
  return admins;
}


/*************
 ///CLASES////// 
 **************/

//Creo que existia el extend pero no lo entiendo del todo aun, ya que si lo extiendo a la clase promotor, no estoy seguro de si todos los metodos se me pasan directamente
// O si en el caso de que fuera asi como podria impedir que se pasen algunos metodos.

class Admin {
  constructor(userName, password, mail, eventName) {
   // this.id = uniqueId(); //Llama a la funcion para crear un numero distinto cada vez/ Desactivado hasta que funcione correctamente lo demas.
    this.userName = userName;
    this.password = password;
    this.mail = mail;
    this.eventName = eventName;
   // this.promotores = signInPromotors(); Creare una funcion para guardar aqui los datos de los promotores
  }

  addPromotor() {
    let newPromotor = new Promotor(
      prompt("Indique el nombre de usuario que deseé"),
      prompt("Indique una constraseña")
    );
    promotores.push(newPromotor);

    alert("Promotor registrado sadisfactoriamente"),
      console.log(
        `Se ha registrado correctamente. Su Nombre para ingresar es: ${newPromotor.userName}, y su pass: ${newPromotor.password}`
      );
  }
}

class Promotor {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }

  //Metodo del Promotor para logearse a su cuenta
  Login() {
    let userName = prompt("Introduzca su nombre");
    let password = prompt("Introduzca su contraseña");

    if (this.userName == userName && this.password == password) {
      console.log("Login realizado correctamente");
      alert("Bienvenido " + userName);
      return (promotorLog = true);
    } else {
      alert("No se ha podido logear, consulte el log");
      console.log(
        "Los datos introducidos no corresponden con ningun Administrador"
      );
      return (promotorLog = false);
    }
  }

  //Simplemente uniendolo a un boton o algo funcionaria para cambiar el estado de log
  Logout() {
    alert("Te has deslogeado correctamente");
    console.log("Admin " + userName + " deslogeado");
    return (promotorLog = false);
  }

  addClient(newClient) {
    //Quiero que al crearse un cliente este se una al array clientes de ese promotor
    newClient = new Client();
    clientes.push(newClient);
  }

  mostrarClientes() {
    for (const cliente of clientes) {
      console.log(`El cliente ${cliente} se ha cargado correctamente`);
    }
  }

  eliminarCLiente() {
    //Realizar codigo para eliminar un cliente de un array.
  }
}

class Client {
  constructor(fullName, email, country, phoneNumber, processStatus) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.processStatus = processStatus;
  }
}

/*********************************
 * DATOS TEMPORALES/DEMOS/PRUEBAS *
 * ******************************/

/*Datos provicionales del administrador principal*/
let adminName = "007";
let adminPass = "2211";

/*CONSOLE PARA TESTING*/
console.log("Testing App List PROM by jdluis");
