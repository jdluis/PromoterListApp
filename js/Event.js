export const testEvent = console.log("Event File Loaded");

export default  class Evento {
    constructor(eventName, date, category, country, totalTickets, cartelOfEvent, description, promoters, clients) {
      this.eventName = eventName;
      this.date = date;
      this.category = category;
      this.country = country;
      this.totalTickets = totalTickets;
      this.cartelOfEvent = cartelOfEvent;
      this.description = description;
      this.promoters = promoters;
      this.clients = clients; //¿DEBERIA PONERLO AQUI O POR FUERA?
    }
  }
  