import Event, {events, testEvent, signInNewEvent, createNewEvent,eventFound,loginToEvent, logOut } from "./Class/Event.js";
import Promotor, { testPromotor } from "./Class/Promotor.js";
import Client, { testClient } from "./Class/Client.js";
import { CambiarBG } from "./functions/autoSlider.js";
import { openForm } from "./functions/btnActions.js"

/*CONSOLE PARA TESTING*/
console.log("Testing App List PROM by jdluis");




//INIT FUNCTIONS
InitApp();
function InitApp () {
  allStorage(); //Cargar en el array el localStorage
  CambiarBG(); //AutoSlider for BG images
  openForm(btnOpenFormNewEvent, newEventSection, aboutSection); //ID: form,sectionToOpen, sectionToClose)
  openForm(btnBackToAbout, aboutSection, newEventSection);
  openForm(btnBackToAboutFromLogin, aboutSection, loginSection);
  openForm(btnToLoginSection, loginSection, aboutSection);
  signInNewEvent();
  loginToEvent();
  
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load("particles-js", "assets/particles.json", function () {
    console.log("callback - particles.js config loaded");
  });
  allStorage();
}

  //Carga el contenido de todo el local Storagw y lo guarda en el array admins
  function allStorage() {
    let keys = Object.keys(localStorage), i = keys.length;
    
    while (i--) {
      events.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return events;
  }







