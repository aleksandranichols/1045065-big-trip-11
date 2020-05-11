import TripInfo from '../components/tripinfo.js';
import TripCost from '../components/tripcost.js';
import Sorting from '../components/sorting.js';
import TripList from '../components/trip-days.js';
import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import TripDayDetails from '../components/trip-day-details.js';
import {renderComponent} from '../utils/render.js';
import {Position} from '../utils/constants.js';
import {SortType} from '../utils/constants.js';

const toggleComponents = (oldComponent, newComponent) => {
  oldComponent.getElement().replaceWith(newComponent.getElement());
};


export default class TripController {
  constructor(eventMocks) {
    this._sorting = new Sorting();
    this._eventMocks = eventMocks;
  }


  _sortTripEvents(sortType, eventMocks) {
    let sortedEventMocks = eventMocks.slice();
    switch (sortType) {
      case SortType.DEFAULT:
        this._renderTripDays();
        break;
      case SortType.PRICE:
        sortedEventMocks.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        sortedEventMocks.
      sort((a, b) => a.startDates.startMonth - b.startDates.startMonth).
      sort((a, b) => a.startDates.startDay - b.startDates.startDay);
        break;
      default:
        throw new Error(`Switch case doesn't exist at sortTripEvents`);
    }
    return sortedEventMocks;
  }

  _renderTripDetails() {
    const tripMain = document.querySelector(`.trip-main`);
    const tripEvents = document.querySelector(`.trip-events`);
    renderComponent(Position.BEFOREEND, this._sorting, tripEvents);
    renderComponent(Position.BEFOREEND, new TripList(), tripEvents);
    renderComponent(Position.AFTERBEGIN, new TripInfo(), tripMain);
    const tripInfo = document.querySelector(`.trip-info`);
    renderComponent(Position.BEFOREEND, new TripCost(), tripInfo);
  }

  _renderTripDays() {
    let tripDaysList = document.querySelector(`.trip-days`);
    tripDaysList.innerHTML = ``;
    let listCounter = 1;
    const days = [];

    this._eventMocks.forEach((eventMock, index) => {
      const tripEvent = new TripEvent(eventMock);
      const editTripEvent = new EditTripEvent(eventMock);
      const currentEventDay = this._eventMocks[index].startDates.startDay;
      let tripDay = document.querySelector(`.day-${listCounter - 1}`);

      if (tripDay !== null && days.some((day) => day.currentEventDay === currentEventDay)) {
        const tripDayList = tripDay.querySelector(`.trip-events__list`);
        renderComponent(Position.BEFOREEND, tripEvent, tripDayList);
      } else {
        tripDay = new TripDayDetails(this._eventMocks[index], listCounter);
        const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
        tripDay.getElement().classList.add(`day-${listCounter}`);
        days.push({listCounter, currentEventDay});
        renderComponent(Position.BEFOREEND, tripEvent, tripDayList);
        listCounter++;
      }

      const onEscKey = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          toggleComponents(editTripEvent, tripEvent);
          document.removeEventListener(`keydown`, onEscKey);
        }
      };

      tripEvent.setClickHandler(() => {
        toggleComponents(tripEvent, editTripEvent);
        document.addEventListener(`keydown`, onEscKey);
      });

      editTripEvent.setEventHandler((evt) => {
        evt.preventDefault();
        toggleComponents(editTripEvent, tripEvent);
      });
    });
  }

  render() {
    this._renderTripDetails();
    this._renderTripDays();

    // testing
    const x = (evt) => {
      let tripDaysList = document.querySelector(`.trip-days`);
      tripDaysList.innerHTML = ``;
      const sortedTripEvents = this._sortTripEvents(evt, this._eventMocks);
      const tripDay = new TripDayDetails(null, 0);
      tripDay.getElement().querySelector(`div`).innerHTML = ``;
      renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      sortedTripEvents.forEach((sortedEvent) => {
        renderComponent(Position.BEFOREEND, new TripEvent(sortedEvent), tripDayList);
      });
      this._sorting.setClickHandler(x);
    };
    this._sorting.setClickHandler(x);

  }
}
