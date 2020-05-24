import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import {Position} from '../utils/constants.js';
import {renderComponent, toggleComponents} from '../utils/render.js';

export default class TripEventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.tripEvent = null;
    this.editTripEvent = null;
  }

  render(data) {
    this.tripEvent = new TripEvent(data);
    this.editTripEvent = new EditTripEvent(data);
    renderComponent(Position.BEFOREEND, this.tripEvent, this._container);
    this._addEventHandlers(this.tripEvent, this.editTripEvent, data);
  }

  setDefaultView() {
    if (document.contains(this.editTripEvent.getElement())) {
      toggleComponents(this.editTripEvent, this.tripEvent);
    }
  }

  createNewEvent(data) {
    this.tripEvent = new TripEvent(data);
    this.editTripEvent = new EditTripEvent(data);
    renderComponent(Position.BEFOREEND, this.editTripEvent, this._container);
    this._addEventHandlers(this.tripEvent, this.editTripEvent, data);
  }

  _addEventHandlers(tripEvent, editTripEvent, data) {
    const onEscKey = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        toggleComponents(editTripEvent, tripEvent);
        document.removeEventListener(`keydown`, onEscKey);
      }
    };

    tripEvent.setClickHandler(() => {
      this._onViewChange();
      toggleComponents(tripEvent, editTripEvent);
      document.addEventListener(`keydown`, onEscKey);
    });

    editTripEvent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, data, Object.assign({}, data, {isFavorite: !data.isFavorite}));
      toggleComponents(editTripEvent, tripEvent);
    });

    editTripEvent.setClickOnFavHandler(() => {
      this._onDataChange(this, data, Object.assign({}, data, {isFavorite: !data.isFavorite}));
    });

    editTripEvent.setClickOnDelHandler(() => {
      this._onDataChange(this, data, null);
    });
  }
}
