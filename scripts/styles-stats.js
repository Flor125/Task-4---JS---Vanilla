console.log("styles-stats.js loaded")

const usersArray = "https://mindhub-xj03.onrender.com/api/amazing";
let events = [];
let categories = [];
let date = "";

const fetchData = () => {
  fetch(usersArray)
    .then(response => response.json())
    .then(data => {
      //print: Current Data 2023-03-10
      date = data.currentDate;
      console.log(`Current Date: ${date}`);
      //print: events
      events = data.events;
      console.log(events);
      // Llamada a funciones que procesan los datos
      categories = getUniqueCategories(events);
      console.log(categories);
      // Separar fechas futuras y pasadas
      const currentDate = new Date(date);
      const pastEvents = events.filter(event => new Date(event.date) < currentDate);
      const futureEvents = events.filter(event => new Date(event.date) >= currentDate);
      console.log("Past events: ", pastEvents);
      console.log("Future events: ", futureEvents);
 
      //Asistencia en futuro y pasado
      const assistanceByCategoryFuture = {};
      const assistanceByCategoryPast = {};
      for (const event of events) {
        const category = event.category;
        const assistance = event.assistance || 0; //past
        const estimate = event.estimate || 0; //future
        const today = new Date();
        const eventDate = new Date(event.date);
        if (eventDate > today) {
            assistanceByCategoryFuture[category] = (assistanceByCategoryFuture[category] || 0) + estimate;
        } else {
        assistanceByCategoryPast[category] = (assistanceByCategoryPast[category] || 0) + assistance;
        }
    }

    //asistencia por categoria en Futuro
    for (const category in assistanceByCategoryFuture) {
        const futureAssistance = assistanceByCategoryFuture[category];
        const capacity = events
        .filter((event) => event.category === category)
        .map((event) => event.capacity || 0)
        .reduce((a, b) => a + b, 0);
        const futurePercentage = ((futureAssistance / capacity) * 100).toFixed(2);
    console.log(`Future Assistance Percentage for ${category}: ${futurePercentage}%`);
    }

    //asistencia por categoria en Pasado
    for (const category in assistanceByCategoryPast) {
        const pastAssistance = assistanceByCategoryPast[category];
        const capacity = events
        .filter((event) => event.category === category)
        .map((event) => event.capacity || 0)
        .reduce((a, b) => a + b, 0);
        const pastPercentage = ((pastAssistance / capacity) * 100).toFixed(2);
        console.log(`Past Assistance Percentage for ${category}: ${pastPercentage}%`);
    }
// Calcular el evento con mayor asistencia y su porcentaje
      const maxAssistanceEvent = getMaxAssistanceEvent(pastEvents);
      const maxAssistancePercentage = (maxAssistanceEvent.assistance / maxAssistanceEvent.capacity) * 100;
      // Imprimir el resultado
      console.log(`El evento con mayor asistencia es "${maxAssistanceEvent.name}" con una asistencia del ${maxAssistancePercentage.toFixed(2)}% de su capacidad.`);
      //calcular el evento con menor porcentaje de asistencia.
      const minAssistanceEvent = getMinAssistanceEvent(events);
      const minAssistancePercentage = (minAssistanceEvent.assistance / minAssistanceEvent.capacity) * 100;
      //print
      console.log(`El evento con menor asistencia es "${minAssistanceEvent.name}" con una asistencia del ${minAssistancePercentage.toFixed(2)}% de su capacidad.`);
      const maxCapacityEvent = getMaxCapacityEvent(events);
      console.log(`El evento con mayor capacidad es "${maxCapacityEvent.name}" con una capacidad de ${maxCapacityEvent.capacity}.`);
      // Obtener el cuerpo de la tabla
      const tableBody = document.getElementById('table-body');
      const tableBody2 = document.getElementById('table-body2');
      const tableBody3 = document.getElementById('table-body3');
      // Generar las filas de la tabla
      let tableRows = ''; let tableRows2 = ''; let tableRows3 = '';
      tableRows += generateTableRow(maxAssistanceEvent, minAssistanceEvent, maxCapacityEvent);
      tableRows2 += generateTableRow2(categories);
      tableRows3 += generateTableRow3(categories);
      // Insertar las filas en la tabla
      tableBody.innerHTML = tableRows;
      tableBody2.innerHTML = tableRows2;
      tableBody3.innerHTML = tableRows3;
    });
};
fetchData();

