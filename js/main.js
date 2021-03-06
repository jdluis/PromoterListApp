/*  -->>   CONSOLE PARA TESTING        <<--  */
console.log("Testing App List PROM by jdluis");
// LOS NOMBRES TEST SIGNIFICAN CODIGO DE PRUEBA O SIN TERMINAR, PUEDO BUSCARLO CON CONTROL F

/*  -->> GLOBAL VARIABLES DECLARATIONS <<--  */

//--> Array de objetos
const events = []; //contiene los eventos
let eventFound;
let eventAlreadyExist;

let colorError = "#FE4A49";
let colorSuccess = "#0CCA4A";
//--> DOM--All BTN & Section.
let btnOpenFormNewEvent = document.getElementById("btnOpenFormNewEvent");
let btnToLoginSection = document.getElementById("btnToLoginSection");
let btnBackToAboutFromSingIn = document.getElementById(
  "btnBackToAboutFromSingIn"
);
let btnBackToAboutFromLogin = document.getElementById(
  "btnBackToAboutFromLogin"
);
let btnLogin = document.getElementById("btnLogin");
let btnCreateEvent = document.getElementById("btnCreateEvent");
let btnNavEvents = document.getElementById("btnNavEvents");
let btnNavHome = document.getElementById("btnNavHome");
let btnBackOfSectionEvents = document.getElementById("btnBackOfSectionEvents");
let btnEventSettings = document.getElementById("btnEventSettings");

let goToTheEventPage;

//--> Sections
let bgHeroSlideContainer = document.getElementById("bgHeroSlide");
let sectionNewEvent = document.getElementById("sectionNewEvent");
let sectionHome = document.getElementById("sectionHome");
let sectionLogin = document.getElementById("sectionLogin");
let sectionEventPanel = document.getElementById("sectionEventPanel");
let sectionEventPanelConfig = document.getElementById(
  "sectionEventPanelConfig"
);
let sectionMainHeader = document.getElementById("sectionMainHeader");
let sectionEvents = document.getElementById("sectionEvents");
let eventsGallery = document.getElementById("eventsGallery");
let sectionEventSettings = document.getElementById("sectionEventSettings");

//--> Forms
const loginForm = document.getElementById("loginForm");
const newEventForm = document.getElementById("newEventForm");
const settingsEventForm = document.getElementById("settingsEventForm");
let errorMessageValidationLogIng = document.getElementById("errorLogIn");
let errorMessageValidationSignIn = document.getElementById("errorSignIn");
let statusValidationForm_String = false;
let statusValidationForm_Mail = false;
let statusValidationForm_Url = false;
let statusValidationForm_Texarea = false;
let checkIfValidationIsOk;

/*  -->>         INITIATIONS          <<--  */

// Connection to local API: db_events.json
const requestDefaultEvents = async () => {
  await fetch("./db_events.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((event) => {
        saveInLocalStorage(event);
      });
    });
    //De esta manera esperamos que se cargue la api y luego ejecutamos la carga de todo el local al array
    pushLocalStorageToArray(); 
    addEventToSectionEvents();
  };
  
  InitApp();
  
  function InitApp() {
    CambiarBG(); //AutoSlider for BG images
    //abrir y cerrar secciones
    openSection(btnOpenFormNewEvent,sectionNewEvent,sectionHome,sectionMainHeader);
    openSection(btnToLoginSection, sectionLogin, sectionHome, sectionMainHeader);
    openSection(btnNavEvents, sectionEvents, sectionHome, sectionMainHeader);
    openSection(btnBackToAboutFromSingIn, sectionHome, sectionNewEvent);
    openSection(btnBackToAboutFromLogin, sectionHome, sectionLogin);
    openSection(btnBackToAboutFromSingIn, sectionMainHeader, sectionNewEvent);
    openSection(btnBackToAboutFromLogin, sectionMainHeader, sectionLogin);
    openSection(btnBackOfSectionEvents, sectionHome, sectionEvents);
    openSection(btnBackOfSectionEvents, sectionMainHeader, sectionEvents);
    
    //Validaciones
    validationString ();
    validationMail ();
    validationUrl ();
    validationTexarea ();

    //Cargar API Local db_events.json
    requestDefaultEvents();
}

