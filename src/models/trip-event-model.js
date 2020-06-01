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
    this.isNew = Boolean(data[`is_new`]);
  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.startDate,
      "date_to": this.endDate,
      "destination": Object.assign({}, this.destination),
      "id": this.id,
      "is_favorite": this.isFavorite,
      "type": this.type,
      "offers": Array.from(this.offers),
    };
  }

  static returnNewEvent() {
    return new TripEventModel({
      "base_price": 0,
      "date_from": new Date(),
      "date_to": new Date(),
      "id": Math.floor(Math.random() * 10001),
      "is_favorite": false,
      "type": `transport`,
      "offers": {"price": `0`, "title": ``},
      "destination": {"desciption": ``, "name": ``, "pictures": []},
      "is_new": true,
    });
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
