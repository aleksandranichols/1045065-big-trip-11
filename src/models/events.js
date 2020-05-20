import {FilterType} from '../utils/constants';

export default class TripEvents {
  constructor(mocks) {
    this._currentFilter = FilterType.DEFAULT;
    this._tripEventData = mocks;
    this._dataChangeHandlers = [];
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
  }

  removeData(id) {
    this._tripEventData = this._tripEventData.slice().filter((it) => it.id !== id);
  }

  setFilter(filterType) {
    this._currentFilter = filterType;
    this._callHandlers(this._dataChangeHandlers)
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _getDataByAFilterType(filterType) {
    console.log(filterType);
    let filteredEventData = this._tripEventData.slice();
    switch (filterType) {
      case FilterType.DEFAULT:
        return filteredEventData;
        break;
      case FilterType.FUTURE:
        filteredEventData.filter((it) => {it.startDate > new Date()});
        break;
      case FilterType.PAST:
        filteredEventData.filter((it) => {it.endDate < new Date()});
        break;
      default:
        throw new Error(`Switch case doesn't exist at getDataByAFilterType`);
    }
    return filteredEventData;
  }
}
