import API from '../api.js';
import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import TripEventModel from '../models/event.js';
import {Position, AUTHORIZATION_TOKEN, SHAKE_ANIMATION_TIMEOUT} from '../utils/constants.js';
import {renderComponent, removeComponent, toggleComponents} from '../utils/render.js';
import moment from "moment";

const parseFormData = (formData) => {
  return new TripEventModel({
    "base_price": parseInt(formData.get(`event-price`), 10),
    "is_favorite": formData.get(`event-favorite`) === `on` ? true : false,
    "date_from": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`),
    "date_to": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`),
  });
};

export default class TripEventController {
  constructor(container, data, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._unchangedData = data;
    this._checkedOffers = null;
    this._dummyData = TripEventModel.clone(data);
    this._availableDestinations = this.getDestinations();
    this._availableOffers = this.getOffers();
    this._tripEvent = new TripEvent(this._unchangedData);
    this._editTripEvent = new EditTripEvent(this._unchangedData, this._availableDestinations, this._availableOffers);
  }

  render() {
    renderComponent(Position.BEFOREEND, this._tripEvent, this._container);
    this._addEventHandlers(this._unchangedData);
    this._addSupplementaryHandlers(this._unchangedData);
  }

  shake() {
    toggleComponents(this._tripEvent, this._editTripEvent);
    this._editTripEvent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._tripEvent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._editTripEvent.getElement().style.animation = ``;
      this._tripEvent.getElement().style.animation = ``;

      this._editTripEvent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setDefaultView() {
    if (document.contains(this._editTripEvent.getElement())) {
      toggleComponents(this._editTripEvent, this._tripEvent);
    }
  }

  getOffers() {
    new API(AUTHORIZATION_TOKEN).getOffers()
    .then((offers) => {
      this._availableOffers.push(...offers);
      if (this._editTripEvent !== undefined) {
        this._editTripEvent.updateOffers(this._availableOffers);
      }
    });
    return [];
  }

  getDestinations() {
    new API(AUTHORIZATION_TOKEN).getDestinations()
    .then((offers) => {
      this._availableDestinations.push(...offers);

      if (this._editTripEvent !== undefined) {
        this._editTripEvent.updateDestinations(this._availableDestinations);
      }
    });
    return [];
  }

  createNewEvent(newEventButton) {
    renderComponent(Position.BEFOREEND, this._editTripEvent, this._container);
    this._addEventHandlers(this._unchangedData);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        this.destroyEvent();
        newEventButton.removeAttribute(`disabled`);
      }
    });

    this._editTripEvent.setClickOnDelHandler(() => {
      this._editTripEvent.setData({
        DELETE: `Deleting...`,
      });

      this.destroyEvent();
      newEventButton.removeAttribute(`disabled`);
    });

    this._editTripEvent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const newData = parseFormData(this._editTripEvent.getData());
      newData.offers = this._dummyData.offers;
      newData.destination = this._dummyData.destination;
      newData.type = this._dummyData.type;
      this._editTripEvent.setData({
        SAVE: `Saving...`,
      });
      this._unchangedData = newData;
      toggleComponents(this._editTripEvent, this._tripEvent);
      this._onDataChange(this, null, newData);
      this._addEventHandlers(newData);
      this._addSupplementaryHandlers(newData);
      newEventButton.removeAttribute(`disabled`);
    });
  }

  destroyEvent() {
    removeComponent(this._tripEvent);
    removeComponent(this._editTripEvent);
    document.removeEventListener(`keydown`, this._onEscKey);
  }

  _addEventHandlers(data) {

    this._editTripEvent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const newData = parseFormData(this._editTripEvent.getData());
      newData.offers = this._dummyData.offers;
      newData.destination = this._dummyData.destination;
      newData.type = this._dummyData.type;

      this._editTripEvent.setData({
        SAVE: `Saving...`,
      });

      this._unchangedData = newData;
      toggleComponents(this._editTripEvent, this._tripEvent);
      this._onDataChange(this, data, newData);
    });

    this._editTripEvent.setClickOnFavHandler(() => {
      this._unchangedData.isFavorite = this._unchangedData.isFavorite === true ? false : true;
    });

    this._editTripEvent.setChangeTypeHandler((label) => {
      const currentOfferIndex = this._availableOffers.findIndex((offer) => offer.type === label);
      this._dummyData.offers = this._availableOffers[currentOfferIndex].offers;
      this._dummyData.type = this._availableOffers[currentOfferIndex].type;
      this._editTripEvent.updateData(this._dummyData);
    });

    this._editTripEvent.setChangeDestinationHandler((destinationInput) => {
      this._dummyData.city = destinationInput.value;
      this._dummyData.destination.name = destinationInput.value;
      if (destinationInput.value !== ``) {
        const index = this._availableDestinations.findIndex((destination) => destination.name === destinationInput.value);
        this._dummyData.destination.description = this._availableDestinations[index].description;
        this._dummyData.destination.pictures = this._availableDestinations[index].pictures;
        this._editTripEvent.updateData(this._dummyData);
      }
    });

    this._editTripEvent.setClickOnOffers((offers) => {
      const names = [];
      offers.forEach((input) => {
        const inputLabel = input.labels[0];
        names.push(inputLabel.querySelector(`.event__offer-title`).textContent);
      });
      this._checkedOffers = names;
      if (this._checkedOffers.length < this._dummyData.offers.length) {
        this._dummyData.offers = this._dummyData.offers.filter((offer) => this._checkedOffers.includes(offer.title));
      } else {
        this._dummyData.offers = this._availableOffers.find((availableOffers) => this._dummyData.type === availableOffers.type)
        this._dummyData.offers = this._dummyData.offers.offers.filter((offer) => this._checkedOffers.includes(offer.title));
      }
    });
  }

  _addSupplementaryHandlers(data) {
    this._tripEvent.setClickHandler(() => {
      this._unchangedData.offers.forEach((offer) => {
        this._editTripEvent.getElement().querySelectorAll(`.event__offer-selector`).forEach((selector) => {
          const label = selector.querySelector(`.event__offer-label .event__offer-title`);
          if (label.textContent === offer.title) {
            selector.querySelector(`input`).setAttribute(`checked`, ``);
          }
        });
      });
      this._onViewChange();
      toggleComponents(this._tripEvent, this._editTripEvent);
      const onEscKey = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          this._editTripEvent.reset();
          this._editTripEvent.updateData(this._unchangedData);
          toggleComponents(this._editTripEvent, this._tripEvent);
          document.removeEventListener(`keydown`, onEscKey);
        }
      };
      document.addEventListener(`keydown`, onEscKey);
    });

    this._editTripEvent.setClickOnDelHandler(() => {
      this._editTripEvent.setData({
        DELETE: `Deleting...`,
      });
      this._onDataChange(this, data, null);
    });
  }
}
