
//Declaracion de variables
let adminLog;
let promotorLog;

//DOM
let submitAdmin = document.getElementById('submitForm');
let loginUser = document.getElementById('loginForm');



/*ARRAYS*/
const admins =[];
const promotores = [];
const clientes = [];



/*************
 ///FUNCIONES////// 
 **************/
    /*Permite registrar un nuevo admin */
   function signInAdmin() {
     event.preventDefault(); //Previene que se recargue la pagina, por ahora para evitar que se pierdan datos
     let newAdmin = new Admin(
      submitAdmin[0].value,
      submitAdmin[1].value,
      submitAdmin[2].value,
      submitAdmin[3].value,
     );
     admins.push(newAdmin);

     alert("Admin registrado sadisfactoriamente"),
     console.log(`Se ha registrado correctamente. Su Nombre para ingresar es: ${newAdmin.userName}, el nombre de su evento es: ${newAdmin.eventName}, y su pass: ${newAdmin.password}`)
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
    
