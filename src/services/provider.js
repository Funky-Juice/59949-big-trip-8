
export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getTripPoints() {
    return this._api.getTripPoints();
  }

  getDestinations() {
    return this._api.getDestinations();
  }

  getOffers() {
    return this._api.getOffers();
  }

  updateTripPoint({id, data}) {
    return this._api.updateTripPoint({id, data});
  }

  createTripPoint({data}) {
    return this._api.createTripPoint({data});
  }

  deleteTripPoint({id}) {
    return this._api.deleteTripPoint({id});
  }
}
