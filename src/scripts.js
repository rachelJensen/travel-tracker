// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

import './css/base.scss';
import dayjs from 'dayjs';
import Glide from '@glidejs/glide';
import MicroModal from 'micromodal';

// MicroModal.init();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import { requestAllData, postData } from './apiCalls';
import Destinations from './Destinations';
import Traveler from './Traveler';
import {
  renderPage,
  renderDestinations,
  getEstimate,
  resetForm,
  estimateContainer,
  estimateBtn,
  destinationSelection,
  guests,
  startDate,
  daysOfTrip,
  displayError,
} from './domUpdates';
import Trip from './Trip';

//global variables
export const userID = 44;
export let currTraveler;
export let destinations;
export let today = dayjs().format('YYYY/MM/DD');
export let newTrip;

//event listener
estimateBtn.addEventListener('click', (event) => {
  getEstimate(event);
});
estimateContainer.addEventListener('click', (event) => {
  processRequst(event);
});

//functions
const loadPage = () => {
  requestAllData().then((data) => {
    currTraveler = new Traveler(data[0]);
    destinations = new Destinations(data[1].destinations);
    currTraveler.getTrips(data[2].trips);

    const currentTrip = currTraveler.getCurrent(today);
    const pendingTrips = currTraveler.getPending();
    const upcomingTrips = currTraveler.getFuture(today);
    const pastTrips = currTraveler.getPast(today);
    const annualCost = currTraveler.calculateAnnualCosts(today, destinations);

    renderDestinations(destinations.list);
    renderPage(
      currTraveler,
      destinations,
      currentTrip,
      pendingTrips,
      upcomingTrips,
      pastTrips,
      annualCost
    );
  });
};

loadPage();

export const makeNewTrip = () => {
  let id = destinations.list.find(
    (place) => place.destination === destinationSelection.value
  );

  let trip = {
    id: Date.now(),
    userID: currTraveler.id,
    destinationID: id.id,
    travelers: parseInt(guests.value),
    date: dayjs(startDate.value).format('YYYY/MM/DD'),
    duration: daysOfTrip.value,
    status: 'pending',
    suggestedActivities: [],
  };

  newTrip = new Trip(trip);
  return newTrip;
};

const processRequst = (event) => {
  event.preventDefault();

  if (event.target.id === 'confirm') {
    postRequest(newTrip);
  }
  resetForm();
};

const checkForError = (response) => {
  console.log('response', response);
  if (response.message.includes('successfully posted')) {
    return response;
  } else {
    throw new Error('unsuccessful post');
  }
};

const postRequest = (tripToPost) => {
  postData(tripToPost)
    .then((response) => response.json())
    .then((response) => checkForError(response))
    .then((response) => {
      console.log(response.message);
      loadPage();
    })
    .catch((err) => displayError('Something went wrong. Please try again.'));
};
