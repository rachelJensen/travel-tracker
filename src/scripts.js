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
import { requestAllData, postData } from './apiCalls';
import Destinations from './Destinations';
import Traveler from './Traveler';
import {
  renderDestinations,
  renderTraveler,
  renderCurrentTrip,
  renderPending,
} from './domUpdates';

//global variables
export const userID = 2;
let currTraveler;
let destinations;
let today = dayjs().format('YYYY/MM/DD');

// on page load
// there will be sign in box
// a submission of a travler will give a number and will fire the big 'ol function

const loadPage = () => {
  requestAllData().then((data) => {
    currTraveler = new Traveler(data[0]);
    destinations = new Destinations(data[1].destinations);
    currTraveler.getTrips(data[2].trips);

    const currentTrip = currTraveler.getCurrent(today);
    const pendingTrips = currTraveler.getPending();
    console.log(pendingTrips);

    renderTraveler(currTraveler);
    renderDestinations(destinations.list);
    renderCurrentTrip(currentTrip, destinations);
    renderPending(pendingTrips);
  });
};

loadPage();

///////

// let testTrip = {
//   id: 5005,
//   userID: 2,
//   destinationID: 23,
//   travelers: 2,
//   date: '2021/08/06',
//   duration: 10,
//   status: 'approved',
//   suggestedActivities: [],
// };

// postData(testTrip)
//   .then((response) => response.json())
//   .then((response) => console.log(response));
