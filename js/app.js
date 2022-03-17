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

/* Me gustaria incluir que exista un Admin Global que al logearse si es un admin aparecera
como tal en la pagina y con sus funciones, en vez de la de un promotor, ademas  el cual sea el que cree los promotores que se necesite y les de un nombre y una constraseña, 
que pueda eliminarlos tambien y modificar sus clientes o añadir otros, tambien sera el que cambie el estado dee cada cliente de Pendiente a Confirmado o Cancelado.*/


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

