console.log("styles-details.js loaded")

const usersArray = "https://mindhub-xj03.onrender.com/api/amazing";
let events = [];

const fetchData = () => {
  fetch(usersArray) 
    .then(response => response.json())
    .then(data => {
      events = data.events;
      console.log(events);

      let query = location.search //guarda la cadena de consulta
      let params = new URLSearchParams(query) //guarda el objeto para obtener los valores de query
      let idParams = params.get("id") //guarda el valor id del query
      let profile = events.find(info => info._id == idParams) //guarda el objeto de events en profile.

      const container = document.getElementById("card-details"); //id de la tarjeta de detalles.
      let body = "";

      body += `
        <div class="col-md-7 order-md-2 my-5">
          <h2 class="featurette-heading fw-normal ">${profile.name}</h2>
          <p class="lead">${profile.description}</p>
          <p class="lead">Capacity: ${profile.assistance || profile.estimate}</p>  
          
          <p class="lead">Place: ${profile.place} </p>
        </div>
        <div class="col-md-5 order-md-1">
          <img src="${profile.image}" class="card-img-top" alt="${profile.date}" width="300" height="300">  
        </div>
      `
      container.innerHTML = body
    })
};
fetchData();

