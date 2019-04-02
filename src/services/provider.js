import TripModel from '../data/trip-model';
import {objectToArray} from '../utils';
import {DATA} from '../data/data';


export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
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
    } else {
      const pointsMap = this._store.getAll({storeKey: `points`});
      const rawPoints = objectToArray(pointsMap);
      const points = TripModel.parseTrips(rawPoints);

      return Promise.resolve(points);
    }
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
    } else {
      const destinationsMap = this._store.getAll({storeKey: `destinations`});
      const destinations = objectToArray(destinationsMap);
      DATA.OFFERS = destinations;

      return Promise.resolve(destinations);
    }
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
    } else {
      const offersMap = this._store.getAll({storeKey: `offers`});
      const offers = objectToArray(offersMap);
      DATA.OFFERS = offers;

      return Promise.resolve(offers);
    }
  }

  createTripPoint({data}) {
    return this._api.createTripPoint({data});
  }

  updateTripPoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updateTripPoint({id, data})
        .then((point) => {
          this._store.setItem({key: point.id, item: point.toRAW(), storeKey: `points`});
          return point;
        });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setItem({key: point.id, item: point, storeKey: `points`});
      return Promise.resolve(TripModel.parseTrip(point));
    }
  }

  deleteTripPoint({id}) {
    if (this._isOnline()) {
      return this._api.deleteTripPoint({id})
        .then(() => {
          this._store.removeItem({key: id, storeKey: `points`});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id, storeKey: `points`});
      return Promise.resolve(true);
    }
  }
}
