//imports
import { userID, currentTraveler, destinations } from './scripts';

//query selectors

// DOM render functions
export const renderTraveler = (traveler) => {
  const user = document.getElementById('userName');

  user.innerText = traveler.name;
};

export const renderDestinations = (places) => {
  const destinationsHtml = document.getElementById('destinations');

  places.forEach((place) => {
    destinationsHtml.innerHTML += `<option id="${place.id}" value="${place.destination}">${place.destination}</option>`;
  });
};

export const renderCurrentTrip = (trip, destinations) => {
  const current = document.getElementById('currentTrip');

  if (trip === 'none') {
    renderPlaceholder('Time to book your next adventure?', current);
  } else {
    const tripInfo = trip.reportTripInfo(destinations);
    renderCard(current, tripInfo);

    // current.innerHTML = `
    // <div class="card">
    //   <img class="trip-image" src=${tripInfo.image} alt=${tripInfo.alt}>
    //   <h3>${tripInfo.destination}</h3>
    //   <h4>${tripInfo.startDate}-${tripInfo.endDate}</h4>
    // </div>`;
  }
};

export const renderPending = (pending) => {
  const pendingTrips = document.getElementById('pending');

  if (pending === 'none') {
    renderPlaceholder('No pending, just fun', pendingTrips);
  }
  // else {
  //   const tripInfo = trip.reportTripInfo(destinations);
  //   renderCard(current, tripInfo);

  // current.innerHTML = `
  // <div class="card">
  //   <img class="trip-image" src=${tripInfo.image} alt=${tripInfo.alt}>
  //   <h3>${tripInfo.destination}</h3>
  //   <h4>${tripInfo.startDate}-${tripInfo.endDate}</h4>
  // </div>`;
  // }
};

const renderPlaceholder = (message, element) => {
  element.innerHTML = `
  <div class="card">
    <img class="trip-image" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="a boat on a lake surrounded by mountains">
    <h3>${message}</h3>
  </div>`;
};

const renderCard = (element, info) => {
  element.innerHTML = `
    <div class="card">
      <img class="trip-image" src=${info.image} alt=${info.alt}>
      <h3>${info.destination}</h3>
      <h4>${info.startDate}-${info.endDate}</h4>
    </div>`;
};

const renderPage = (places, currTrip) => {
  //functions
  // render Traveler Greeting
  // render Upcoming Trips
  // render Past Adventures
  renderCurrentTrip(currTrip, places);
  // render Pending
  // render total spent?
  renderDestinations(places);
};
