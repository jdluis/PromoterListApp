
export class Promotor {
    constructor(userName, password) {
      this.userName = userName;
      this.password = password;
    }
  
    //Metodo del Promotor para logearse a su cuenta
    Login() {
      let userName = prompt("Introduzca su nombre");
      let password = prompt("Introduzca su contraseña");
  
      if (this.userName == userName && this.password == password) {
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
  
    /* */
    addClient(newClient) {
      //Quiero que al crearse un cliente este se una al array clientes de ese promotor
      newClient = new Client();
      clientes.push(newClient);
    }
  
    mostrarClientes() {
      for (const cliente of clientes) {
        console.log(`El cliente ${cliente} se ha cargado correctamente`);
      }
    }
  
    eliminarCLiente() {
      //Realizar codigo para eliminar un cliente de un array.
    }
  }
  

export class Admin {
  constructor(eventName, userName, mail, password) {
    // this.id = uniqueId(); //Llama a la funcion para crear un numero distinto cada vez/ Desactivado hasta que funcione correctamente lo demas.
    this.eventName = eventName;
    this.userName = userName;
    this.mail = mail;
    this.password = password;
    // this.promotores = signInPromotors(); Creare una funcion para guardar aqui los datos de los promotores
  }

  addPromotor() {
    let newPromotor = new Promotor(
      prompt("Indique el nombre de usuario que deseé"),
      prompt("Indique una constraseña")
    );
    promotores.push(newPromotor);

    alert("Promotor registrado sadisfactoriamente"),
      console.log(
        `Se ha registrado correctamente. Su Nombre para ingresar es: ${newPromotor.userName}, y su pass: ${newPromotor.password}`
      );
  }
}


export class Client {
  constructor(fullName, email, country, phoneNumber, processStatus) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.processStatus = processStatus;
  }
}
