import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {filtersList} from './data/data';
import {DATA} from './data/data';
import Api from './api';
import './menu';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip/`;

export const api = new Api(API_URL, AUTHORIZATION);
export let pointsData = [];

export const fetchTripPoints = () => {
  api.getTripPoints().then((trips) => {
    pointsData = trips;
    renderFilters(filtersList, pointsData);
    renderTripPoints(pointsData);
  });
};

fetchTripPoints();

api.getDestinations().then((data) => {
  DATA.PLACES = data;
});
