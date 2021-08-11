//imports
import { destinations, makeNewTrip, today } from './scripts';
import Glide from '@glidejs/glide';
import dayjs from 'dayjs';

//query selectors
export const estimateBtn = document.getElementById('estimate');
const estimateForm = document.getElementById('estimateForm');
export const estimateContainer = document.getElementById('estimateDisplay');
export const guests = document.getElementById('guests');
export const destinationSelection = document.getElementById('destinations');
export const startDate = document.getElementById('startDate');
export const daysOfTrip = document.getElementById('days');
const travelDisplay = document.getElementById('travelGrid');
const loginDisplay = document.getElementById('login');
const navBar = document.getElementById('navBar');
const displayCost = document.getElementById('annualCost');

// DOM render functions
const renderTraveler = (traveler) => {
  const user = document.getElementById('userName');

  user.innerText = traveler.name;
};

export const renderDestinations = (places) => {
  const destinationsHtml = document.getElementById('destinations');

  places.forEach((place) => {
    destinationsHtml.innerHTML += `<option id="${place.id}" value="${place.destination}">${place.destination}</option>`;
  });
};

const renderCurrentTrip = (trip, destinations) => {
  const current = document.getElementById('currentTrip');

  if (trip === 'none') {
    renderPlaceholder('Time to book your next adventure?', current);
  } else {
    const tripInfo = trip.reportTripInfo(destinations);
    renderCard(current, tripInfo);
  }
};

const renderPending = (pending, destinations) => {
  const pendingTrips = document.getElementById('pending');

  if (pending.length === 0) {
    renderPlaceholder('No trips pending', pendingTrips);
  } else if (pending.length > 0) {
    const tripInfo = pending[pending.length - 1].reportTripInfo(destinations);
    renderCard(pendingTrips, tripInfo);
  }
};

const renderFuture = (future, destinations) => {
  let futureTrips = document.getElementById('upcoming');

  if (future.length === 0) {
    renderPlaceholder('Time to book something new!', futureTrips);
  } else if (future.length === 1) {
    const tripInfo = future[0].reportTripInfo(destinations);
    renderCard(futureTrips, tripInfo);
  } else {
    futureTrips = document.getElementById('upcomingSlides');
    const tripInfo = future.map((item) => {
      return item.reportTripInfo(destinations);
    });
    renderGlide(futureTrips, tripInfo);
    new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      focusAt: 'center',
    }).mount();
  }
};

const renderPast = (past, destinations) => {
  let pastTrips = document.getElementById('past');

  if (past.length === 0) {
    renderPlaceholder('Wanna make some memories', pastTrips);
  } else if (past.length === 1) {
    const tripInfo = past[0].reportTripInfo(destinations);
    renderCard(pastTrips, tripInfo);
  } else {
    pastTrips = document.getElementById('pastSlides');
    const tripInfo = past.map((item) => {
      return item.reportTripInfo(destinations);
    });
    renderGlide(pastTrips, tripInfo);
    new Glide('.glide2', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      focusAt: 'center',
    }).mount();
  }
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
      <h4>${info.startDate} - ${info.endDate}</h4>
    </div>`;
};

const renderGlide = (element, trips) => {
  const formattedTrips = trips.map((info) => {
    return `
    <li class="glide__slide card">
      <img class="trip-image" src=${info.image} alt=${info.alt}>
      <h3>${info.destination}</h3>
      <h4>${info.startDate} - ${info.endDate}</h4>
    </li>`;
  });

  let compiledHTML = ``;

  formattedTrips.forEach((trip) => {
    return (compiledHTML += trip);
  });

  element.innerHTML = compiledHTML;
};

const renderAnnualCost = (cost) => {
  displayCost.innerText = `You have spent $${cost} on travel this year.`;
};

export const renderPage = (
  traveler,
  places,
  currTrip,
  pendTrips,
  futTrips,
  pastTrips,
  cost
) => {
  renderTraveler(traveler);
  renderCurrentTrip(currTrip, places);
  renderPending(pendTrips, places);
  renderFuture(futTrips, places);
  renderPast(pastTrips, places);
  renderAnnualCost(cost);
};

//////

export const getEstimate = (event) => {
  event.preventDefault();

  let trip = makeNewTrip();

  if (trip.travelers && dayjs(trip.date).isAfter(today) && trip.duration) {
    estimateForm.classList.add('hidden');
    estimateContainer.classList.remove('hidden');

    displayEstimate(trip);
  } else {
    displayError('Please fill in all the fields');
  }
};

export const resetForm = () => {
  estimateForm.classList.remove('hidden');
  estimateContainer.classList.add('hidden');
};

export const displayEstimate = (tripInfo) => {
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

export const displayError = (message) => {
  const error = document.getElementById('errorMessage');

  error.innerText = `*** ${message} ***`;

  setTimeout(() => {
    error.innerText = '';
  }, 3000);
};

export const showLogin = () => {
  travelDisplay.classList.remove('hidden');
  estimateForm.classList.remove('hidden');
  navBar.classList.remove('hidden');
  displayCost.classList.remove('hidden');
  loginDisplay.classList.add('hidden');
};
