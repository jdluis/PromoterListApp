/*  -->>   CONSOLE PARA TESTING        <<--  */
console.log("Testing App List PROM by jdluis");

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
let btnBackToAboutFromSingIn = document.getElementById("btnBackToAboutFromSingIn");
let btnBackToAboutFromLogin = document.getElementById("btnBackToAboutFromLogin");
let btnLogin = document.getElementById("btnLogin");
let btnCreateEvent = document.getElementById("btnCreateEvent");
let btnNavEvents = document.getElementById("btnNavEvents");
let btnNavHome = document.getElementById("btnNavHome");
let btnBackOfSectionEvents = document.getElementById("btnBackOfSectionEvents");


//--> Sections
let  bgHeroSlideContainer = document.getElementById('bgHeroSlide');
let sectionNewEvent = document.getElementById("sectionNewEvent");
let sectionHome = document.getElementById("sectionHome");
let sectionLogin = document.getElementById("sectionLogin");
let sectionEventPanel = document.getElementById("sectionEventPanel");
let sectionEventPanelConfig = document.getElementById("sectionEventPanelConfig");
let sectionMainHeader = document.getElementById("sectionMainHeader");
let sectionEvents = document.getElementById("sectionEvents");
let eventsGallery = document.getElementById('eventsGallery');

//--> Forms
let loginForm = document.getElementById("loginForm");

/*  -->>         INITIATIONS          <<--  */

// Connection to local API: db_events.json
const requestDefaultEvents = async () => {
 await fetch('./db_events.json')
    .then( (res) =>  res.json() )
    .then( (data) => {
        data.forEach(event => {
          saveInLocalStorage(event);
          });
    })};

InitApp();

function InitApp() {
  CambiarBG(); //AutoSlider for BG images

  //abrir y cerrar secciones
  openSection(btnOpenFormNewEvent, sectionNewEvent, sectionHome,sectionMainHeader);
  openSection(btnToLoginSection, sectionLogin, sectionHome,sectionMainHeader);
  openSection(btnNavEvents, sectionEvents, sectionHome,sectionMainHeader);
  openSection(btnBackToAboutFromSingIn, sectionHome, sectionNewEvent);
  openSection(btnBackToAboutFromLogin, sectionHome, sectionLogin);
  openSection(btnBackToAboutFromSingIn, sectionMainHeader, sectionNewEvent);
  openSection(btnBackToAboutFromLogin,sectionMainHeader, sectionLogin);
  openSection(btnBackOfSectionEvents, sectionHome, sectionEvents);
  openSection(btnBackOfSectionEvents, sectionMainHeader, sectionEvents);

  resetMessage(); //Resetea el mensaje de error cuando le damos al btn back del login.
  requestDefaultEvents();
  signInNewEvent();

  //Cargar en el array el localStorage
  allStorage(); 
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

/*  -->>  EVENT: Sign In, Login, LogOut  <<--  */

//--> Event and Init create New Event.
function signInNewEvent() {
  btnCreateEvent.addEventListener("click", (e) => {
    e.preventDefault();
    createNewEvent();
  });
}

//--> New Object Event Creation
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
    console.log("Este Admin Ya esta registrado, pruebe con otro nombre");//Cambiar por libreria
    eventAlreadyExist = true;
  } else {
    saveInLocalStorage(newEvent);
    events.push(newEvent); //Esto es para guardar en array
    console.log(
      `Se ha registrado correctamente. Su Nombre para ingresar es: ${newEvent.eventName},su contraseña es ${newEvent.password}`
    );
    console.log("Se ha registrado correctamente."); //Cambiar por libreria
    eventAlreadyExist = false;
    loginToEventAfterSignIn();
    eventAlreadyExist == false
      ? showPassword()
      : console.log("No se mostro la contraseña");
    showEvent(); //Muestra contraseña con un alert si el evento no existe. //Cambiar por libreria
    alert("Evento registrado correctamente"); //Temporal, //Cambiar por libreria
  }
}

function showPassword() {
  return alert(eventFound.password); ///SUSTITUOT POR FRAMEWORK
}

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
        messagesForm(msgLoginPass, "", "none"); //restard messages
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
      eventFound = event;
      messagesForm(
        msgLoginPass,
        `Evento encontrado: ${eventFound.eventName}`,
        colorSuccess
      );
      eventFound.status = true;

      setTimeout(() => {
        sectionEventPanel.classList.remove("none");
        sectionMainHeader.classList.add("none");
        sectionLogin.classList.add("none");
        sectionHome.classList.add("none");
        sectionNewEvent.classList.add("none");
        bgHeroSlideContainer.classList.add("none");
        messagesForm(msgLoginPass, "", "none"); //restard messages
      }, 2000);
      loginForm.reset();
      return;
    }
  }
  messagesForm(
    msgLoginPass,
    "Event Name or Password are incorrect, try again",
    colorError
  );
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginToEvent();
  showEvent(); //html Inner call
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
    messagesForm(msgLogOut, "Log Out Completed", colorSuccess);
  });
}

