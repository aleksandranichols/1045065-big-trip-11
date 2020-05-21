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
  constructor(container, eventModel) {
    this._sorting = new Sorting();
    this._container = container;
    this._eventModel = eventModel;
    this._tripEvents = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventModel.setFilterChangeHandler(this._onFilterChange);
    this._eventModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._renderTripDetails();
    this._renderTripDays();
    const sortTripEventsByType = (evt) => {
      let tripDaysList = this._container.querySelector(`.trip-days`);
      tripDaysList.innerHTML = ``;
      const sortedTripEventsMocks = this._sortTripEvents(evt, this._eventModel.getData());
      const tripDay = new TripDayDetails(null, 0);
      tripDay.getElement().querySelector(`div`).innerHTML = ``;
      renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
      const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
      if (sortedTripEventsMocks) {
        sortedTripEventsMocks.forEach((sortedEventMock) => {
          new TripEventController(tripDayList, this._onDataChange, this._onViewChange).render(sortedEventMock);
        });
      }
    };

    this._sorting.setClickHandler(sortTripEventsByType);
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
    const mocks = this._eventModel.getData();

    mocks.forEach((eventMock, index) => {
      let {startDateWithDash} = returnEventDates(mocks[index].startDate, mocks[index].endDate);
      let tripDay = this._container.querySelector(`.day-${listCounter - 1}`);

      if (tripDay !== null && days.some((day) => day.startDateWithDash === startDateWithDash)) {
        const tripDayList = tripDay.querySelector(`.trip-events__list`);
        const tripEvent = new TripEventController(tripDayList, this._onDataChange, this._onViewChange);
        tripEvent.render(eventMock);
        this._tripEvents.push(tripEvent);
      } else {
        tripDay = new TripDayDetails(mocks[index], listCounter);
        const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderComponent(Position.BEFOREEND, tripDay, tripDaysList);
        tripDay.getElement().classList.add(`day-${listCounter}`);
        days.push({listCounter, startDateWithDash});
        const tripEvent = new TripEventController(tripDayList, this._onDataChange, this._onViewChange);
        tripEvent.render(eventMock);
        this._tripEvents.push(tripEvent);
        listCounter++;
      }
    });
  }

  _onDataChange(EventController, oldTripEventData, newTripEventData) {
    if (newTripEventData === null) {
      this._eventModel.removeData(oldTripEventData.id);
      this._renderTripDays();
    } else if (oldTripEventData === null) {
      this._eventModel.addData(newTripEventData);
      this._renderTripDays();
    } else {
      this._eventModel.updateData(oldTripEventData.id, newTripEventData);
      EventController.render(newTripEventData);
    }
  }

  _onViewChange() {
    this._tripEvents.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._renderTripDays();
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
