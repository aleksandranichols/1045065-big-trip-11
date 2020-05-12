import {splitAString} from '../utils/general.js';
import {DAYS_NAME, HOURS_NAME, MINUTES_NAME} from '../utils/constants.js';
import {returnEventOffers} from './event-offers.js';
import AllMighty from './allmighty.js';

const returnEvent = (tripEvent) => {
  let {startMinutes, startHours, startDay, startMonth, startYear} = tripEvent.startDates;
  let {endMinutes, endHours, endDay, endMonth} = tripEvent.endDates;

  const generateDuration = (endDuration, startDuration, durationName) => {
    let duration;
    if (endDuration < startDuration) {
      duration = -(endDuration - startDuration) + durationName;
    } else {
      if (endDuration === startDuration) {
        duration = ``;
      } else {
        duration = endDuration - startDuration + durationName;
      }
    }
    return duration;
  };

  const generateEventDuration = () => {
    const durationDays = generateDuration(endDay, startDay, DAYS_NAME);
    const durationHours = generateDuration(endHours, startHours, HOURS_NAME);
    const durationMinutes = generateDuration(endMinutes, startMinutes, MINUTES_NAME);

    const eventDuration = {durationDays, durationHours, durationMinutes};
    return eventDuration;
  };

  let {durationDays, durationHours, durationMinutes} = generateEventDuration();

  const eventIcon = splitAString(tripEvent.type.toLowerCase(), ` `);

  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventIcon[0]}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripEvent.type} ${tripEvent.city}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}">${startHours}:${startMinutes}</time>
        &mdash;
        <time class="event__end-time" datetime="${startYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}">${endHours}:${endMinutes}</time>
      </p>
      <p class="event__duration">${durationDays}${durationHours}${durationMinutes}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${tripEvent.price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${returnEventOffers(tripEvent.offers)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripEvent extends AllMighty {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return returnEvent(this._data);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
