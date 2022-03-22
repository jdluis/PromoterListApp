
//Declaracion de variables
let adminLog;
let promotorLog;

//DOM
let submitAdmin = document.getElementById('signinForm');
let loginUser = document.getElementById('loginForm');
let clientForm = document.getElementById('clientFormSubmit');
let adminPanel = document.getElementById('adminPanel');
let promotorPanel = document.getElementById('promotorPanel');
let submitLoginBtn = document.getElementById('submitLoginBtn');
let signInAdminBtn = document.getElementById('signInAdminBtn');
let logOutBtn = document.getElementById('logOutBtn');

/*ARRAYS*/
const admins =[];
const promotores = [];
const clientes = [];

/*EVENTOS*/ 
//Activa el evento cuando damos click en el boton de Login
submitLoginBtn.addEventListener("click", () => {
  event.preventDefault();

  for (let i = 0; i < admins.length; i++) {
    if (adminLog == true || promotorLog == true) {
      console.log("Error de inicio de sesion, ya existe un usuario logeado, deslogeate primero");
    } else {
      admins[i].Login();
    }
  }
} );

//Llama a la funcion registro cuando damos click en el boton de Registro
signInAdminBtn.addEventListener("click", () => {
  event.preventDefault(); //Previene que se recargue la pagina, por ahora para evitar que se pierdan datos
  return signInAdmin();
});

//Nos Deslogea cuando damos click en el boton de logOut
logOutBtn.addEventListener("click", () => {
  event.preventDefault();

  for (let i = 0; i < admins.length; i++) {
    if (adminLog == false || promotorLog == false) {
      console.log("No hay ningun usuario logeado");
    } else {
      admins[i].Logout();
    }
  }
} );

/*REGLAS PARA VISUALIZAR CADA SECTION O PAGINA*/




/*************
 ///FUNCIONES////// 
 **************/
    /*Permite registrar un nuevo admin */
   function signInAdmin() {
     let newAdmin = new Admin(
      submitAdmin[0].value,
      submitAdmin[1].value,
      submitAdmin[2].value,
      submitAdmin[3].value,
     );

     for (let i = 0; i < admins.length; i++) {
      if (submitAdmin[0].value == admins[i].userName) {
        console.log("Elige otro nombre de usuario");
        break;
      }
    }  
      admins.push(newAdmin);
       alert("Admin registrado sadisfactoriamente"),
       console.log(`Se ha registrado correctamente. Su Nombre para ingresar es: ${newAdmin.userName}, el nombre de su evento es: ${newAdmin.eventName}, y su pass: ${newAdmin.password}`)
     submitAdmin.reset();
    }    

/*************
 ///CLASES////// 
 **************/

//Creo que existia el extend pero no lo entiendo del todo aun, ya que si lo extiendo a la clase promotor, no estoy seguro de si todos los metodos se me pasan directamente
// O si en el caso de que fuera asi como podria impedir que se pasen algunos metodos.

class Admin {
    constructor(userName,password,mail,eventName) {
      this.userName = userName;
      this.password = password;
      this.mail = mail;
      this.eventName =eventName;
    }    

    Login() {
      userName = loginUser[0].value;
      password = loginUser[1].value;
      
      if (this.userName == userName && this.password  == password) {
        adminPanel.classList.remove('none');  
        console.log("Login realizado correctamente");
        alert("Bienvenido " + userName);
        loginUser.reset(); //Limpia el formulario despues de haber logeado
        return (adminLog = true);
      } else {
        alert("No se ha podido logear, consulte el log");
        console.log(
          "Los datos introducidos no corresponden con ningun Administrador"
          );  
          return (adminLog = false);
        }  
      }  
      
      //Simplemente uniendolo a un boton o algo funcionaria para cambiar el estado de log
      Logout() {
        event.preventDefault();
        alert("Te has deslogeado correctamente"); 
        adminLog = false;
        console.log("Admin " + userName + " deslogeado");
        adminPanel.classList.add('none');
        alert("Admin " + userName + " deslogeado");
      }  
      
      
      addPromotor() {    
      let newPromotor = new Promotor(
        prompt("Indique el nombre de usuario que deseé"),
        prompt("Indique una constraseña"),
       );
       promotores.push(newPromotor);
  
       alert("Promotor registrado sadisfactoriamente"),
       console.log(`Se ha registrado correctamente. Su Nombre para ingresar es: ${newPromotor.userName}, y su pass: ${newPromotor.password}`)
    } 
  };
    
    class Promotor {
      
      constructor(userName,password) {
        this.userName = userName;
        this.password = password;
      }    
      
      //Metodo del Promotor para logearse a su cuenta
      Login() {
        let userName = prompt("Introduzca su nombre");
        let password = prompt("Introduzca su contraseña");
        
        if (this.userName == userName && this.password  == password) {
          console.log("Login realizado correctamente");
          alert("Bienvenido " + userName);
          return (promotorLog = true);
        } else {
          alert("No se ha podido logear, consulte el log");
          console.log(
            "Los datos introducidos no corresponden con ningun Administrador"
            );  
            return (promotorLog = false);
          }  
        }  
        
        //Simplemente uniendolo a un boton o algo funcionaria para cambiar el estado de log
        Logout() {
        alert("Te has deslogeado correctamente"); 
        console.log("Admin " + userName + " deslogeado");
        return (promotorLog = false);
      }  

      
      addClient(newClient) {  //Quiero que al crearse un cliente este se una al array clientes de ese promotor
        newClient = new Client();
        clientes.push(newClient);
      }    
      
      mostrarClientes() {
        for (const cliente of clientes) {
          console.log(`El cliente ${cliente} se ha cargado correctamente`)
        }            
      }    
      
      eliminarCLiente(){
        //Realizar codigo para eliminar un cliente de un array.
      }    
    };    
    
    
    
    class Client {
      constructor(fullName,email, country, phoneNumber, processStatus) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.processStatus = processStatus;
      }
    };    
    
    
    /*********************************
     * DATOS TEMPORALES/DEMOS/PRUEBAS *
     * ******************************/

    /*Datos provicionales del administrador principal*/
    let adminName = "007";
    let adminPass = "2211";


    /*CONSOLE PARA TESTING*/ 
    console.log("Testing App List PROM by jdluis");
    
