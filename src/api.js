import TripEvent from './models/event.js';

export default class API {
  constructor(authToken) {
    this._authToken = authToken;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authToken);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
    .then((response) => response.json())
    .then(TripEvent.parseEvents);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authToken);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
    .then((response) => response.json());
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authToken);
    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then((response) => response.json());
  }
}
