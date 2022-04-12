/**********************--CONSOLE PARA TESTING--**************/
console.log("Testing App List PROM by jdluis");
/**********************--GLOBAL VARIABLES DECLARATIONS--**************/
const testEvent = console.log("Event File Loaded");
//Variables & Array
const events = []; //contiene los eventos
let eventFound;
let eventAlreadyExist;

  //Variables Messages
  let colorError = "#FE4A49";
  let colorSuccess = "#0CCA4A";

  //DOM--All BTN & Section.
  let btnOpenFormNewEvent = document.getElementById("btnOpenFormNewEvent");
  let btnToLoginSection = document.getElementById("btnToLoginSection");
  let btnBackToAboutFromSingIn = document.getElementById("btnBackToAboutFromSingIn");
  let btnBackToAboutFromLogin = document.getElementById(
    "btnBackToAboutFromLogin"
  );

  let sectionNewEvent = document.getElementById("sectionNewEvent");
  let sectioAbout = document.getElementById("sectioAbout");
  let sectionLogin = document.getElementById("sectionLogin");
  let sectionEventPanel = document.getElementById("sectionEventPanel");
  let sectionEventPanelConfig = document.getElementById("sectionEventPanelConfig");
  let sectionMainHeader = document.getElementById("sectionMainHeader");

//*********************--INITIATIONS--**********************/

InitApp();

function InitApp() {
  CambiarBG(); //AutoSlider for BG images
  openSection(btnOpenFormNewEvent, sectionNewEvent, sectioAbout); //ID: form,sectionToOpen, sectionToClose)
  openSection(btnBackToAboutFromLogin, sectioAbout, sectionLogin);
  openSection(btnToLoginSection, sectionLogin, sectioAbout);
  resetMessage(); //Resetea el mensaje de error cuando le damos al btn back del login.
  signInNewEvent();
  allStorage(); //Cargar en el array el localStorage
}

/*********************--SAVE STORAGE--*****************/

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

function randomPassword() {
  //Funcion Copiada, intentar ENTENDER.
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

/************************CREATION OF NEW EVENT--***********************/

//Event and Init create New Event.
function signInNewEvent() {
  let btnCreateEvent = document.getElementById("btnCreateEvent");
  btnCreateEvent.addEventListener("click", (e) => {
    e.preventDefault();
    createNewEvent();
    loginToEvent();

    (eventAlreadyExist == false) ?  showPassword() : console.log("No se mostro la contraseña");
    showEvent(); //html Inner call
  });
};

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
     eventAlreadyExist = true;
  } else {
    localStorage.setItem(newEvent.eventName, JSON.stringify(newEvent)); //para guardar en localStorge
    events.push(newEvent); //Esto es para guardar en array
    console.log(
      `Se ha registrado correctamente. Su Nombre para ingresar es: ${newEvent.eventName},su contraseña es ${newEvent.password}`
    );
    console.log("Se ha registrado correctamente.");
     eventAlreadyExist = false;
  }
};

function showPassword () {
  return alert(eventFound.password);
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
        sectionEventPanel.classList.remove("none");
        sectionMainHeader.classList.add("none");
        sectionLogin.classList.add("none");
        sectioAbout.classList.add("none");
        sectionNewEvent.classList.add("none");
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
      sectionEventPanel.classList.add("none");
      sectioAbout.classList.remove("none");
      sectionMainHeader.classList.remove("none");
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

function openSection(btn, sectionToOpen, sectionToClose, funcionality) {
  
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    sectionToOpen.classList.remove("none");
    sectionToClose.classList.add("none");
    funcionality;
  });
}


/*************************--Load Panel Event--************************/


function showEvent() {
  
  sectionEventPanel.innerHTML = `
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


function messagesForm(label, message, textColor) {
  //DOM Variables ID.
  let msgLoginName = document.getElementById("msgLoginName");
  let msgLoginPass = document.getElementById("msgLoginPass");
  let msgLogOut = document.getElementById("msgLogOut");
  label.style.color = textColor; //messageColor
  label.innerText = message; //message text
}

function resetMessage (){
  btnBackToAboutFromLogin.addEventListener("click",() => {
    messagesForm(msgLoginPass, "", colorError);
  })
};

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

