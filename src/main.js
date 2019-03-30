import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {filtersList} from './data/data';
import {DATA} from './data/data';
import {showBlock, hideBlock} from './utils';
import Api from './api';
import './menu';


const contentContainer = document.querySelector(`.main.content-wrap`);
const messageContainer = document.querySelector(`.message-container`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip`;

export const api = new Api(API_URL, AUTHORIZATION);

export const fetchTripPoints = () => {
  return Promise.all([
    api.getTripPoints(),
    api.getDestinations().then((data) => {
      DATA.PLACES = data;
    }),
    api.getOffers().then((data) => {
      DATA.OFFERS = data;
    })
  ]);
};

fetchTripPoints()
  .then((data) => {
    hideBlock(messageContainer);
    showBlock(contentContainer);

    renderFilters(filtersList, data[0]);
    renderTripPoints(data[0]);
  });
