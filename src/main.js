import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {filtersList} from './data/data';
import Api from './api';
import './menu';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip`;

export const api = new Api(API_URL, AUTHORIZATION);
export let pointsData = [];

export const fetchTrips = () => {
  api.getTrips().then((trips) => {
    pointsData = trips;
    renderFilters(filtersList, pointsData);
    renderTripPoints(pointsData);
  });
};

fetchTrips();
