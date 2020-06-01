import AllMighty from './all-mighty.js';

const returnNewEventButton = () => `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;

export default class NewEventButton extends AllMighty {
  constructor() {
    super();
    this._newEvent = null;
    this.setClickOnNewEventHandler(this._newEvent);
  }

  getTemplate() {
    return returnNewEventButton();
  }

  setClickOnNewEventHandler(handler) {
    this._newEvent = handler;
    this.getElement().addEventListener(`click`, this._newEvent);
  }
}
