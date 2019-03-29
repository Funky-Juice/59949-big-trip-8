import TripModel from './data/trip-model';

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
      .then((res) => res.json())
      .then(TripModel.parseTrips);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((res) => res.json());
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((res) => res.json());
  }

  createTripPoint() {}

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

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._api}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
