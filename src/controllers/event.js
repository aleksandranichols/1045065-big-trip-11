import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import TripEventModel from '../models/event.js';
import {Position} from '../utils/constants.js';
import {renderComponent, removeComponent, toggleComponents} from '../utils/render.js';
import moment from "moment";

const parseFormData = (formData) => {
  console.log(...formData);
  return new TripEventModel({
    "type": formData.get(`event-type`),
    "base_price": parseInt(formData.get(`event-price`), 10),
    "is_favorite": formData.get(`event-favorite`) === `on` ? true : false,
    "date_from": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`),
    "date_to": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`),
    "destination": {name: formData.get(`event-destination`)},
    "offers": formData.get(`event-offers`),
  });
};

export default class TripEventController {
  constructor(container, data, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._data = data;
    this._tripEvent = new TripEvent(data);
    this._editTripEvent = new EditTripEvent(data);
  }

  render() {
    renderComponent(Position.BEFOREEND, this._tripEvent, this._container);
    this._addEventHandlers(this._tripEvent, this._editTripEvent, this._data);
  }

  setDefaultView() {
    if (document.contains(this._editTripEvent.getElement())) {
      toggleComponents(this._editTripEvent, this._tripEvent);
    }
  }

  createNewEvent() {
    renderComponent(Position.BEFOREEND, this._editTripEvent, this._container);
    this._addEventHandlers(this._tripEvent, this._editTripEvent, this._data);
    document.addEventListener(`keydown`, this._onEscKey(this._editTripEvent, this._tripEvent));
  }

  destroyEvent() {
    removeComponent(this._tripEvent);
    removeComponent(this._editTripEvent);
    document.removeEventListener(`keydown`, this._onEscKey);
  }

  _addEventHandlers(tripEvent, editTripEvent, data) {

    tripEvent.setClickHandler(() => {
      this._onViewChange();
      toggleComponents(tripEvent, editTripEvent);
      document.addEventListener(`keydown`, this._onEscKey(editTripEvent, tripEvent));
    });

    editTripEvent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = editTripEvent.getData();
      const newData = parseFormData(formData);
      if (newData.type === null) {
        newData.type = this._data.type;
      }
      editTripEvent.setData({
        SAVE: `Saving...`,
      });
      this._onDataChange(this, data, newData);
      toggleComponents(editTripEvent, tripEvent);
    });

    editTripEvent.setClickOnFavHandler(() => {
      this._onDataChange(this, data, Object.assign({}, data, {isFavorite: !data.isFavorite}));
    });

    editTripEvent.setClickOnDelHandler(() => {
      editTripEvent.setData({
        SAVE: `Deleting...`,
      });
      this._onDataChange(this, data, null);
    });
  }

  _onEscKey(editTripEvent, tripEvent) {
    return function (evt) {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        toggleComponents(editTripEvent, tripEvent);
        document.removeEventListener(`keydown`, this._onEscKey);
        editTripEvent.reset();
      }
    };
  }
}
