// Fetch events from the API
fetch('https://polisen.se/api/events?locationname=bor%C3%A5s')
  .then(response => response.json())
  .then(data => {
    // Process the event data
    const events = data.map(event => ({
      title: event.name,
      description: event.summary,
      date: new Date(event.datetime).toLocaleDateString(),
    }));

    // Display events on the page
    const eventsContainer = document.getElementById('eventsContainer');
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');

      const titleElement = document.createElement('h2');
      titleElement.textContent = event.title;
      eventElement.appendChild(titleElement);

      const dateElement = document.createElement('p');
      dateElement.textContent = `Date: ${event.date}`;
      eventElement.appendChild(dateElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = event.description;
      eventElement.appendChild(descriptionElement);

      eventsContainer.appendChild(eventElement);
    });
  })
  .catch(error => {
    console.log('An error occurred while fetching the events:', error);
  });