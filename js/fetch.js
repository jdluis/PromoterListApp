fetch('./db_events.json')
    .then( (red) => res.json() )
    .then( (data) => {
        data.forEach(event => {
            const li = document.createElement('li')
            li.innerHTML = `
                <h4>${event.eventName}</h4>
                <img url= ${event.cartelOfEvent}>
                <p>${event.mail}</p> 
                <p>${event.date}</p> 
                <p>${event.totalTickets}</p> 
            `
            
        });
    })