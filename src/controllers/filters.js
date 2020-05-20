import Filters from '../components/filters.js'
import {Position, FilterType} from '../utils/constants.js';
import {renderComponent} from '../utils/render.js';

export default class FiltersController {
  constructor(container, eventModel) {
    this._eventModel = eventModel;
    this._container = container;
    this._currentFilterType = FilterType.DEFAULT;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render(filters) {
    this._filters = filters;
    renderComponent(Position.AFTEREND, this._filters, this._container);
    this._filters.setClickHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    console.log(this._eventModel);
    this._currentFilterType = filterType;
    this._eventModel.setFilter(this._currentFilterType);
    this._eventModel.getData(this._currentFilterType);
  }
}
