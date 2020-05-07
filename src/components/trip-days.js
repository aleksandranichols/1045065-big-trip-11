import {createElement} from './utils.js';

const returnTripList = () =>
  (`<ul class="trip-days">
  </ul>`
  );

export default class TripList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return returnTripList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
