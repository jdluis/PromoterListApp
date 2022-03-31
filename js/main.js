import Evento, {testEvent} from "./Event.js";
import Promotor, {testPromotor} from "./Promotor.js";
import Client, {testClient} from "./Client.js";



/*CONSOLE PARA TESTING*/
console.log("Testing App List PROM by jdluis");




/*HEVO BACKGORUND SLIDER AUTO*/



 const COLORS = ["#000", "#146", "#564", "#712"];
let i = 0;
function changeColor() {
  document.getElementById("bgHeroSlide").style.backgroundColor = COLORS[i];
  i++
  if (i > COLORS.length) {
    i = 0
  };
   setInterval('changeColor()',4000);

}


changeColor();

