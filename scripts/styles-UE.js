console.log("styles-UE.js loaded");
//datos API.
const usersArray = "https://mindhub-xj03.onrender.com/api/amazing";
let events = []; //se crea una array vacío
let Date = []

const fetchData = () => { //Petición a URL de UserArray
  fetch(usersArray)
    .then(response => response.json())
    .then(data => {
      events = data.events;
      Date = data.currentDate;
      console.log(events);
      showCheckboxes();
      filterAndPaintCards();
      categoriesInputs.forEach(function(item) {
        item.addEventListener("change", function() {
          filterAndPaintCards();
        });
      });
    })
};
fetchData(); //invoca a la función para que el fetch cargue los datos en la página

//div's ID's
const categoriesInputs = document.querySelectorAll(".categories"); //filtra categorias del checkbox.
const searchInput = document.getElementById("search-input"); // filtro de search bar.
const searchMessage = document.getElementById("search-message"); //muestra mensaje que no encontró el evento deseado.
const searchResults = document.getElementById("card-template"); //template de las cartas.
const checkBox = document.getElementById("checkbox-js"); //checkboxes
let UpcomingEvents = [];

function createCheckBox(check, index) { //crea el checkbox de las categorias
  return `
    <div class="form-check form-check-inline">
      <input class="categories" type="checkbox" id="inlineCheckbox${index}" value="${check.category}">
      <label class="food-fair" for="inlineCheckbox${index}">${check.category}</label>
    </div>
  `;
}

function showCheckboxes() { //filtra y crea dinámicamente los checkboxes
  console.log("showCheckboxes", events);
  const uniqueCategories = {};
  let index = 1;
  events.forEach(event => {
    if (!uniqueCategories[event.category]) {
      uniqueCategories[event.category] = true;
      checkBox.innerHTML += createCheckBox(event, index);
      index++;
  }});
  checkBox.addEventListener('change', filterAndPaintCards);
}

function filterAndPaintCards() { //filtra los eventos de las cards.
  const checkedValue = [...document.querySelectorAll('.categories')]
    .filter(input => input.checked)
    .map(input => input.value);
  let filteredStore = events.filter(event => event.date > Date); // filtrar solo eventos con fecha posterior a usersArray[0].currentDate
  if (checkedValue.length > 0) {
    filteredStore = filteredStore.filter(({ category }) => checkedValue.includes(category));
  }
  paintDOM(filteredStore);
}

function generateCardHTML(event) { //genera la card
  return `
    <div class="card m-2" style="width: 19rem">
      <img src="${event.image}" alt="${event.category}" class="card-img-top" height="155" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="lead">${event.date}</p>
      </div>
      <div class="card-footer border-1">
        <div class="d-flex justify-content-between">
          <div class="word">Price: $${event.price}</div>
          <a href="./details.html?id=${event._id}" class="btn btn-danger">See more...</a>
        </div>
      </div>
    </div>
  `;
}

function paintDOM(events) { //muestra la card en la página
  let html = "";
  events.forEach((event) => {
    html += generateCardHTML(event);
    UpcomingEvents.push(event);
  });
  document.getElementById("card-template").innerHTML = html;
}

//filtro del buscador.
function searchEvents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredEvents = events.filter((event) => {
    const nameMatch = event.name.toLowerCase().includes(searchText);
    const categoryMatch = event.category.toLowerCase().includes(searchText);
    const dateMatch = event.date.toLowerCase().includes(searchText);
    return nameMatch || categoryMatch || dateMatch;
  });
  if (filteredEvents.length === 0) {
    searchMessage.innerHTML = `
      <div class= container my-4>
        <div class="alert alert-warning d-flex justify-content-center flex-wrap " role="alert" >
          <span class="bi-exclamation-triangle-fill me-2" aria-hidden="true"></span>
          <span>Sorry, no events found!</span>
        </div>
      </div>
    `;
    searchResults.innerHTML = "";
  } else {
    searchMessage.innerHTML = "";
    paintDOM(filteredEvents.filter((event) => Date < event.date));
  }
}

categoriesInputs.forEach((input) => { //filtra los eventos por categoría cuando se selecciona los checkboxes.
  input.addEventListener("change", filterAndPaintCards);
});
searchInput.addEventListener("input", searchEvents);
filterAndPaintCards();