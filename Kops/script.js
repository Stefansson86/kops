// Global variables
let currentPage = 1;
const eventsPerPage = 10;

// Function to fetch events from the API and display them
async function fetchAndDisplayEvents(locationName) {
  const response = await fetch(
    `https://polisen.se/api/events?locationname=${encodeURIComponent(locationName)}`
  );
  const data = await response.json();

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / eventsPerPage);

  // Update current page if it exceeds the total pages
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // Calculate the start and end index of events to display on the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;

  // Clear existing events
  eventsContainer.innerHTML = '';

  // Loop through each event on the current page
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const event = data[i];

    const eventElement = document.createElement('div');
    eventElement.classList.add('event');

    const titleElement = document.createElement('h2');
    titleElement.textContent = event.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = event.summary;

    const urlElement = document.createElement('a');
    urlElement.href = `https://www.polisen.se${event.url}`;
    urlElement.target = '_blank';
    urlElement.rel = 'noopener noreferrer';
    urlElement.innerHTML = '<i class="fas fa-book"></i>';

    eventElement.appendChild(titleElement);
    eventElement.appendChild(descriptionElement);
    eventElement.appendChild(urlElement);

    eventsContainer.appendChild(eventElement);
  }

  // Toggle visibility of previous button
  if (currentPage === 1) {
    previousButton.style.visibility = 'hidden';
  } else {
    previousButton.style.visibility = 'visible';
  }

  // Toggle visibility of next button
  if (currentPage === totalPages) {
    nextButton.style.visibility = 'hidden';
  } else {
    nextButton.style.visibility = 'visible';
  }

  // Hide pagination container if there are no events
  // Hide pagination container if there are no events
  if (data.length === 0) {
    paginationContainer.classList.remove('visible');
  } else {
    paginationContainer.classList.add('visible');
  }
}

// Event listener for the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const locationName = locationInput.value;
  currentPage = 1; // Reset current page to 1
  fetchAndDisplayEvents(locationName);
});

// Event listener for the previous button
previousButton.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    fetchAndDisplayEvents(locationInput.value);
  }
});

// Event listener for the next button
nextButton.addEventListener('click', function() {
  const locationName = locationInput.value;
  currentPage++;
  fetchAndDisplayEvents(locationName);
});
