
export default class TripModel {
  constructor(data) {
    this.id = data[`id`];
    this.icon = data[`icon`];
    this.type = data[`type`];
    this.title = data[`title`];
    this.pictures = data[`pictures`];
    this.offers = data[`offers`];
    this.description = data[`description`];
    this.price = data[`price`];
    this.time = data[`time`];
    this.isFavorite = data[`isFavorite`];
  }

  static parseTrip(data) {
    return new TripModel(data);
  }

  static parseTrips(data) {
    return data.map(TripModel.parseTrip);
  }
}
