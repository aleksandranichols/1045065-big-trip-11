import TripEventModel from './models/trip-event-model.js';
import {Method} from './utils/constants.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authToken) {
    this._authToken = authToken;
    this._endPoint = `https://11.ecmascript.pages.academy/big-trip`;
  }

  getEvents() {
    return this._load({url: `points`})
    .then((response) => response.json())
    .then(TripEventModel.parseEvents);
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then((response) => response.json());
  }

  getOffers() {
    return this._load({url: `offers`})
    .then((response) => response.json());
  }

  createEvent(tripEvent) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(tripEvent.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(TripEventModel.parseEvent);
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(TripEventModel.parseEvent);
  }

  deleteEvent(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authToken);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

}
