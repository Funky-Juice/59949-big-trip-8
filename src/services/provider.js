import TripModel from '../data/trip-model';
import {objectToArray} from '../utils';
import {DATA} from '../data/data';


export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
    this._generateId = generateId;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  syncPoints() {
    return this._api.syncPoints({points: objectToArray(this._store.getAll({storeKey: `points`}))});
  }

  getTripPoints() {
    if (this._isOnline()) {
      return this._api.getTripPoints()
        .then((points) => {
          let pointsObj = {};

          points.forEach((it) => {
            if (it.id) {
              pointsObj[it.id] = it;
            }
          });

          this._store.setItems({items: pointsObj, storeKey: `points`});
          return TripModel.parseTrips(points);
        });
    }
    const pointsMap = this._store.getAll({storeKey: `points`});
    const rawPoints = objectToArray(pointsMap);
    const points = TripModel.parseTrips(rawPoints);

    return Promise.resolve(points);
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          let destinationsObj = {};

          destinations.forEach((it) => {
            if (it.name) {
              destinationsObj[it.name] = it;
            }
          });

          this._store.setItems({items: destinationsObj, storeKey: `destinations`});
          return destinations;
        });
    }
    const destinationsMap = this._store.getAll({storeKey: `destinations`});
    const destinations = objectToArray(destinationsMap);
    DATA.PLACES = destinations;

    return Promise.resolve(destinations);
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          let offersObj = {};

          offers.forEach((it) => {
            if (it.type) {
              offersObj[it.type] = it;
            }
          });

          this._store.setItems({items: offersObj, storeKey: `offers`});
          return offers;
        });
    }
    const offersMap = this._store.getAll({storeKey: `offers`});
    const offers = objectToArray(offersMap);
    DATA.OFFERS = offers;

    return Promise.resolve(offers);
  }

  createTripPoint(data) {
    if (this._isOnline()) {
      return this._api.createTripPoint(data);
    }
    data.id = this._generateId();
    this._needSync = true;
    this._store.setItem({key: data.id, item: data, storeKey: `points`});
    return Promise.resolve(TripModel.parseTrip(data));
  }

  updateTripPoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updateTripPoint({id, data})
        .then((point) => {
          this._store.setItem({key: point.id, item: point.toRAW(), storeKey: `points`});
          return point;
        });
    }
    const point = data;
    this._needSync = true;
    this._store.setItem({key: point.id, item: point, storeKey: `points`});
    return Promise.resolve(TripModel.parseTrip(point));
  }

  deleteTripPoint({id}) {
    if (this._isOnline()) {
      return this._api.deleteTripPoint({id})
        .then(() => {
          this._store.removeItem({key: id, storeKey: `points`});
        });
    }
    this._needSync = true;
    this._store.removeItem({key: id, storeKey: `points`});
    return Promise.resolve(true);
  }
}
