// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

import './css/base.scss';
import dayjs from 'dayjs';
import Glide from '@glidejs/glide';

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  focusAt: 'center',
}).mount();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import { requestAllData } from './apiCalls';
import Destinations from './Destinations';
import Traveler from './Traveler';
import { renderDestinations } from './domUpdates';

//global variables
export const userID = 2;
let currTraveler;
let destinations;

// on page load
// there will be sign in box
// a submission of a travler will give a number and will fire the big 'ol function

const loadPage = () => {
  requestAllData().then((data) => {
    currTraveler = new Traveler(data[0]);
    destinations = new Destinations(data[1].destinations);

    renderDestinations(destinations.destinations);

    currTraveler.getTrips(data[2].trips);
  });
};

loadPage();

// const renderDestinations = (places) => {
//   const destinationsHtml = document.getElementById('destinations');

//   places.forEach((place) => {
//     console.log('butts');
//     destinationsHtml.innerHTML += `<option id="${place.id}" value="${place.destination}">${place.destination}</option>`;
//   });
// };
