import TripEventController from './event.js';
import TripInfo from '../components/tripinfo.js';
import TripCost from '../components/tripcost.js';
import Sorting from '../components/sorting.js';
import TripList from '../components/trip-days.js';
import TripDayDetails from '../components/trip-day-details.js';
import {renderComponent} from '../utils/render.js';
import {Position, SortType} from '../utils/constants.js';
import {returnEventDates} from '../utils/event-helpers.js';

export default class TripController {
  constructor(container, eventsModel, api) {
    this._sorting = new Sorting();
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;
    this._tripEvents = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._renderTripDetails();
    this._renderTripDays();
    const sortTripEventsByType = (evt) => {
      this._sortEvents(evt);
    };

    this._sorting.setClickHandler(sortTripEventsByType);
  }

  display() {
    this._container.querySelector(`.trip-events`).classList.add(`displayed`);
    this._container.querySelector(`.trip-events`).classList.remove(`hidden`);
  }

  hide() {
    this._container.querySelector(`.trip-events`).classList.add(`hidden`);
    this._container.querySelector(`.trip-events`).classList.remove(`displayed`);
  }

  _renderEvents(sortType) {
    this._renderTripDays();
    this._sortEvents(sortType);
    this._sorting.setClickHandler(this._sortEvents);
  }

  _sortEvents(sortType) {
    let tripDaysList = this._container.querySelector(`.trip-days`);
    tripDaysList.innerHTML = ``;
    const sortedTripEventsData = this._sortTripEvents(sortType, this._eventsModel.getFilteredData());
    const tripDay = new TripDayDetails(null, 0);
    tripDay.getElement().querySelector(`div`).innerHTML = ``;
    renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
    const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
    if (sortedTripEventsData) {
      sortedTripEventsData.forEach((sortedEventData) => {
        new TripEventController(tripDayList, sortedEventData, this._onDataChange, this._onViewChange).render();
      });
    }
  }

  createNewEvent(newEventButton, tripEventModel) {
    newEventButton.setClickOnNewEventHandler(() => {
      this._onViewChange();
      newEventButton.getElement().setAttribute(`disabled`, ``);
      const noTripEvents = this._container.querySelector(`.trip-events__msg`);
      if (noTripEvents !== null) {
        this._container.querySelector(`.trip-events__msg`).remove();
      }
      const tripDay = new TripDayDetails(null, ``);
      let tripDaysList = ``;
      tripDaysList = this._container.querySelector(`.trip-days`);
      if (tripDaysList === null) {
        this._renderTripDetails();
        tripDaysList = this._container.querySelector(`.trip-days`);
      }
      renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      renderComponent(Position.AFTERBEGIN, tripDay, tripDaysList);
      const tripEventController = new TripEventController(tripDayList, tripEventModel, this._onDataChange, this._onViewChange);
      tripEventController.createNewEvent(newEventButton.getElement());
    });
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

  _renderTripDays() {
    let tripDaysList = this._container.querySelector(`.trip-days`);
    tripDaysList.innerHTML = ``;
    let listCounter = 1;
    const days = [];
    const data = this._eventsModel.getFilteredData().sort((a, b) => a.startDate - b.startDate);
    data.forEach((eventData, index) => {
      let {startDateWithDash} = returnEventDates(data[index].startDate, data[index].endDate);
      let tripDay = this._container.querySelector(`.day-${listCounter - 1}`);


      if (tripDay !== null && days.some((day) => day.startDateWithDash === startDateWithDash)) {
        const tripDayList = tripDay.querySelector(`.trip-events__list`);
        const tripEvent = new TripEventController(tripDayList, this._onDataChange, this._onViewChange);
        tripEvent.render(eventData);
        this._tripEvents.push(tripEvent);
      } else {
        tripDay = new TripDayDetails(data[index], listCounter);
        const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
        tripDay.getElement().classList.add(`day-${listCounter}`);
        days.push({listCounter, startDateWithDash});
        const tripEvent = new TripEventController(tripDayList, this._onDataChange, this._onViewChange);
        tripEvent.render(eventData);
        this._tripEvents.push(tripEvent);
        listCounter++;
      }
    });
  }

  _onDataChange(EventController, oldTripEventData, newTripEventData) {
    if (newTripEventData === null) {
      this._api.deleteEvent(oldTripEventData.id)
      .then(() => {
        this._eventsModel.removeData(oldTripEventData.id);
        this._renderTripDays();
      })
      .catch((error) => error.message);
    } else if (oldTripEventData === null) {
      this._api.createEvent(newTripEventData)
      .then((eventModel) => {
        const isSuccess = this._eventsModel.addData(eventModel);
        if (isSuccess) {
          this._newEventButton.getElement().removeAttribute(`disabled`, ``);
          const currentSort = this._container.querySelector(`input:checked ~ .trip-sort__btn`);
          this._renderEvents(currentSort.getAttribute(`data-sort-type`));
        }
      })
      .catch((error) => error.message);
    } else {
      this._api.updateEvent(oldTripEventData.id, newTripEventData)
      .then((eventModel) => {
        const isSuccess = this._eventsModel.updateData(oldTripEventData.id, eventModel);
        if (isSuccess) {
          const currentSort = this._container.querySelector(`input:checked ~ .trip-sort__btn`);
          this._renderEvents(currentSort.getAttribute(`data-sort-type`));
        }
      })
      .catch((error) => error.message);
    }
  }

  _onViewChange() {
    this._tripEvents.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._renderTripDays();
    this._sortTripEvents(`event`, this._eventsModel.getFilteredData());
  }

  _sortTripEvents(sortType, eventData) {
    let sortedEventData = eventData.slice();
    switch (sortType) {
      case SortType.EVENT:
        this._renderTripDays();
        sortedEventData = ``;
        break;
      case SortType.PRICE:
        sortedEventData.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        sortedEventData.
      sort((a, b) => {
        const aDuration = returnEventDates(a.startDate, a.endDate).durationDiff;
        const bDuration = returnEventDates(b.startDate, b.endDate).durationDiff;
        return bDuration - aDuration;
      });
        break;
      default:
        throw new Error(`Switch case doesn't exist at sortTripEvents`);
    }
    return sortedEventData;
  }

}
