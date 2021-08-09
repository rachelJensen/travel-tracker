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
  }
};

export const renderPending = (pending, destinations) => {
  const pendingTrips = document.getElementById('pending');
  if (pending === 'none') {
    renderPlaceholder('No pending, just fun', pendingTrips);
  } else if (pending.length === 1) {
    const tripInfo = pending[0].reportTripInfo(destinations);
    renderCard(pendingTrips, tripInfo);
  } else {
    const tripInfo = pending.map((item) => {
      return item.reportTripInfo(destinations);
    });
    renderGlide(pendingTrips, tripInfo);
  }
};

export const renderFuture = (future, destinations) => {
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
  }
};

export const renderPast = (past, destinations) => {
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

const renderPage = (places, currTrip, pendingTrips) => {
  //functions
  // render Traveler Greeting
  // render Upcoming Trips
  // render Past Adventures
  renderCurrentTrip(currTrip, places);
  renderPending(pendingTrips, places);
  // render total spent?
  renderDestinations(places);
};

/*
 <div class="glide card">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
    <li class="glide__slide card">
      <img class="trip-image" src=https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80 alt=a city with mountain cliffs by the sea>
      <h3>Cape Town, South Africa</h3>
      <h4>2021/10/06 - 2021/10/15</h4>
    </li>
    <li class="glide__slide card">
      <img class="trip-image" src=https://images.unsplash.com/photo-1536708880921-03a9306ec47d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1336&q=80 alt=trees near seashore>
      <h3>La Isla Tortuga, Costa Rica</h3>
      <h4>2021/11/06 - 2021/11/15</h4>
    </li>
  </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
    </div>
  </div>
  
*/
