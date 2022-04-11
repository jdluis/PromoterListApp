/**********************--CONSOLE PARA TESTING--**************/
console.log("Testing App List PROM by jdluis");
/**********************--GLOBAL VARIABLES DECLARATIONS--**************/
const testEvent = console.log("Event File Loaded");
//Variables & Array
const events = []; //contiene los eventos
let eventFound;

  //DOM--All BTN & Section.
  let btnOpenFormNewEvent = document.getElementById("btnOpenFormNewEvent");
  let newEventSection = document.getElementById("newEventSection");
  let btnToLoginSection = document.getElementById("btnToLoginSection");
  let btnBackToAbout = document.getElementById("btnBackToAbout");
  let aboutSection = document.getElementById("aboutSection");
  let loginSection = document.getElementById("loginSection");
  let btnBackToAboutFromLogin = document.getElementById(
    "btnBackToAboutFromLogin"
  );
  let eventPanelSection = document.getElementById("eventPanelSection");
  let eventPanelConfig = document.getElementById("eventPanelConfig");
  let mainHeader = document.getElementById("mainHeader");

//*********************--INITIATIONS--**********************/

InitApp();

function InitApp() {
  CambiarBG(); //AutoSlider for BG images
  openSection(btnOpenFormNewEvent, newEventSection, aboutSection); //ID: form,sectionToOpen, sectionToClose)
  openSection(btnBackToAbout, aboutSection, newEventSection);
  openSection(btnBackToAboutFromLogin, aboutSection, loginSection);
  openSection(btnToLoginSection, loginSection, aboutSection);
  signInNewEvent();
  allStorage(); //Cargar en el array el localStorage
}

/********************************--SAVE STORAGE--*****************/

//Carga el contenido de todo el local Storage y lo guarda en el array admins
function allStorage() {
  let keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    events.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return events;
}

/*********************--CLASS EVENT--************************/

//Main Class
class Event {
  constructor(
    eventName,
    mail,
    category,
    date,
    totalTickets,
    cartelOfEvent,
    description,
    password,  
    status

  ) {
    this.eventName = eventName;
    this.mail = mail;
    this.date = date;
    this.category = category;
    this.totalTickets = totalTickets;
    this.cartelOfEvent = cartelOfEvent;
    this.description = description;
    this.password = randomPassword();
    this.status = false;
    // this.promoters = promoters;
    // this.clients = clients; //¿DEBERIA PONERLO AQUI O POR FUERA?
  }
}

/************************CREATION OF NEW EVENT--***********************/

//Event and Init create New Event.
function signInNewEvent() {
  let btnCreateEvent = document.getElementById("btnCreateEvent");
  btnCreateEvent.addEventListener("click", (e) => {
    e.preventDefault();
    createNewEvent();
  });
}

//New Object Event Creation
function createNewEvent() {
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
function randomPassword() {
  //Funcion Copiada, intentar ENTENDER.
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

/********************************--LOGIN EVENT--*****************/
//Funcion Logeo


function loginToEvent() {

  let loginForm = document.getElementById("loginForm");
  let btnLogin = document.getElementById("btnLogin");
  let user = loginForm.user.value;
  let password = loginForm.password.value;

  
  for (const event of events) {
    if (event.eventName == user && event.password == password ) {
      eventFound = event;
      messagesForm(
        msgLoginPass,
        `Evento encontrado: ${eventFound.eventName}`,
        colorSuccess
      );
      eventFound.status = true;
      
      setTimeout (() => {
        eventPanelSection.classList.remove("none");
        mainHeader.classList.add("none");
        loginSection.classList.add("none");
        aboutSection.classList.add("none");
        messagesForm(msgLoginPass, "", "none"); //restard messages
      }, 2000);
      loginForm.reset();
      return;
    }  
  } 
  messagesForm(msgLoginPass, "Event Name or Password are incorrect, try again", colorError);
  }


btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginToEvent();
  showEvent(); //html Inner call
});


