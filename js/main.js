import Evento, { testEvent } from "./Class/Event.js";
import Promotor, { testPromotor } from "./Class/Promotor.js";
import Client, { testClient } from "./Class/Client.js";
import {CambiarCG} from "./functions/autoSlider.js";

/*CONSOLE PARA TESTING*/
console.log("Testing App List PROM by jdluis");



//INIT FUNCTIONS
CambiarCG();


/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });