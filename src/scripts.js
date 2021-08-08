// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

import './css/base.scss';
import dayjs from 'dayjs';
import Glide from '@glidejs/glide';

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 2,
  focusAt: 'center',
}).mount();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import { requestAllData } from './apiCalls';
import Destinations from './Destinations';
import Traveler from './Traveler';

//global variables
export const userID = 2;
let currTraveler;
let destinations;

// on page load
// there will be sign in box
// a submission of a travler will give a number and will fire the big 'ol function

const testFunction = () => {
  requestAllData().then((data) => {
    currTraveler = new Traveler(data[0]);
    destinations = new Destinations(data[1].destinations);

    currTraveler.getTrips(data[2].trips);
  });
};

testFunction();
