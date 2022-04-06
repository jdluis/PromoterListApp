export const testEvent = console.log("Event File Loaded");
//Variables & Array
export const events = []; //contiene los eventos
export let eventLog = false;
export let eventFound;

//Main Class
export default class Event {
  constructor(
    eventName,
    mail,
    category,
    date,
    totalTickets,
    cartelOfEvent,
    description,
    password
  ) {
    this.eventName = eventName;
    this.mail = mail;
    this.date = date;
    this.category = category;
    this.totalTickets = totalTickets;
    this.cartelOfEvent = cartelOfEvent;
    this.description = description;
    this.password = randomPassword();
    // this.promoters = promoters;
    // this.clients = clients; //¿DEBERIA PONERLO AQUI O POR FUERA?
  }
}

function randomPassword() {
  //Funcion Copiada, intentar ENTENDER.
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

//Event and Init create New Event.
export function signInNewEvent() {
  let btnCreateEvent = document.getElementById("btnCreateEvent");
  btnCreateEvent.addEventListener("click", (e) => {
    e.preventDefault();
    createNewEvent();
  });
}

//New Object Event Creation
export function createNewEvent() {
  let newEventForm = document.getElementById("newEventForm");
  let newEvent = new Event(
    newEventForm.eventName.value,
    newEventForm.eventEmail.value,
    newEventForm.category.value,
    newEventForm.dateOfEvent.value,
    newEventForm.totalTikets.value,
    newEventForm.cartel.value,
    newEventForm.description.value
  );

  if (events.find((element) => element.eventName == newEvent.eventName)) {
    console.log("Elige otro nombre para tu Evento");
    console.log("Este Admin Ya esta registrado, pruebe con otro nombre");
  } else {
    localStorage.setItem(newEvent.eventName, JSON.stringify(newEvent)); //para guardar en localStorge
    events.push(newEvent); //Esto es para guardar en array
    console.log(
      `Se ha registrado correctamente. Su Nombre para ingresar es: ${newEvent.eventName},su contraseña es ${newEvent.password}`
    );
    console.log("Se ha registrado correctamente.");
    return true;
  }
}

/*Funcion Logeo, falla el userfound

export function loginToEvent() {
 
  let loginForm = document.getElementById("loginForm");
  let btnLogin = document.getElementById("btnLogin");

  let user = loginForm.user.value;
  let password = loginForm.password.value;
  

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    for (const event of events) {
      if (event.userName == user && event.password == password) {
        eventFound = event; //ME DA ERROR DICE QUE NO SE ENCUENTRA..
      } else {
        console.log("NO ES POSIBLE CONECTAR")
        break;
      }
    }
    if (
      eventFound.eventName == user &&
      eventFound.password == password &&
      eventLog == false
    ) {
      console.log(`Evento encontrado ${eventFound.eventName}`);
      openSection(btnLogin, eventPanelSection, loginForm);
      console.log("Login realizado correctamente");
      console.log("Bienvenido " + user);
      loginUser.reset(); //Limpia el formulario despues de haber logeado
      eventLog = true;
    } else if (eventLog == true) {
      console.log("Ya estas logeado");
    } else {
      console.log("Vuelva a intentarlo");
      console.log("No se ha podido logear, vuelva a intentarlo.");
    }
  });
}
*/

//Deslogeo Testeado
export function logOut(openSection) {
  btnLogout.addEventListener("click", () => {
    eventLog = false;
    openSection (btnLogout,aboutSection ,eventPanelSection);
    openSection (btnLogout, mainHeader ,eventPanelSection);
    alert("Deslogeo Completado");
  });
}


//logeo temporal

export function logear() {
  const superUser = "dani";
  const superPassword = "123";
  let loginForm = document.getElementById("loginForm");
  let btnLogin = document.getElementById("btnLogin");
  let mainHeader = document.getElementById('mainHeader');

  let user = loginForm.user.value;
  let password = loginForm.password.value;
  let eventPanelSection = document.getElementById('eventPanelSection');
 // let loginSection = document.getElementById('loginSection');

    if (user == superUser && password == superPassword) {
      console.log("LOGEO TEST SIN PROBLEMAS");
      
      eventPanelSection.classList.remove("none");
      loginSection.classList.add("none");
      mainHeader.classList.add("none");
      
    } else {
      alert("Vuelva a Intentarlo");
     
    }
}

export let eventForLog = btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
logear();
});