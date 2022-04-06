/**********************--CONSOLE PARA TESTING--**************/
console.log("Testing App List PROM by jdluis");
/**********************--VARIABLES DECLARATIONS--**************/
let eventLog = false;
const testEvent = console.log("Event File Loaded");
//Variables & Array
const events = []; //contiene los eventos
let eventFound;

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
//Funcion Logeo, falla el eventfound

function loginToEvent() {
  let loginForm = document.getElementById("loginForm");
  let btnLogin = document.getElementById("btnLogin");

  let user = loginForm.user.value;
  let password = loginForm.password.value;

    for (const event of events) {
      if (event.eventName == user )   {
        eventFound = event;       
      } else {
        return alert("Evento no encontrado vuelva a intentarlo")
      }
    }
    if (
      eventFound.eventName == user &&
      eventFound.password == password &&
      eventLog == false
    ) {
      console.log(`Evento encontrado ${eventFound.eventName}`);
      console.log("Bienvenido " + user);
      eventLog = true;
      try {
        showEventPanel();
        logOut(openSection); //Inicia la funcion
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    } else if (eventLog == true) {
      console.log("Ya estas logeado");
    } else {
      console.log("No se ha podido logear, vuelva a intentarlo.");
    }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginToEvent();
});

//Deslogeo Testeado
function logOut(openSection) {
  btnLogout.addEventListener("click", () => {
    eventLog = false;
    openSection(btnLogout, aboutSection, eventPanelSection);
    openSection(btnLogout, mainHeader, eventPanelSection);
    alert("Deslogeo Completado");
  });
}

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
  let btnLogout = document.getElementById("btnLogout");
  let mainHeader = document.getElementById('mainHeader');

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sectionToOpen.classList.remove("none");
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sectionToClose.classList.add("none");
  });
};

/***************--MESSAGES ERROR & OTHERS --***********************/
//Mensajes de Validacion
function displayErrorOrSuccessMessage(message) {
  signInErrorOrSuccessMessage.innerText = message;
}
let msgLoginName = document.getElementById('msgLoginName');
let msgLoginPass = document.getElementById('msgLoginPass');

function messagesForm (label ,message, textColor) {
  label.style.color = textColor; //messageColor
  label.innerText = message;
}

messagesForm(msgLoginName,"TU PUEDES CON TODO", "red");

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
    if (i >= BGIMGS.length) {
      i = 0;
    }
    bgSliderStyles.background =
      "linear-gradient(to bottom, rgba(18,42, 66, .65), rgba(18,42, 66, .65))," +
      BGIMGS[i];
    bgSliderStyles.backgroundSize = "cover";
    bgSliderStyles.backgroundRepeat = "no-repeat";

    i++;
  }
  setInterval(changeBg, 3500);
}


/*************************--Load and Open Panel Event--************************/

function showEventPanel() { 
  openSection(btnLogin, eventPanelSection, loginSection);
  openSection(btnLogin, eventPanelSection, mainHeader);
  
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
      <li>Avalibres:${eventFound.totalTickets}</li>
      <li>Selled:${eventFound.totalTickets}</li>
    </ul>
  </div>

  <div class="description-container">
    <h4>Description:</h4>
    <p class="text-descrip">
     ${eventFound.description}
    </p>
  </div>
</div>
  `
}