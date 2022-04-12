# PromoterListApp
## Ticket sales app by promoters | By jdluisdev --> https://jdluis.com/
### last update: 29 mar 2022
                /*ENGLISH*/

Application for any type of event that has promoters.
In this example case, the intention is to create said app in relation to a festival that sells event tickets through promoters.

## App features:
- Creation of Admin for the event.
- Creation of new promoters through the admin
- Login by password and user provided by the Administrator.
- Promoter Panel with a Form where you can fill in a table with the new client.
- Create, edit and delete table not confirmed by the main Admin.
- Status of the new client to review by the Admin.
- Table with: Full Name, email, phone number, status (Pending, Denied or Confirmed).

##AlphaVersion:

- Allows to register new events correctly
- You can connect without problems when loading the new local Storage
- Disconnect correct
- It does not allow to register with the same name
- Does not allow you to connect if you are already connected
- Added error and confirmation messages.
- It is shown when logging in the Event Configuration Panel (Alpha)
- Event gallery section


## Version 1.2
- Sign up for the event (for the next version)


### TESTING/LOG:

- Login: correct;
- Login: correct;
- Registration: correct;
- Prevent user from registering with the same name: correct;

### ERRORS:

- Some error messages are not well configured.
-

### SOLUTION IDEAS:

- Make the program load the data outside the server and not in an array, since it would cause a security flaw when being able to see the passwords and users;
- Add exposure time to correct login messages, or registered user, in the future it is intended to change the page or load dynamic content and the message disappears, perhaps a log can be created on one side of the app for it and go disappear





                 /*ESPAÑOL*/
Aplicación para cualquier tipo de eventos que tenga promotores. 
En este caso de ejemplo se pretende crear dicha app en relación con un festival que vende mediante promotores ticket del evento.

## Funciones de la aplicación:

- Registro de Admin de Evento: Nombre Admin, Correo, Contraseña y nombre del evento.  
- Login y LogOut de admin y promotores.
- Lista de Eventos, con descriocion breve del evento creada por el Admin del evento y boton de solicitar ser promotor de este evento.
- Funciones del Admin: 
 - Crear Promotores, eliminar y modificar
 - Cambiar el estado de un Cliente, registrar clientes nuevos
 - Login y LogOut
- Promotores: Creados por el admin con un id y una constraseña
 - Crear cliente mediante un formulario
 - Panel de Promotor con Formulario donde rellenar una tabla con el nuevo cliente.
 - Crear, editar y eliminar tabla no confirmada por el Admin principal.
 - Estado del nuevo cliente a revisar por el Admin.
 - Boton para solicitar anular un cliente ya confirmado.
 - Tabla con: Nombre Completo, correo, numero telefono, estado (Pendiente, Denegado o Confirmado).

> (La aplicación en modo fácil seria, que al entrar si eres un organizador de x eventos te tuvieras que registrar como tal (nombre de admin, email, contraseña y nombre del evento…(en el futuro quiero añadir que puedan digamos ponerle un fondo personalizado a la página e incluso tablas personalizadas por ellos para sus promotores)). Una vez hecho esto, este mismo podría crear, modificar y eliminar promotores. Dichos promotores podrán rellenar un formulario con los datos de los clientes que vayan consiguiendo, estos datos serian: nombre completo, correo, móvil y estado del trámite del ticket o fullpass (este estará en: Pendiente, Completado o Anulado, dependiendo de si ya pago, pero no ha recibido el ticket o si ya pago y tiene el ticket o si paso algo y se tuvo que anular).

> El promotor una vez creado el perfil del cliente solo podrá modificar datos, solicitando al administrador que lo haga (quizás pueda pensar alguna función para ello), el administrador sera el que verifique que el pago se ha tramitado y que ha enviado el fullpass, cambiando el mismo los estados pendiente a completado. El promotor solo podrá cambiar a anulado en el caso de que siga pendiente, para ponerlo en anulado una vez ya estuviera completado tendría que contactar con el admin del evento.)



## Version Alpha:

- Permite registrar nuevos eventos correctamente
- Puedes conectarte sin problemas al cargar el nuevo local Storage
- Desconectarte correcto
- No permite registrarse con mismo nombre
- No permite que te conectes si ya lo estás
- Se añadieron mensajes de error y de confirmación. 
- Se muestra al logear el Panel de configuracion de evento (Alpha)
- Seccion galeria de eventos


## Version 1.2
- Apuntarse al evento (para version siguiente)



### TESTING/LOG:

- Login: correcto;
- Deslogin: correcto;
- Registro: correcto;
- Impedir que se registre usuario con mismo name: correcto;

### ERRORES:

- Algunos mensajes de error no están bien configurados.
- 

### IDEAS SOLUCIÓN:

- Hacer que el programa cargue los datos por fuera del servidor y no en un array, ya que ocasionaría un fallo de seguridad al poder ver las contraseñas y usuarios;
- Añadir tiempo de exposición a mensajes de login correcto, o usuario registrado, en el futuro se pretende que cambie de página o cargue contenido dinámico y desaparezca el mensaje, quizás se puede crear un log en un lado de la app para ello y que vaya desaparecien.


