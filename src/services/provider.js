
export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getTripPoints() {
    return this._api.getTripPoints()
      .then((points) => {
        points.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
        return points;
      });
  }

  getDestinations() {
    return this._api.getDestinations();
  }

  getOffers() {
    return this._api.getOffers();
  }

  createTripPoint({data}) {
    return this._api.createTripPoint({data});
  }

  updateTripPoint({id, data}) {
    return this._api.updateTripPoint({id, data})
      .then((point) => {
        this._store.setItem({key: point.id, item: point.toRAW()});
        return point;
      });
  }

  deleteTripPoint({id}) {
    return this._api.deleteTripPoint({id})
      .then(() => {
        this._store.removeItem({key: id});
      });
  }
}
