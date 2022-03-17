//Declaracion de variables
let adminLog;
let promotorLog;


/*Datos provicionales del administrador principal*/
let adminName = "007";
let adminPass = "2211";

/*Permite identificar cuando un Admin se ha logeado, devolviendo el valor true a la variable adminLogin, para mas adelante mostrar algo con ella*/
function signInAdmin() {
  adminName = prompt("Introduzca su nombre");
  adminPass = prompt("Introduzca su contraseña");
  alert("Admin registrado sadisfactoriamente");
  console.log("Se ha registrado correctamente el admin: " + adminName);
}






/*************
///CLASES//////
**************/

//Creo que existia el extend pero no lo entiendo del todo aun, ya que si lo extiendo a la clase promotor, no estoy seguro de si todos los metodos se me pasan directamente
// O si en el caso de que fuera asi como podria impedir que se pasen algunos metodos.
class Admin {
    constructor(userName,password) {
        this.userName = userName;
        this.password = password;
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

      
      addPromotor(newPromotor) {  //Quiero que al crearse un cliente este se una al array clientes de ese promotor
        newPromotor = new Client()
    }
}

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
        newClient = new Client()
    }
};



class Client {
    constructor(fullName,email, country, phoneNumber) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
    }
};


/*DATOS TEMPORALES/DEMOS*/

let promotor1 = new Promotor ("Dani", "123");
promotor1.Login();

let client1 = new Client ("Jose Antonio Jesus", "joseantonio@gmail.com", 608991469);
let client2 = new Client ("Paco Antonio Jesus", "joseantonio@gmail.com", 608991469);
let client3 = new Client ("Lauro Antonio Jesus", "joseantonio@gmail.com", 608991469);

/*ARRAYS*/
const promotores = [promotor1]
const clientes = [client1, client2, client3];




/*CONSOLE PARA TESTING*/ 
console.log(clientes);