//--> Modal Panel 
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
}

//Añade los eventos a la section eventos
addEventToSectionEvents();
function addEventToSectionEvents () {
  events.forEach(element => {
    eventsGallery.innerHTML += `
    <div class="gallery_container">
      <div class="gallery-item">
        <div class="image"> 
            <img src="${element.cartelOfEvent}" alt="cartel ${element.eventName}">
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
            <p>Date of Event: ${element.eventName} <br> ${element.date.split('-')[2]}/${element.date.split('-')[1]}/${element.date.split('-')[0]}</p>
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
    `
  });
};
    
    

/*              -->>    DATES    <<--           */
//Devuelve la fecha actual en un formato comparable.
function ActualFullDate () {
  let nowDate = new Date;
  let nowDateDay = nowDate.getDate();
  let nowDateMonth = nowDate.getMonth() + 1;
  let nowDateYear = nowDate.getFullYear();
  let fullDate = nowDateYear + nowDateMonth + nowDateDay;
  return fullDate;  
}

//MIRAR COMO PUEDO COMPARAR LAS DOS FECHAS
/* let regex = /(\d+)/g;
//Crea un nuevo array con los eventos que no superen la fecha actual
function lookdatesevents () { 
  let newArray = [];
  for (const event of events) {
    let resumeDateForCompare =  Number(event.date.match(regex)[0])+Number(event.date.match(regex)[1])+Number(event.date.match(regex)[2]);
    if (ActualFullDate() > resumeDateForCompare){
      resumeDateForCompare == undefined ? newArray.splice[event] : newArray.push[event];
    }
  }
  return newArray;
}
 */
/*  -->>  OPEN AND CLOSE SECTION EVENTLISTENER  <<--  */

function openSection(btn, sectionToOpen, sectionToClose, sectionToCloseOptional, funcionality) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    funcionality;
    sectionToOpen.classList.remove("none");
    sectionToClose.classList.add("none");

    try {
      sectionToCloseOptional.classList.add("none");
    } catch (error) {
      return console.log(error + ": " + '%cValor sectionToCloseOptional no definida en la llamada.', 'color: green;');
    }
  });
}

function closeAllSections () {
  const SECTIONS = Array.from(document.querySelectorAll("section"));
  for (const section of SECTIONS) {
    section.classList.add("none");
  }
}

/*  -->>   MESSAGES ERROR/SUCCESFULL   <<--  */
//--> Show
function messagesForm(label, message, textColor) {
  //--> Messages

let msgLoginName = document.getElementById("msgLoginName");
let msgLoginPass = document.getElementById("msgLoginPass");
let msgLogOut = document.getElementById("msgLogOut");
  label.style.color = textColor; //messageColor
  label.innerText = message; //message text
}
//--> Reset
function resetMessage() {
  btnBackToAboutFromLogin.addEventListener("click", () => {
    messagesForm(msgLoginPass, "", colorError);
  });
}


/*  -->>  CALCULATIONS OF TICKETS DIFERRENCE  <<--  */

//--> Diferencia entre tickets totales y vendidodos
function caclTicketsDifference() {
  const totalTickets = parseInt(eventFound.totalTickets);
  let difference = totalTickets - sellTickets();
  return difference;
}

//--> Acumular los ticket vendidos acorde a los clientes totales (No finalizada)
function sellTickets() {
  let sellTickets = 2; //provisional para pruebas
  return sellTickets;
}

/*  -->>  RANDOM PASSWORD/ID  <<--  */
//-> Create random serial
function randomPassword() {
  //Funcion Copiada, intentar ENTENDER.
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

/*  -->>  SAVE STORAGE  <<--  */
//--> Carga el contenido de todo el local Storage y lo guarda en el array admins
function allStorage() {
  let keys = Object.keys(localStorage),
  i = keys.length;
  
  while (i--) {
    events.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return events;
}

  /*  -->>  HERO BACKGORUND SLIDER AUTO  <<--  */
  //--> Auto Bg images
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


 

    
    


    function saveInLocalStorage (arrayObJ) {
      localStorage.setItem(arrayObJ.eventName, JSON.stringify(arrayObJ));
    }