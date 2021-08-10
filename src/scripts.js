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
  renderTraveler,
  renderCurrentTrip,
  renderPending,
  renderFuture,
  renderPast,
  renderAnnualCost,
} from './domUpdates';
import Trip from './Trip';

//global variables
export const userID = 44;
let currTraveler;
let destinations;
export let today = dayjs().format('YYYY/MM/DD');
let newTrip;

const estimateBtn = document.getElementById('estimate');
const estimateForm = document.getElementById('estimateForm');
const estimateContainer = document.getElementById('estimateDisplay');
const guests = document.getElementById('guests');
const destinationSelection = document.getElementById('destinations');
const startDate = document.getElementById('startDate');
const daysOfTrip = document.getElementById('days');
const confirm = document.getElementById('confirm');
const goBack = document.getElementById('return');

//event listener
estimateBtn.addEventListener('click', (event) => {
  getEstimate(event);
});
confirm.addEventListener('click', () => {
  submitTrip();
});
goBack.addEventListener('click', () => {
  resetForm();
});

//function
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

    // goBack.addEventListener('click', resetForm);
    // confirm.addEventListener('click', submitTrip);

    renderTraveler(currTraveler);
    renderDestinations(destinations.list);
    renderCurrentTrip(currentTrip, destinations);
    renderPending(pendingTrips, destinations);
    renderFuture(upcomingTrips, destinations);
    renderPast(pastTrips, destinations);
    renderAnnualCost(annualCost);
  });
};

loadPage();

const getEstimate = (event) => {
  event.preventDefault();

  let trip = makeNewTrip();

  if (trip.travelers && dayjs(trip.date).isAfter(today) && trip.duration) {
    estimateForm.classList.add('hidden');
    estimateContainer.classList.remove('hidden');

    displayEstimate(trip);
    // console.log('newTrip', newTrip);
  } else {
    console.log('butts');
  }
};

const makeNewTrip = () => {
  let id = destinations.list.find(
    (place) => place.destination === destinationSelection.value
  );

  let trip = {
    id: Date.now(),
    userID: currTraveler,
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

const resetForm = () => {
  // event.preventDefault();
  console.log('resetFrom hit');
  estimateForm.classList.remove('hidden');
  estimateContainer.classList.add('hidden');
};

const displayEstimate = (tripInfo) => {
  estimateContainer.innerHTML = `
    <h3>${destinationSelection.value}</h3>
    <h3>${dayjs(tripInfo.date).format('MMMM D, YYYY')}</h3>
    <h3>Estimated cost for ${tripInfo.travelers} travelers for ${
    tripInfo.duration
  } days is ${tripInfo.calculateCost(destinations)}</h3>
    <div>
      <button id="confirm" >Confirm Selection</button>
      <button id="return" >Try Again</button>
    </div>
    `;
};

///////

const submitTrip = () => {
  console.log(newTrip);

  //postRequest(newTrip);
};

const postRequest = (tripToPost) => {
  postData(testTrip)
    .then((response) => response.json())
    .then((response) => console.log(response));
};
