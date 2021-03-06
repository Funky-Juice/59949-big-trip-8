import TripModel from '../data/trip-model';
import {showError} from '../utils';
import {DATA} from '../data/data';

const messageContainer = document.querySelector(`.message-container`);

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(apiUrl, authorization) {
    this._api = apiUrl;
    this._authorization = authorization;
  }

  getTripPoints() {
    return this._load({url: `points`})
      .then((res) => res.json());
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((res) => res.json())
      .then((data) => (DATA.PLACES = data));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((res) => res.json())
      .then((data) => (DATA.OFFERS = data));
  }

  createTripPoint(data) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  updateTripPoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => res.json())
      .then(TripModel.parseTrip);
  }

  deleteTripPoint({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  syncPoints({points}) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((res) => res.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._api}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        showError(messageContainer);
        throw err;
      });
  }
}
