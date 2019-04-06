import {renderFilters, renderSortings, renderTripPoints} from './screens/trips-screen';
import {filtersList, sortingsList} from './data/data';
import {showBlock, hideBlock} from './utils';
import Provider from './services/provider';
import Api from './services/api';
import Store from './services/store';
import './menu';


const contentContainer = document.querySelector(`.main.content-wrap`);
const messageContainer = document.querySelector(`.message-container`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip`;

const STORE_KEYS = {
  'points': `points-store-key`,
  'destinations': `destinations-store-key`,
  'offers': `offers-store-key`,
};

const api = new Api(API_URL, AUTHORIZATION);
const store = new Store({key: STORE_KEYS, storage: localStorage});
export const provider = new Provider({api, store});

window.addEventListener(`offline`, () => (document.title = `${document.title} [OFFLINE]`));
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

export const fetchTripPoints = () => {
  return Promise.all([
    provider.getTripPoints(),
    provider.getDestinations(),
    provider.getOffers()
  ]);
};

fetchTripPoints()
  .then((data) => {
    hideBlock(messageContainer);
    showBlock(contentContainer);

    renderFilters(filtersList, data[0]);
    renderSortings(sortingsList, data[0]);
    renderTripPoints(data[0]);
  });
