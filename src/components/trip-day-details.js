import AllMighty from './all-mighty.js';
import {returnEventDates} from '../utils/event-helpers.js';

export const returnTripDayDetails = (tripEvent, counter) => {
  let startDateWithDash = ``;
  let shortDate = ``;
  if (tripEvent !== null) {
    startDateWithDash = returnEventDates(tripEvent.startDate, tripEvent.endDate).startDateWithDash;
    shortDate = returnEventDates(tripEvent.startDate, tripEvent.endDate).shortDate;
  }
  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${startDateWithDash}">${shortDate}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
};

export default class TripDayDetails extends AllMighty {
  constructor(tripEvent, counter) {
    super();
    this._tripEvent = tripEvent;
    this._counter = counter;
  }

  getTemplate() {
    return returnTripDayDetails(this._tripEvent, this._counter);
  }
}
