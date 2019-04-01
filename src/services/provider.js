
export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getTripPoints() {
    return this._api.getTripPoints()
      .then((points) => {
        let pointsObj = {};

        points.forEach((it) => {
          if (it.id) {
            pointsObj[it.id] = it;
          }
        });

        this._store.setItems({items: pointsObj, storeKey: `points`});
        return points;
      });
  }

  getDestinations() {
    return this._api.getDestinations()
      .then((destinations) => {
        let destinationsObj = {};

        destinations.forEach((it)=> {
          if (it.name) {
            destinationsObj[it.name] = it;
          }
        });

        this._store.setItems({items: destinationsObj, storeKey: `destinations`});
        return destinations;
      });
  }

  getOffers() {
    return this._api.getOffers()
      .then((offers) => {
        let offersObj = {};

        offers.forEach((it)=> {
          if (it.type) {
            offersObj[it.type] = it;
          }
        });

        this._store.setItems({items: offersObj, storeKey: `offers`});
        return offers;
      });
  }

  createTripPoint({data}) {
    return this._api.createTripPoint({data});
  }

  updateTripPoint({id, data}) {
    return this._api.updateTripPoint({id, data})
      .then((point) => {
        this._store.setItem({key: point.id, item: point.toRAW(), storeKey: `points`});
        return point;
      });
  }

  deleteTripPoint({id}) {
    return this._api.deleteTripPoint({id})
      .then(() => {
        this._store.removeItem({key: id, storeKey: `points`});
      });
  }
}