//Deslogeo Testeado
function deslogeo () {
  let btnLogout = document.getElementById("btnLogout");

  btnLogout.addEventListener("click", () => {
    eventFound.value = false;
    eventFound = undefined;
    setTimeout (() => {
      eventPanelSection.classList.add("none");
      aboutSection.classList.remove("none");
    }, 1000);
    messagesForm(msgLogOut, "Log Out Completed", colorSuccess);
  });
};


/***************************CLASS PROMOTOR--*****************/

class Promotor {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }
}

/*************************CLASS CLIENT--********************/

class Client {
  constructor(fullName, email, country, phoneNumber, processStatus) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.processStatus = processStatus;
  }
}

/*******************--OPEN AND CLOSE SECTION EVENTLISTENER--**************/

function openSection(btn, sectionToOpen, sectionToClose) {

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sectionToOpen.classList.remove("none");
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sectionToClose.classList.add("none");
  });
}


/*************************--Load Panel Event--************************/


function showEvent() {

  eventPanelSection.innerHTML = `
  <div>
  <p class="logo">PromoList</p>
  <div class="fixed">
    <button id="settings" class="btn btn-primary">Settings</button>
    <button id="btnLogout" class="btn btn-secundary">LogOut</button>
  </div>
</div>

<div class="event-container">
  <h3 class="event-title">${eventFound.eventName}</h3>

  <div class="panel-img_container">
    <img
      src="${eventFound.cartelOfEvent}"
      alt=""
    />
  </div>

  <div class="eventInfo-container">
    <ul class="list list-colum">
      <li>Event Name: ${eventFound.eventName}</li>
      <li>Category: ${eventFound.category}</li>
      <li>Total Ticket: ${eventFound.totalTickets}</li>
      <li>Avalibres:${caclTicketsDifference ()}</li>
      <li>Selled:${sellTickets ()}</li>
    </ul>
  </div>

  <div class="description-container">
    <h4>Description:</h4>
    <p class="text-descrip">
     ${eventFound.description}
    </p>
  </div>
  <span class="msgLogOut" id="msgLogOut"></span>
</div>
  `;
  deslogeo (); //activa la funcion del btn LogOut
}
/***************--MESSAGES ERROR & OTHERS --***********************/
//Variables Messages
let colorError = "#FE4A49";
let colorSuccess = "#0CCA4A";

function messagesForm(label, message, textColor) {
  //DOM Variables ID.
  let msgLoginName = document.getElementById("msgLoginName");
  let msgLoginPass = document.getElementById("msgLoginPass");
  let msgLogOut = document.getElementById("msgLogOut");
  label.style.color = textColor; //messageColor
  label.innerText = message; //message text
}

/*******************--HERO BACKGORUND SLIDER AUTO--*************/

function CambiarBG() {
  const BGIMGS = [
    "url(media/bg-family.png)",
    "url(media/bg-sport.jpg)",
    "url(media/bg-others.jpg)",
    "url(media/bg-dance.jpg)",
  ];

  let bgSliderStyles = document.getElementById("bgHeroSlide").style;
  let i = 0; //Contador
  /*
  Cuando la funcion es llamada agrega el string del array al estilo de background de bgHeroSlide
  */
  function changeBg() {
    //Operador Terniario
     (i >= BGIMGS.length) ? i = 0 : 
  
    bgSliderStyles.background =
      "linear-gradient(to bottom, rgba(18,42, 66, .65), rgba(18,42, 66, .65))," +
      BGIMGS[i];
    bgSliderStyles.backgroundSize = "cover";
    bgSliderStyles.backgroundRepeat = "no-repeat";

    i++;
  }
  setInterval(changeBg, 3500);
}

/********************--CALCULATIONS OF TICKETS DIFERRENCE--*******************/

function caclTicketsDifference () {
  const totalTickets = parseInt(eventFound.totalTickets);
  let difference = totalTickets - sellTickets();
  return difference;
}

//ESTA FUNCION SERA INTRODUCIDA EN UN INPUT o por cada item cliente.
function sellTickets () {
  let sellTickets = 2;
  return sellTickets;
}