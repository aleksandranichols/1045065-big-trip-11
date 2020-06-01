import AllMighty from './all-mighty.js';
import EventOffers from './event-offers.js';
import {returnEventDates, addArticleToEventType, splitAString} from '../utils/event-helpers.js';
import {TRANSPORT_TYPES, MAX_OFFERS_TO_SHOW} from '../utils/constants.js';

const returnEvent = (tripEvent) => {
  let {startDateWithDash, endDateWithDash, startTime, endTime, duration} = returnEventDates(tripEvent.startDate, tripEvent.endDate);
  let {name} = tripEvent.destination;
  let type = tripEvent.type;
  const eventIcon = splitAString(type, ` `);
  type = addArticleToEventType(type.charAt(0).toUpperCase() + type.slice(1), TRANSPORT_TYPES);
  const eventOffers = tripEvent.offers.title === `` ? `` : new EventOffers(tripEvent.offers.slice(0, MAX_OFFERS_TO_SHOW)).getEventTemplate();

  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventIcon[0]}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startDateWithDash}T${startTime}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${endDateWithDash}T${endTime}">${endTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${tripEvent.price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${eventOffers}
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
