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
  constructor(container, eventMocks) {
    this._sorting = new Sorting();
    this._container = container;
    this._eventMocks = eventMocks;
  }


  _sortTripEvents(sortType, eventMocks) {
    let sortedEventMocks = eventMocks.slice();
    switch (sortType) {
      case SortType.DEFAULT:
        this._renderTripDays();
        sortedEventMocks = ``;
        break;
      case SortType.PRICE:
        sortedEventMocks.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        sortedEventMocks.
      sort((a, b) => b.startDates.startYear - a.startDates.startYear).
      sort((a, b) => b.startDates.startMonth - a.startDates.startMonth).
      sort((a, b) => b.startDates.startDay - a.startDates.startDay);
        break;
      default:
        throw new Error(`Switch case doesn't exist at sortTripEvents`);
    }
    return sortedEventMocks;
  }

  _renderTripDetails() {
    const tripMain = this._container.querySelector(`.trip-main`);
    const tripEvents = this._container.querySelector(`.trip-events`);
    renderComponent(Position.BEFOREEND, this._sorting, tripEvents);
    renderComponent(Position.BEFOREEND, new TripList(), tripEvents);
    renderComponent(Position.AFTERBEGIN, new TripInfo(), tripMain);
    const tripInfo = this._container.querySelector(`.trip-info`);
    renderComponent(Position.BEFOREEND, new TripCost(), tripInfo);
  }

  _addEventHandlers(tripEvent, editTripEvent) {
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
  }

  _renderTripDays() {
    let tripDaysList = this._container.querySelector(`.trip-days`);
    tripDaysList.innerHTML = ``;
    let listCounter = 1;
    const days = [];

    this._eventMocks.forEach((eventMock, index) => {
      const tripEvent = new TripEvent(eventMock);
      const editTripEvent = new EditTripEvent(eventMock);
      const currentEventDay = this._eventMocks[index].startDates.startDay;
      let tripDay = this._container.querySelector(`.day-${listCounter - 1}`);

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

      this._addEventHandlers(tripEvent, editTripEvent);
    });
  }

  render() {
    this._renderTripDetails();
    this._renderTripDays();

    const sortTripEventsByType = (evt) => {
      let tripDaysList = this._container.querySelector(`.trip-days`);
      tripDaysList.innerHTML = ``;
      const sortedTripEventsMocks = this._sortTripEvents(evt, this._eventMocks);
      const tripDay = new TripDayDetails(null, 0);
      tripDay.getElement().querySelector(`div`).innerHTML = ``;
      renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      sortedTripEventsMocks.forEach((sortedEventMock) => {
        const sortedTripEvent = new TripEvent(sortedEventMock);
        const sortedTripEditEvent = new EditTripEvent(sortedEventMock);
        renderComponent(Position.BEFOREEND, sortedTripEvent, tripDayList);
        this._addEventHandlers(sortedTripEvent, sortedTripEditEvent);
      });
    };

    this._sorting.setClickHandler(sortTripEventsByType);

  }
}
