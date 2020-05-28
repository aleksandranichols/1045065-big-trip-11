import AllMightySmarty from './allmightysmarty.js';

const noTripEvents = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class NoTripEvents extends AllMightySmarty {
  constructor() {
    super();
    this._message = `Loading...`;
  }

  getTemplate() {
    return noTripEvents(this._message);
  }

  updateData(newMessage) {
    this._message = newMessage;
    this.rerender();
  }
}
