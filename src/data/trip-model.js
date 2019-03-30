
export default class TripModel {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.title = data[`destination`][`name`];
    this.description = data[`destination`][`description`];
    this.pictures = data[`destination`][`pictures`];
    this.offers = data[`offers`];
    this.price = data[`base_price`];
    this.dateFrom = data[`date_from`];
    this.dateTo = data[`date_to`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'offers': this.offers,
      'base_price': this.price,
      'date_from': this.dateFrom,
      'date_to': this.dateTo,
      'is_favorite': this.isFavorite,
      'destination': {
        'name': this.title
      }
    };
  }

  static parseTrip(data) {
    return new TripModel(data);
  }

  static parseTrips(data) {
    return data.map(TripModel.parseTrip);
  }
}