/*  -->>         CLASS          <<--  */

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
    this._eventName = eventName;
    this._mail = mail;
    this.date = date;
    this.category = category;
    this.totalTickets = totalTickets;
    this.cartelOfEvent = cartelOfEvent;
    this._description = description;
    this.password = randomPassword();
    this.status = false;
  }

  get eventName () {
    return this._eventName;
  }

  set eventName (eventName) {
    this._eventName = eventName;
  }

  get mail () {
    return this._mail;
  }

  set mail (mail) {
    this._mail = mail;
  }

  get description () {
    return this._description;
  }

  set description (description) {
    this._description = description;
  }
}

/*  -->>  EVENT: Sign In, Login, LogOut, Settings  <<--  */

//--> New Object Event Creation

  btnCreateEvent.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("working");
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
    callAlerty ("","Este Admin Ya esta registrado, pruebe con otro nombre","error",'OK')
    eventAlreadyExist = true;
  } else if (checkIfValidationIsOk == 2 || checkIfValidationIsOk == 3 || checkIfValidationIsOk == 4 ) {
    saveInLocalStorage(newEvent);
    events.push(newEvent); //Esto es para guardar en array
    callAlerty (`Gracias ${newEvent.eventName}`,`Su contrase??a es '${newEvent.password}', no olvide guardarla.`,"success",'Continua')
    eventAlreadyExist = false;
    loginToEventAfterSignIn();
    showEvent(); //Muestra contrase??a con un alert si el evento no existe. //Cambiar por libreria
    bgHeroSlideContainer.classList.add("none");
    callToast("Registro Completado Correctamente")
} else {
  callAlerty ("","Ha surgido un problema, vuelva a intentarlo","error",'OK')
}
});

//--> Loging after signIn
function loginToEventAfterSignIn() {
  let newEventForm = document.getElementById("newEventForm");
  let user = newEventForm.eventName.value;

  for (const event of events) {
    if (event.eventName == user) {
      eventFound = event;
      eventFound.status = true;

      setTimeout(() => {
        sectionEventPanel.classList.remove("none");
        sectionMainHeader.classList.add("none");
        sectionLogin.classList.add("none");
        sectionHome.classList.add("none");
        sectionNewEvent.classList.add("none");
      }, 2000);
      loginForm.reset();
      return;
    }
  }
}

//--> Loging on formLogin
function loginToEvent() {
  let user = loginForm.user.value;
  let password = loginForm.password.value;

  for (const event of events) {
    if (event.eventName == user && event.password == password) {
      errorMessageValidationLogIng.innerHTML = "";
      eventFound = event;
      callToast (`Event Found: ${eventFound.eventName}`);
      eventFound.status = true;

      setTimeout(() => {
        sectionEventPanel.classList.remove("none");
        sectionMainHeader.classList.add("none");
        sectionLogin.classList.add("none");
        sectionHome.classList.add("none");
        sectionNewEvent.classList.add("none");
        bgHeroSlideContainer.classList.add("none");
      }, 2000);
      loginForm.reset();
      showEvent(); //html Inner call
      return;
    }
  }
  callAlerty("", "Event Name or Password are incorrect, try again",
  "error", "Retry");
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginToEvent();
});

//--> Deslogeo
function deslogeo() {
  let btnLogout = document.getElementById("btnLogout");

  btnLogout.addEventListener("click", () => {
    eventFound.value = false;
    eventFound = undefined;
    setTimeout(() => {
      sectionEventPanel.classList.add("none");
      sectionHome.classList.remove("none");
      sectionMainHeader.classList.remove("none");
      bgHeroSlideContainer.classList.remove("none");
    }, 1000);
    callToast("Log Out Completed")
  });
}

