import {FilterType} from '../utils/constants';
import {returnEventDates} from '../utils/event-helpers.js';

export default class TripEvents {
  constructor(data) {
    this._currentFilter = FilterType.DEFAULT;
    this._tripEventData = data;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getData() {
    return this._tripEventData;
  }

  getFilteredData() {
    console.log(this._getDataByAFilterType(this._currentFilter));
    return this._getDataByAFilterType(this._currentFilter);
  }

  getEmptyEvent() {
    return {
      destination: {
        name: ``,
        description: ``,
        pictures: []
      },
      endDate: new Date(),
      id: Math.random(),
      isFavorite: false,
      offers: [],
      price: 0,
      startDate: new Date(),
      type: `transport`
    };
  }

  addData(newTripEventData) {
    this._tripEventData = this._tripEventData.slice();
    this._tripEventData.push(newTripEventData);
  }

  updateData(id, newTripEventData) {
    const index = this._tripEventData.findIndex((data) => data.id === id);
    this._tripEventData = [].concat(this._tripEventData.slice(0, index), newTripEventData, this._tripEventData.slice(index + 1));
  }

  removeData(id) {
    this._tripEventData = this._tripEventData.filter((it) => it.id !== id);
  }

  setFilter(filterType) {
    this._currentFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _getDataByAFilterType(filterType) {
    let filteredEventData = this._tripEventData;
    filteredEventData.forEach((it) => {
      let {startDate, endDate} = returnEventDates(it.startDate, it.endDate);
      it.startDate = startDate;
      it.endDate = endDate;
    });
    switch (filterType) {
      case FilterType.DEFAULT:
        filteredEventData = filteredEventData;
        break;
      case FilterType.FUTURE:
        filteredEventData = filteredEventData.filter((it) => {
          return it.startDate > new Date();
        });
        break;
      case FilterType.PAST:
        filteredEventData = filteredEventData.filter((it) => {
          return it.endDate < new Date();
        });
        break;
      default:
        throw new Error(`Switch case doesn't exist at getDataByAFilterType`);
    }
    return filteredEventData;
  }
}