const getMaxAssistanceEvent = (pastEvents) => {
    let maxAssistance = 0;
    let maxAssistanceEvent = null;
    for (let event of pastEvents) {
      if (event.assistance > maxAssistance) {
        maxAssistance = event.assistance;
        maxAssistanceEvent = event;
      }
    }
    return maxAssistanceEvent;
  }
  
  const getMinAssistanceEvent = (pastEvents) => {
    let minAssistance = Infinity;
    let minAssistanceEvent = null;
    for (let event of pastEvents) {
      if (event.assistance < minAssistance) {
        minAssistance = event.assistance;
        minAssistanceEvent = event;
      }
    }
    return minAssistanceEvent;
  }
  
  function getMaxCapacityEvent(pastEvents) {
    let maxCapacity = 0;
    let maxCapacityEvent = null;
    for (let event of pastEvents) {
      if (event.capacity > maxCapacity) {
        maxCapacity = event.capacity;
        maxCapacityEvent = event;
      }
    }
    return maxCapacityEvent;
  }
  
const getUniqueCategories = (events) => {
  const categories = events.map(event => event.category);
  return [...new Set(categories)];
}
  // Función para generar filas de la tabla
  function generateTableRow(maxAssistanceEvent, minAssistanceEvent, maxCapacityEvent) {
    const minAssistancePercentage = (minAssistanceEvent.assistance / minAssistanceEvent.capacity) * 100;
    const maxAssistancePercentage = (maxAssistanceEvent.assistance / maxAssistanceEvent.capacity) * 100;
    return `
      <tr>
        <td>${maxAssistanceEvent.name} (${maxAssistancePercentage.toFixed(2)}%) </td>
        <td>${minAssistanceEvent.name} (${minAssistancePercentage.toFixed(2)}%) </td>
        <td>${maxCapacityEvent.name} (${maxCapacityEvent.capacity})</td>
      </tr>
    `;
  }
  
  function calculateFuturePercentage(category, assistanceByCategoryFuture, events) {
    const futureAssistance = assistanceByCategoryFuture[category];
    const capacity = events
      .filter((event) => event.category === category)
      .map((event) => event.capacity || 0)
      .reduce((a, b) => a + b, 0);
    return ((futureAssistance / capacity) * 100).toFixed(2);
  }

  function generateTableRow2(categories) {
    const pricesByCategory = { future: {}, past: {} };
    const assistanceByCategory = { future: {}, past: {} };
    let rows = '';
    
    for (const event of events) {
      const category = event.category;
      const assistance = event.assistance || 0; //past
      const estimate = event.estimate || 0; //future
      const today = new Date();
      const eventDate = new Date(event.date);
      const isFuture = eventDate > today;
      // Calcula la asistencia por categoría para eventos futuros y pasados
      assistanceByCategory[isFuture ? 'future' : 'past'][category] = (assistanceByCategory[isFuture ? 'future' : 'past'][category] || 0) + (isFuture ? estimate : assistance);
      // Calcula los precios por categoría para eventos futuros y pasados
      pricesByCategory.future[category] = (pricesByCategory.future[category] || 0) + (isFuture ? estimate * (event.price || 0) : 0);

    }

    categories.forEach((category) => {
      const futurePrice = pricesByCategory.future[category] ? + pricesByCategory.future[category].toFixed(2) : '-';
      const futureAssistance = assistanceByCategory.future[category] || 0;
      const futureCapacity = events.filter((event) => event.category === category && new Date(event.date) > new Date()).map((event) => event.capacity || 0).reduce((a, b) => a + b, 0);
      const futurePercentage = ((futureAssistance / futureCapacity) * 100).toFixed(2);
      rows += `
        <tr>
          <td>${category}</td>
          <td>$ ${futurePrice}</td>
          <td>${futurePercentage} %</td>
        </tr>
      `;
    });
    return rows;
  }

  function generateTableRow3(pastCategories) {
    const pricesByCategory = {};
    const assistanceByCategory = {};
    let rows = '';
    
    for (const event of events) {
    const category = event.category;
    const assistance = event.assistance || 0;
    const today = new Date();
    const eventDate = new Date(event.date);
    const isFuture = eventDate > today;
  
    if (isFuture === false) {
        assistanceByCategory[category] = (assistanceByCategory[category] || 0) + assistance;
        pricesByCategory[category] = (pricesByCategory[category] || 0) + (event.price || 0);
      }      
    }
  
    pastCategories.forEach((category) => {
        const pastAssistance = assistanceByCategory[category] || 0;
        const pastCapacity = events.filter((event) => event.category === category && new Date(event.date) < new Date()).map((event) => event.capacity || 0).reduce((a, b) => a + b, 0);
        const pastPercentage = (pastCapacity === 0) ? '0.00' : ((pastAssistance / pastCapacity) * 100).toFixed(2);
        const pastPrice = pricesByCategory[category] * pastAssistance || 0;
        console.log("Categories: ", pricesByCategory[category]);
        console.log("Assistance: ", pastAssistance);
      rows += `
        <tr>
          <td>${category}</td>
          <td>$ ${pastPrice.toFixed(2)}</td>
          <td>${pastPercentage} %</td>
        </tr>
      `;
    });
    return rows;
  }