//--> Modal Panel
function showEvent() {
  sectionEventPanel.innerHTML = `
  <div>
  <p class="logo">PromoList</p>
  <div class="fixed">
    <button id="deleteEvent" class="btn btn-delete">Delete</button>
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
  <li>Avalibres:${caclTicketsDifference()}</li>
  <li>Selled:${sellTickets()}</li>
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
  deslogeo(); //activa la funcion del btn LogOut
  updateEvent ();
}

//A??ade los eventos a la section eventos

function addEventToSectionEvents() {
  events.forEach((element) => {
    eventsGallery.innerHTML += `
    <div class="gallery_container">
      <div class="gallery-item">
        <div class="image" onclick="OnClickEventCard ()">  
            <img src="${element.cartelOfEvent}" alt="cartel ${
      element.eventName
    }">
        </div>
        <div class="text"> 
        <div class="ticket-container">
        <div class="ticket-name__container ticket-item">
          <div class="ticket__name">
            <p>${element.eventName}</p>
          </div>
        </div>
        <div class="ticket-text__container ticket-item">
          <div class="ticket__description">
            <p>
            ${element.description}cartelOfEvent
            </p>
          </div>
          <div class="ticket__dateOfEvent">
            <p>Date of Event: ${element.eventName} <br> ${
      element.date.split("-")[2]
    }/${element.date.split("-")[1]}/${element.date.split("-")[0]}</p>
          </div>
          <div class="ticket__id">
            <p>Tickets Avalibles: ${element.totalTickets}</p>
          </div>
        </div>
        <div class="ticket-email__container ticket-item">
          <div class="ticket__email">
            <p>Contact: ${element.mail}</p>
          </div>
        </div>
      </div>  
        </div>
      </div>  
    </div>
    `;
  });
}
//--> Abre un Alerty para simular la redireccion a la pagina de venta. TEST
function OnClickEventCard () {
   callAlerty ("","Redirigiendo a la pagina de venta","success",'OK')
}

//--> Settings Logic and Form
function updateEvent () {
  let btnSettings = document.getElementById("settings");
  let btnDeleteEvent = document.getElementById("deleteEvent");
  let eventNameOfEventFound = eventFound.eventName;
  
  btnDeleteEvent.addEventListener("click", (e) => {
    e.preventDefault();
    deleteEventFromLocalStg (eventNameOfEventFound);
    callAlertyReload("Event Deleted", `${eventNameOfEventFound}.`, "success",'Reload Page...');
  });

  btnSettings.addEventListener("click", () => {
    sectionEventSettings.classList.remove("none");
      let changeName = settingsEventForm.setEventName.value;
      let changeMail = settingsEventForm.setEventEmail.value;
      let changeDescription = settingsEventForm.setDescription.value;
      let btnBackToEventFromSettings = document.getElementById("btnBackToEventFromSettings");

      btnBackToEventFromSettings.addEventListener("click", () => {
        sectionEventSettings.classList.add("none");
      });

      btnEventSettings.addEventListener ("click", (e)=> {
        deleteEventFromLocalStg (eventNameOfEventFound)
        e.preventDefault();
        eventFound.eventName = changeName;
        eventFound.mail = changeMail;
        eventFound.description = changeDescription;
        saveInLocalStorage(eventFound); //guarda un nuevo objeto con los cambios realizados
        callAlertyReload("Update Completed", `${changeName} is the new name of the event.`, "success",'Loading...');
      });
  });
}

//--> Delete all Events From Array: events
function deleteEvent () {
 return events.length = 0
}

function deleteEventFromLocalStg (keyOBJ) {
  localStorage.removeItem(keyOBJ);
}


/*              -->>    DATES    <<--           */
//Devuelve la fecha actual en un formato comparable.
function ActualFullDate() {
  let nowDate = new Date();
  let nowDateDay = nowDate.getDate();
  let nowDateMonth = nowDate.getMonth() + 1;
  let nowDateYear = nowDate.getFullYear();
  let fullDate = nowDateYear + nowDateMonth + nowDateDay;
  return fullDate;
}

let regex = /(\d+)/g; 
//Crea un nuevo array con los eventos que no superen la fecha actual
function lookdatesevents () { 
  const newArray = [];
  for (const event of events) {
    let resumeDateForCompare =  Number(event.date.match(regex)[0])+Number(event.date.match(regex)[1])+Number(event.date.match(regex)[2]);
    let actualEvents = events.filter((event), ActualFullDate() > resumeDateForCompare);
  }
  return actualEvents;
}
 
/*  -->>  OPEN AND CLOSE SECTION EVENTLISTENER  <<--  */

function openSection(
  btn,
  sectionToOpen,
  sectionToClose,
  sectionToCloseOptional,
  funcionality
) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    funcionality;
    sectionToOpen.classList.remove("none");
    sectionToClose.classList.add("none");

    try {
      sectionToCloseOptional.classList.add("none");
    } catch (error) {
      return console.log(
        error +
          ": " +
          "%cValor sectionToCloseOptional no definida en la llamada.",
        "color: green;"
      );
    }
  });
}

function closeAllSections() {
  const SECTIONS = Array.from(document.querySelectorAll("section"));
  for (const section of SECTIONS) {
    section.classList.add("none");
  }
}

/*  -->>   MESSAGES ERROR/SUCCESFULL   <<--  */

//--> Toastify library

function callToast (message) {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right,var(--color-secundary), var(--color-terciary))",
      color: "var(--color-primary)",
    },
    onClick: function(){} // Callback after click
  }).showToast();    
}

//--> SweetAlert library
function callAlerty (title,text,icono,confirmBtn) {
  Swal.fire({
    title: title,
    text: text,
    icon: icono,
    confirmButtonText: confirmBtn,
  })
}
//--> SweetAlert with then condition to reload
function callAlertyReload (title,text,icono,confirmBtn) {
  Swal.fire({
    title: title,
    text: text,
    icon: icono,
    confirmButtonText: confirmBtn,
  }).then (() => {
    location.reload();
  })
}

/*  -->>  FORM VALIDATIONS  <<--  */
 
 function validationString () {
   let user = newEventForm.eventName;
   user.addEventListener("change", () => {
    if (user.value.replace(/\s+/g, '').length == 0 || user.value == null) {
      errorMessageValidationSignIn.innerHTML = "";
      errorMessageValidationSignIn.innerHTML += "Please Introduce a name";
      user.classList.add("inputStatusOff");
      return statusValidationForm_String = false;
    } else if (user.value.length < 3 || user.value.length > 30) {
      errorMessageValidationSignIn.innerHTML = "";
      errorMessageValidationSignIn.innerHTML += "Name cant not be more than 30 or less than 3";
      user.classList.add("inputStatusOff");
      return statusValidationForm_String = false;
    } else {
      errorMessageValidationSignIn.innerHTML = "";
      user.classList.remove("inputStatusOff");
      user.classList.add("inputStatusOk");
      statusCalc ();
      statusValidationForm_String = true;
    }
   });
   return statusValidationForm_String;
 }


function validationMail () {
  let email = newEventForm.eventEmail;
  email.addEventListener("change", () => {
   if (email.value.replace(/\s+/g, '').length == 0 || email.value == null) {
     errorMessageValidationSignIn.innerHTML = "";
     email.classList.add("inputStatusOff");
     errorMessageValidationSignIn.innerHTML += "Please Introduce a Mail";
     return statusValidationForm_Mail = false;
   } else if (email.value.length < 5 || email.value.length > 40) {
     errorMessageValidationSignIn.innerHTML = "";
     errorMessageValidationSignIn.innerHTML += "Mail cant not be more than 40 or less than 5";
     email.classList.add("inputStatusOff");
     return statusValidationForm_Mail = false;
    } else if (!email.value.includes("@") || !email.value.includes(".")) {
    errorMessageValidationSignIn.innerHTML = "";
    errorMessageValidationSignIn.innerHTML += "Mail no valido";
    email.classList.add("inputStatusOff");
    return statusValidationForm_Mail = false;
   } else { 
     errorMessageValidationSignIn.innerHTML = "";
     email.classList.remove("inputStatusOff");
     email.classList.add("inputStatusOk");
     statusCalc ();
     return statusValidationForm_Mail = true;
   }
   
  });
  return statusValidationForm_Mail;
}


function validationUrl () {
  let url = newEventForm.cartel;
  url.addEventListener("change", () => {
   if (url.value.replace(/\s+/g, '').length == 0 || url.value == null) {
     errorMessageValidationSignIn.innerHTML = "";
     url.classList.add("inputStatusOff"); 
     errorMessageValidationSignIn.innerHTML += "Please Introduce a Url";
     return statusValidationForm_Url = false;
   } else if (url.value.length < 10 || url.value.length > 300) {
     errorMessageValidationSignIn.innerHTML = "";
     errorMessageValidationSignIn.innerHTML += "Url cant not be more than 300 or less than 10";
     url.classList.add("inputStatusOff"); 
     return statusValidationForm_Url = false;
    } else {
     errorMessageValidationSignIn.innerHTML = "";
     url.classList.remove("inputStatusOff"); 
     url.classList.add("inputStatusOk"); 
     statusCalc ();
     return statusValidationForm_Url = true;
   }
 
  });
  return statusValidationForm_Url;
}

 function validationTexarea () {
   let inputTexarea = newEventForm.description;
  inputTexarea.addEventListener("change", () => {
    if (inputTexarea.value.replace(/\s+/g, '').length == 0 || inputTexarea.value == null) {
      errorMessageValidationSignIn.innerHTML = "";
      inputTexarea.classList.add("inputStatusOff"); 
      errorMessageValidationSignIn.innerHTML += "Please Introduce a description";
      return statusValidationForm_Texarea = false;
    } else {
      errorMessageValidationSignIn.innerHTML = "";
      inputTexarea.classList.remove("inputStatusOff"); 
      inputTexarea.classList.add("inputStatusOk"); 
      statusCalc ();
      return statusValidationForm_Texarea = true;
    }
    });
  return statusValidationForm_Texarea
}; 

function statusCalc () {
  checkIfValidationIsOk = statusValidationForm_String + statusValidationForm_Mail + statusValidationForm_Url + statusValidationForm_Texarea;
  return console.log(checkIfValidationIsOk);
}




/*  -->>  CALCULATIONS OF TICKETS DIFERRENCE  <<--  */

//--> Diferencia entre tickets totales y vendidodos
function caclTicketsDifference() {
  const totalTickets = parseInt(eventFound.totalTickets);
  let difference = totalTickets - sellTickets();
  return difference;
}

//--> Acumular los ticket vendidos acorde a los clientes totales.
function sellTickets() {
  let sellTickets = 2; //provisional hasta aprender base de datos
  return sellTickets;
}

/*  -->>  RANDOM PASSWORD/ID  <<--  */
//-> Create random serial
function randomPassword() {
  //Funcion Copiada, genera una clave random
  return "_" + Math.random().toString(36).substr(2, 9);
}

/*  -->>  SAVE STORAGE  <<--  */
//--> Carga el contenido de todo el local Storage y lo guarda en el array events
function pushLocalStorageToArray() {
  let keys = Object.keys(localStorage),
    i = keys.length;

      while (i--) {
        events.push(JSON.parse(localStorage.getItem(keys[i])));
      }
  return events;
}

function saveInLocalStorage(arrayObJ) {
  localStorage.setItem(arrayObJ.eventName, JSON.stringify(arrayObJ));
}

/*  -->>  HERO BACKGORUND SLIDER AUTO  <<--  */
//--> Auto Bg images
function CambiarBG()  {
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
    i >= BGIMGS.length
      ? (i = 0)
      : (bgSliderStyles.background =
          "linear-gradient(to bottom, rgba(18,42, 66, .65), rgba(18,42, 66, .65))," +
          BGIMGS[i]);
    bgSliderStyles.backgroundSize = "cover";
    bgSliderStyles.backgroundRepeat = "no-repeat";
    i++;
  }
  setInterval(changeBg, 3500);
}

