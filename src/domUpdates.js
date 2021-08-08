//imports
import { userID, currentTraveler, destinations } from './scripts';

//query selectors

// DOM render functions

export const renderDestinations = (places) => {
  const destinationsHtml = document.getElementById('destinations');

  places.forEach((place) => {
    destinationsHtml.innerHTML += `<option id="${place.id}" value="${place.destination}">${place.destination}</option>`;
  });
};

const renderPage = () => {
  //functions
  // render Traveler Greeting
  // render Upcoming Trips
  // render Past Adventures
  // render Current
  // render Pending
  // render total spent?
  renderDestinations();
};
