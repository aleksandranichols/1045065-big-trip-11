import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import {renderComponent, toggleComponents} from '../utils/render.js';
import {Position} from '../utils/constants.js';

export default class TripEventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.tripEvent = null;
    this.editTripEvent = null;
  }

  render(eventMock) {
    this.tripEvent = new TripEvent(eventMock);
    this.editTripEvent = new EditTripEvent(eventMock);
    renderComponent(Position.BEFOREEND, this.tripEvent, this._container);
    this._addEventHandlers(this.tripEvent, this.editTripEvent, eventMock);
  }

  _addEventHandlers(tripEvent, editTripEvent, eventMock) {
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
      toggleComponents(editTripEvent, tripEvent);
    });

    editTripEvent.setClickOnFavHandler(() => {
      this._onDataChange(this, eventMock, Object.assign({}, eventMock, {isFavorite: !eventMock.isFavorite}));
    });
  }

  setDefaultView() {
    if (document.contains(this.editTripEvent.getElement())) {
      toggleComponents(this.editTripEvent, this.tripEvent);
    }
  }
}
