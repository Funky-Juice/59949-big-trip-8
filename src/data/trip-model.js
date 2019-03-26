
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

  toRAW() {
    return {
      'id': this.id,
      'icon': this.icon,
      'type': this.type,
      'title': this.title,
      'pictures': this.pictures,
      'offers': this.offers,
      'description': this.description,
      'price': this.price,
      'time': this.time,
      'isFavorite': this.isFavorite,
    };
  }

  static parseTrip(data) {
    return new TripModel(data);
  }

  static parseTrips(data) {
    return data.map(TripModel.parseTrip);
  }
}
