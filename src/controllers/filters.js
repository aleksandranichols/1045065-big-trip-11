import Filters from '../components/filters.js';
import {Position} from '../utils/constants.js';
import {renderComponent} from '../utils/render.js';

export default class FiltersController {
  constructor(container, eventModel) {
    this._eventModel = eventModel;
    this._container = container;
    this._filters = new Filters();
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    renderComponent(Position.AFTEREND, this._filters, this._container);
    this._filters.setClickHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._currentFilterType = filterType;
    this._eventModel.setFilter(this._currentFilterType);
  }
}
