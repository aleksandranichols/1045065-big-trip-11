import Sorting from '../components/sorting.js';
import TripEventController from './event.js';
import NewEventButton from '../components/new-event.js';
import TripInfo from '../components/tripinfo.js';
import TripCost from '../components/tripcost.js';
import TripList from '../components/trip-days.js';
import TripDayDetails from '../components/trip-day-details.js';
import {renderComponent} from '../utils/render.js';
import {Position, SortType} from '../utils/constants.js';
import {returnEventDates} from '../utils/event-helpers.js';

export default class TripController {
  constructor(container, eventModel, api) {
    this._sorting = new Sorting();
    this._newEventButton = new NewEventButton();
    this._container = container;
    this._eventModel = eventModel;
    this._api = api;
    this._tripEvents = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventModel.setFilterChangeHandler(this._onFilterChange);
    this._eventModel.setDataChangeHandler(this._onDataChange);
    this._renderNewEventButton();
  }

  render() {
    this._renderTripDetails();
    this._renderTripDays();

    const sortTripEventsByType = (evt) => {
      let tripDaysList = this._container.querySelector(`.trip-days`);
      tripDaysList.innerHTML = ``;
      const sortedTripEventsMocks = this._sortTripEvents(evt, this._eventModel.getFilteredData());
      const tripDay = new TripDayDetails(null, 0);
      tripDay.getElement().querySelector(`div`).innerHTML = ``;
      renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      if (sortedTripEventsMocks) {
        sortedTripEventsMocks.forEach((sortedEventMock) => {
          new TripEventController(tripDayList, sortedEventMock, this._onDataChange, this._onViewChange).render();
        });
      }
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

  _createNewEvent() {
    this._newEventButton.setClickOnNewEventHandler(() => {
      const tripDay = new TripDayDetails(null, ``);
      const tripDaysList = this._container.querySelector(`.trip-days`);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      renderComponent(Position.AFTERBEGIN, tripDay, tripDaysList);
      const tripEventController = new TripEventController(tripDayList, this._eventModel.getEmptyEvent(), this._onDataChange, this._onViewChange);
      tripEventController.createNewEvent();
      this._newEventButton.getElement().setAttribute(`disabled`, ``);
    });
  }

  _renderNewEventButton() {
    const main = this._container.querySelector(`.trip-main`);
    renderComponent(Position.BEFOREEND, this._newEventButton, main);
    this._createNewEvent(this._newEventButton);
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
    const data = this._eventModel.getFilteredData();

    data.forEach((eventData, index) => {
      let {startDateWithDash} = returnEventDates(data[index].startDate, data[index].endDate);
      let tripDay = this._container.querySelector(`.day-${listCounter - 1}`);

      if (tripDay !== null && days.some((day) => day.startDateWithDash === startDateWithDash)) {
        const tripDayList = tripDay.querySelector(`.trip-events__list`);
        const tripEvent = new TripEventController(tripDayList, eventData, this._onDataChange, this._onViewChange);
        tripEvent.render();
        this._tripEvents.push(tripEvent);
      } else {
        tripDay = new TripDayDetails(data[index], listCounter);
        const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
        tripDay.getElement().classList.add(`day-${listCounter}`);
        days.push({listCounter, startDateWithDash});
        const tripEvent = new TripEventController(tripDayList, eventData, this._onDataChange, this._onViewChange);
        tripEvent.render();
        this._tripEvents.push(tripEvent);
        listCounter++;
      }
    });
  }

  _onDataChange(tripEventController, oldTripEventData, newTripEventData) {
    if (newTripEventData === null) {
      this._api.deleteEvent(oldTripEventData.id)
      .then(() => {
        this._eventModel.removeData(oldTripEventData.id);
        this._renderTripDays();
      });
    } else if (oldTripEventData === null) {
      this._eventModel.addData(newTripEventData);
      this._renderTripDays();
    } else {
      this._api.updateEvent(oldTripEventData.id, newTripEventData)
      .then((eventModel) => {
        const isSuccess = this._eventModel.updateData(oldTripEventData.id, eventModel);
        if (isSuccess) {
          this._renderTripDays();
        }
      });
    }
  }

  _onViewChange() {
    this._tripEvents.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._renderTripDays();
    this._sortTripEvents(`event`, this._eventModel.getFilteredData());
  }

  _sortTripEvents(sortType, eventData) {
    let sortedEventMocks = eventData.slice();
    switch (sortType) {
      case SortType.EVENT:
        this._renderTripDays();
        sortedEventMocks = ``;
        break;
      case SortType.PRICE:
        sortedEventMocks.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        sortedEventMocks.
      sort((a, b) => {
        const aDuration = returnEventDates(a.startDate, a.endDate).durationDiff;
        const bDuration = returnEventDates(b.startDate, b.endDate).durationDiff;
        return bDuration - aDuration;
      });
        break;
      default:
        throw new Error(`Switch case doesn't exist at sortTripEvents`);
    }
    return sortedEventMocks;
  }
}
