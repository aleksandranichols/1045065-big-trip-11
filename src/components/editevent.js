import AllMightySmarty from './allmightysmarty.js';
import EventOffers from './event-offers.js';
import API from '../api.js';
import {addArticleToEventType, returnEventDates} from '../utils/event-helpers';
import {splitAString} from '../utils/general.js';
import {AUTHORIZATION_TOKEN, TYPES} from '../utils/constants.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const availableDestinations = [];
const availableOffers = [];

new API(AUTHORIZATION_TOKEN).getDestinations()
.then((destinations) => {
  return availableDestinations.push(...destinations);
});

new API(AUTHORIZATION_TOKEN).getOffers()
.then((offers) => {
  return availableOffers.push(...offers);
});

const returnCitiesMarkUp = () => availableDestinations.map((destination) => `<option value="${destination.name}"></option>`).join(`\n`);

const returnEditEvent = (tripEvent) => {
  let {startDateWithSlash, endDateWithSlash, startTime, endTime} = returnEventDates(tripEvent.startDate, tripEvent.endDate);
  let {description, pictures, name} = tripEvent.destination;
  let type = tripEvent.type;
  const eventIcon = splitAString(type, ` `);
  type = addArticleToEventType(type.charAt(0).toUpperCase() + type.slice(1), TYPES);
  const isFavorite = tripEvent.isFavorite === false ? `` : `checked`;
  const eventOffers = new EventOffers(tripEvent.offers).getEventTemplateOnEdit();

  const returnPicturesMarkUp = () => pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(`\n`);

  return `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventIcon[0]}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" >
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${returnCitiesMarkUp()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateWithSlash} ${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateWithSlash} ${endTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripEvent.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
        ${eventOffers}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">${name}</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${returnPicturesMarkUp()}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class EditTripEvent extends AllMightySmarty {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._flatpickr = null;
    this._submitHandler = null;
    this._favHandler = null;
    this._delHandler = null;
    this._changeType();
    this._changeDestination();
    this._applyFlatpickr();
    this._setCheckedOnType();
    this._setPriceInputHandler();
    this._setDestinationInputHandler();
  }

  getTemplate() {
    return returnEditEvent(this._tripEvent);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setClickOnFavHandler(this._favHandler);
    this.setClickOnDelHandler(this._delHandler);
    this._changeType();
    this._changeDestination();
    this._applyFlatpickr();
    this._setPriceInputHandler();
    this._setDestinationInputHandler();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setClickOnFavHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favHandler = handler;
  }

  setClickOnDelHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._delHandler = handler;
  }

  _setPriceInputHandler() {
    const priceInput = this.getElement().querySelector(`.event__input--price`);
    priceInput.addEventListener(`input`, (evt) => {
      evt.target.value = evt.target.value.replace(new RegExp(/[^0-9]/, `ig`), ``);
    });
  }

  _setDestinationInputHandler() {
    const destinationInput = this.getElement().querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`input`, (evt) => {
      if (availableDestinations.some((destination) => destination.name === evt.target.value)) {
        return;
      } else {
        evt.target.value = ``;
      }
    });
  }

  _setCheckedOnType() {
    this.getElement().querySelector(`input[value=${splitAString(this._tripEvent.type.toLowerCase(), ` `)[0].toLowerCase()}]`).setAttribute(`checked`, ``);
  }

  _changeType() {
    const allEventsLabels = this.getElement().querySelectorAll(`.event__type-label`);
    allEventsLabels.forEach((label) => label.addEventListener(`click`, () => {
      const currentOfferIndex = availableOffers.findIndex((offer) => offer.type === label.textContent.toLowerCase());
      this._tripEvent.offers = availableOffers[currentOfferIndex].offers;
      this._tripEvent.type = availableOffers[currentOfferIndex].type;
      this.rerender();
      this.recoveryListeners();
      this._setCheckedOnType();
    }));
  }

  _changeDestination() {
    const destinationInput = this.getElement().querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`change`, () => {
      this._tripEvent.city = destinationInput.value;
      this._tripEvent.destination.name = destinationInput.value;
      if (destinationInput.value !== ``) {
        const index = availableDestinations.findIndex((destination) => destination.name === destinationInput.value);
        this._tripEvent.destination.description = availableDestinations[index].description;
        this._tripEvent.destination.pictures = availableDestinations[index].pictures;
      }

      this.rerender();
      this.recoveryListeners();
    });
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    const calendarInputs = this.getElement().querySelectorAll(`.event__input--time`);
    /* eslint-disable */
    calendarInputs.forEach((input) => this._flatpickr = flatpickr(input, {
      allowInput: true,
      enableTime: true,
      time_24hr: true,
      dateFormat: `d/m/y H:i`
    }));
    /* eslint-enable */
  }
}
