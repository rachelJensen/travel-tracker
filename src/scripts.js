// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

import './css/base.scss';
import dayjs from 'dayjs';
import Glide from '@glidejs/glide';

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
  renderFuture,
  renderPast,
} from './domUpdates';

//global variables
export const userID = 44;
let currTraveler;
let destinations;
let today = dayjs().format('YYYY/MM/DD');

const loadPage = () => {
  requestAllData().then((data) => {
    currTraveler = new Traveler(data[0]);
    destinations = new Destinations(data[1].destinations);
    currTraveler.getTrips(data[2].trips);

    const currentTrip = currTraveler.getCurrent(today);
    const pendingTrips = currTraveler.getPending();
    const upcomingTrips = currTraveler.getFuture(today);
    const pastTrips = currTraveler.getPast(today);
    console.log('allTrips,', currTraveler.trips);

    renderTraveler(currTraveler);
    renderDestinations(destinations.list);
    renderCurrentTrip(currentTrip, destinations);
    renderPending(pendingTrips, destinations);
    renderFuture(upcomingTrips, destinations);
    renderPast(pastTrips, destinations);
  });
};

loadPage();

///////

// let testTrip = {
//   id: 5021,
//   userID: 7,
//   destinationID: 48,
//   travelers: 2,
//   date: '2021/11/06',
//   duration: 10,
//   status: 'pending',
//   suggestedActivities: [],
// };

// postData(testTrip)
//   .then((response) => response.json())
//   .then((response) => console.log(response));
