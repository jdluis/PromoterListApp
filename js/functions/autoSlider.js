/*HERO BACKGORUND SLIDER AUTO*/

export function CambiarBG() {
  const BGIMGS = [
    "url(/media/bg-family.png)",
    "url(/media/bg-sport.jpg)",
    "url(/media/bg-others.jpg)",
    "url(/media/bg-dance.jpg)",
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
    bgSliderStyles.background = "linear-gradient(to bottom, rgba(18,42, 66, .65), rgba(18,42, 66, .65)),"  + BGIMGS[i];
    bgSliderStyles.backgroundSize = "cover";
    bgSliderStyles.backgroundRepeat = "no-repeat";

    i++;
  }

  setInterval(changeBg, 3500);
}
