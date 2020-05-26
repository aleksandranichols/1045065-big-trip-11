export default class TripEventModel {
  constructor(data) {
    this.price = data[`base_price`];
    this.startDate = data[`date_from`];
    this.endDate = data[`date_to`];
    this.destination = Object(data[`destination`]);
    this.id = data[`id`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = Object(data[`offers`]);
    this.type = data[`type`];
  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.startDate,
      "date_to": this.endDate,
      "destination": JSON.stringify(this.destination),
      "id": this.id,
      "is_favorite": this.isFavorite,
      "type": this.type
    };
  }

  static parseEvent(data) {
    return new TripEventModel(data);
  }

  static parseEvents(data) {
    return data.map(TripEventModel.parseEvent);
  }

  static clone(data) {
    return new TripEventModel(data.toRAW());
  }
}
