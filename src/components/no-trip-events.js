import AllMighty from './allmighty.js';

const noTripEvents = () => (`<p class="trip-events__msg">Click New Event to create your first point</p>`);

export default class NoTripEvents extends AllMighty {
  getTemplate() {
    return noTripEvents();
  }
}
