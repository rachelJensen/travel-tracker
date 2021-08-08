//imports
import { userID } from './scripts';

const requestData = (url) => {
  return fetch(url).then((response) => response.json());
};

export const requestAllData = () => {
  return Promise.all([
    requestData(`http://localhost:3001/api/v1/travelers/${userID}`),
    requestData('http://localhost:3001/api/v1/destinations'),
    requestData('http://localhost:3001/api/v1/trips'),
  ]);
};
