import AllMighty from './allmighty.js';
import {returnEventDates} from '../utils/event-helpers.js';

export const returnTripDayDetails = (tripEvent, counter) => {
  let {startDateWithDash, shortDate} = returnEventDates(tripEvent.startISODate, tripEvent.endISODate);

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
