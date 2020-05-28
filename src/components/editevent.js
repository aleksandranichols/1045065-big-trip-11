import AllMightySmarty from './allmightysmarty.js';
import EventOffers from './event-offers.js';
import {addArticleToEventType, returnEventDates} from '../utils/event-helpers';
import {splitAString} from '../utils/general.js';
import {DefaultData, TRANSPORT_TYPES, ACTIVITY_TYPES} from '../utils/constants.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const returnTripEventTransportTypesMarkup = () => TRANSPORT_TYPES.map((type) => `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
</div>`).join(`\n`);

const returnTripEventActivityTypesMarkup = () => ACTIVITY_TYPES.map((type) => `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`).join(`\n`);

const returnEditEvent = (tripEvent, availableDestinations, availableOffers) => {
  let {startDateWithSlash, endDateWithSlash, startTime, endTime} = returnEventDates(tripEvent.startDate, tripEvent.endDate);
  let {description, pictures, name} = tripEvent.destination;
  if (description === undefined) {
    description = ``;
  }
  let type = tripEvent.type;
  const eventIcon = `img/icons/${splitAString(type, ` `)[0]}.png`;
  type = addArticleToEventType(type.charAt(0).toUpperCase() + type.slice(1), TRANSPORT_TYPES);
  const isFavorite = tripEvent.isFavorite === false ? `` : `checked`;

  let eventOffers = ``;
  const offers = availableOffers.find((offer) => offer.type === tripEvent.type);
  if (offers === undefined) {
    eventOffers = new EventOffers(tripEvent.offers).getEventTemplateOnEdit();
  } else {
    eventOffers = new EventOffers(offers.offers).getEventTemplateOnEdit();
  }

  const returnPicturesMarkUp = () => pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(`\n`);
  const returnCitiesMarkUp = () => availableDestinations.map((destination) => `<option value="${destination.name}"></option>`).join(`\n`);

  const saveButton = DefaultData.SAVE;
  const deleteButton = DefaultData.DELETE;
  return `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${eventIcon}" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${returnTripEventTransportTypesMarkup()}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${returnTripEventActivityTypesMarkup()}
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

      <button class="event__save-btn  btn  btn--blue" type="submit">${saveButton}</button>
      <button class="event__reset-btn" type="reset">${deleteButton}</button>

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
  constructor(tripEvent, availableDestinations, availableOffers) {
    super();
    this._tripEvent = tripEvent;
    this._availableDestinations = availableDestinations;
    this._availableOffers = availableOffers;
    this._flatpickr = null;
    this._submitHandler = null;
    this._favHandler = null;
    this._delHandler = null;
    this._offerHandler = null;
    this._changeTypeHandler = null;
    this._changeDestinationHandler = null;
    this._applyFlatpickr();
    this._setCheckedOnType();
    this._setCheckedOnOffer();
    this._setPriceInputHandler();
    this._setDestinationInputHandler();
  }

  getTemplate() {
    return returnEditEvent(this._tripEvent, this._availableDestinations, this._availableOffers);
  }

  updateData(newData) {
    this._tripEvent = newData;
    this.rerender();
    this.recoveryListeners();
  }

  updateOffers(updatedOffers) {
    this._availableOffers = updatedOffers;
    this.rerender();
    this.recoveryListeners();
  }

  updateDestinations(updatedDestinations) {
    this._availableDestinations = updatedDestinations;
    this.rerender();
    this.recoveryListeners();
  }

  getData() {
    return new FormData(this.getElement().querySelector(`form`));
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
  }

  reset() {
    this.getElement().querySelector(`form`).reset();
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  reset() {
    const form = this.getElement().querySelector(`form`);
    form.reset();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setClickOnFavHandler(this._favHandler);
    this.setClickOnDelHandler(this._delHandler);
    this.setChangeTypeHandler(this._changeTypeHandler);
    this.setChangeDestinationHandler(this._changeDestinationHandler);
    this.setClickOnOffers(this._offerHandler);
    this._applyFlatpickr();
    this._setPriceInputHandler();
    this._setDestinationInputHandler();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
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

  setClickOnOffers(handler) {
    this.getElement().querySelectorAll(`.event__offer-checkbox`).forEach((offer) => offer.addEventListener(`click`, (evt) => {
      evt.target.toggleAttribute(`checked`);
      const offers = this.getElement().querySelectorAll(`.event__offer-selector input:checked`);
      handler(offers);
    }));
    this._offerHandler = handler;
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
      if (this._availableDestinations.some((destination) => destination.name === evt.target.value)) {
        return;
      } else {
        evt.target.value = ``;
      }
    });
  }

  _setCheckedOnType() {
    if (this._tripEvent.type !== ``) {
      this.getElement().querySelector(`input[value=${this._tripEvent.type}]`).setAttribute(`checked`, ``);
    }
  }

  setChangeTypeHandler(handler) {
    const allEventsLabels = this.getElement().querySelectorAll(`.event__type-label`);
    allEventsLabels.forEach((label) => label.addEventListener(`click`, () => {
      handler(label.textContent.toLowerCase());
      this._setCheckedOnType();
    }));
    this._changeTypeHandler = handler;
  }

  setChangeDestinationHandler(handler) {
    const destinationInput = this.getElement().querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`change`, () => {
      handler(destinationInput);
    });
    this._changeDestinationHandler = handler;
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
      dateFormat: `d/m/y H:i`,
      onValueUpdate: function(selectedDates, dateStr, instance) {
        instance.element.setCustomValidity(``);
        const startDate = calendarInputs[0];
        const endDate = calendarInputs[1];
        if (startDate.value > endDate.value) {
          instance.element.setCustomValidity(`End date can't begin before the start date`);
        }
    },
    }));
    /* eslint-enable */
  }
}
