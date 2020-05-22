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
    return this._getDataByAFilterType(this._currentFilter);
  }

  addData(newTripEventData) {
    this._tripEventData = [].concat(this._tripEventData.push(newTripEventData));
  }

  updateData(id, newTripEventData) {
    const index = this._tripEventData.findIndex((data) => data.id === id);
    this._tripEventData = [].concat(this._tripEventData.slice(0, index), newTripEventData, this._tripEventData.slice(index + 1));
    console.log(this._dataChangeHandlers, this._tripEventData);
    this._callHandlers(this._dataChangeHandlers); // выдает повторный вызов функции в контроллере Trip со значением undefined
    // верно, что при апдейте мне нужно как то данные в getData() передавать? поскольку мы тут создали новый массив
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
