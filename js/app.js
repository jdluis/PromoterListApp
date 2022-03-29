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
let signInErrorOrSuccessMessage = document.getElementById(
  "signInErrorOrSuccessMessage"
);
let loginErrorOrSuccessMessage = document.getElementById(
  "loginErrorOrSuccessMessage"
);
let userFound;

let linkToLogin = document.getElementById("linkToLogin");
let loginContainer = document.getElementById("loginContainer");
let singinContainer = document.getElementById("singinContainer");
let linkToSingin = document.getElementById("linkToSingin");

let headerTitle = document.getElementById("headerTitle");

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

linkToLogin.addEventListener("click", (e) => {
  loginContainer.classList.remove("none");
  singinContainer.classList.add("none");
});

linkToSingin.addEventListener("click", (e) => {
  loginContainer.classList.add("none");
  singinContainer.classList.remove("none");
});



//Llama a la funcion registro cuando damos click en el boton de Registro
signInAdminBtn.addEventListener("click", (e) => {
  e.preventDefault(); //Previene que se recargue la pagina, por ahora para evitar que se pierdan datos
  return signInAdmin();
});

//Activa el evento User Login cuando damos click en el boton de Login
submitLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

/* ************************** *
 * *FINISH---EVENTOS* *
 * ****************************/

/*************
 ///FUNCIONES////// 
 **************/

//Acceder al Panel Administrador

function showAdminPanel() {
  //HTML ADMIN PANEL
  adminPanel.innerHTML = `
    <div class="container">
      <section class="adminPanel-container" id="adminPanel">
        <div class="adminPanel-header">
          <div class="adminPanel-header__info">
            <h3>Admin: ${userFound.userName}</h3>
            <h3>Mail: ${userFound.mail} </h3>
          </div>
          <div class="adminPanel-config__buttons">
            <button class="btn-2 btn-2_on">
              <i class="fa-solid fa-wrench"></i>
            </button>
            <button class="btn-2 btn-2_off" width="44.8px" id="logOutBtn">
              X
            </button>
          </div>
        </div>
        <div>
          <h2 class="title"> ${userFound.eventName}</h2>
        </div>

        <div id="clientFormSubmit" class="">
          <div class="container-flex flex-2">
            <h2 class="subtitle">Promoters</h2>
            <button class="btn btn-add" id="showAddPromotorFormBtn">ADD</button>
          </div>

          <div>
            <table>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Phone</th>
                <th>Code</th>
                <th>Clients</th>
              </tr>
              <tr>
                <td>Dani De Luis</td>
                <td class="table_item">josedanieldeluis@gmail.com</td>
                <td>+34 608995547</td>
                <td>5474KJ</td>
                <th>2</th>
              </tr>
              <tr>
                <td>Ylenia Di Charm</td>
                <td class="table_item">yleniadicharm@gmail.com</td>
                <td>+34 608995547</td>
                <td>5646FG</td>
                <th>5</th>
              </tr>
            </table>
          </div>

          <!--HACER QUE SE ABRA EN UN MODAL TIPO ALERT AL PULSAR EN ADD-->
          <div class="form-container form-modal none" id="singinPromotorContainer">
            <h2 class="form-title">Create a Promotor</h2>
            <form class="form" id="addPromotorForm">
              <input
                class="form__input"
                type="text"
                id="promotorName"
                placeholder="Name"
                required
              />
              <input
                class="form__input"
                type="email"
                id="promotorMail"
                placeholder="Mail"
                required
              />
              <input
                class="form__input"
                type="text"
                id="promotorPhone"
                placeholder="Phone"
                required
              />
              <input
                class="form__input"
                type="password"
                id="promotorPassword"
                placeholder="Password"
                required
              />
              <input
                class="form__input"
                type="password"
                id="promotorPasswordConfirm"
                placeholder="Confirm Password"
                required
              />
              <button class="btn btn-on form-button" type="submit" id="addPromotorBtn">
                Continue
              </button>
            </form>
            <span id="signInErrorOrSuccessMessage"></span>
          </div>
        </div>
      </section>
    </div>
   `;
  let logOutBtn = document.getElementById("logOutBtn");
  let showAddPromotorFormBtn = document.getElementById("showAddPromotorFormBtn");
  let singinPromotorContainer = document.getElementById("singinPromotorContainer");
  //Nos Deslogea cuando damos click en el boton de logOut
  
  logOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logOut();
  });

  //Muestra el panel de administrador
  showAddPromotorFormBtn.addEventListener("click", (e) => {
  singinPromotorContainer.classList.remove("none");
});
}

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
    localStorage.setItem(newAdmin.eventName, JSON.stringify(newAdmin)); //para guardar en localStorge
    // admins.push(newAdmin); //Esto es para guardar en arraya
    console.log(
      `Se ha registrado correctamente. Su Nombre para ingresar es: ${newAdmin.userName}, el nombre de su evento es: ${newAdmin.eventName}`
    );
    displayErrorOrSuccessMessage("Se ha registrado correctamente.");
    submitAdmin.reset();
    allStorage();
  }
}

//login
function login() {
  let userName = loginUser[0].value;
  let password = loginUser[1].value;
  for (const admin of admins) {
    if (admin.userName == userName && admin.password == password) {
      userFound = admin;
    }
  }
  if (
    userFound.userName == userName &&
    userFound.password == password &&
    adminLog == false
  ) {
    console.log(`Admin encontrado ${userFound.userName}`);
    adminPanel.classList.remove("none");
    console.log("Login realizado correctamente");
    displayLoginMessage("Bienvenido " + userName);
    loginUser.reset(); //Limpia el formulario despues de haber logeado
    adminLog = true;

    showAdminPanel();
    loginContainer.classList.add("none");
    headerTitle.innerText = "Admin Panel";
  } else if (adminLog == true) {
    displayLoginMessage("Ya estas logeado");
  } else {
    console.log("Vuelva a intentarlo");
    displayLoginMessage("No se ha podido logear, vuelva a intentarlo.");
  }
}

//Deslogeo Testeado
function logOut() {
  adminLog = false;
  adminPanel.classList.add("none");
  console.log("Admin " + userFound.userName + " deslogeado");
  singinContainer.classList.remove("none");
}

//Carga el contenido de todo el local Storagw y lo guarda en el array admins
function allStorage() {
  (keys = Object.keys(localStorage)), (i = keys.length);

  while (i--) {
    admins.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return admins;
}

/*************
 ///CLASES////// 
 **************/

//Creo que existia el extend pero no lo entiendo del todo aun, ya que si lo extiendo a la clase promotor, no estoy seguro de si todos los metodos se me pasan directamente
// O si en el caso de que fuera asi como podria impedir que se pasen algunos metodos.

class Admin {
  constructor(eventName, userName, mail, password) {
    // this.id = uniqueId(); //Llama a la funcion para crear un numero distinto cada vez/ Desactivado hasta que funcione correctamente lo demas.
    this.eventName = eventName;
    this.userName = userName;
    this.mail = mail;
    this.password = password;
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
