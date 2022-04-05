  //Funtion for open and close sections
  export function openForm(btn, sectionToOpen, sectionToClose) {
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
    let eventPanelSection = document.getElementById('eventPanelSection');
    let eventPanelConfig = document.getElementById('eventPanelConfig');
  
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      sectionToOpen.classList.remove("none");
    });
  
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      sectionToClose.classList.add("none");
    });
  }
  