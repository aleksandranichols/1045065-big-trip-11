import Filters from '../components/filters.js';
import {Position} from '../utils/constants.js';
import {renderComponent, removeComponent} from '../utils/render.js';

export default class FiltersController {
  constructor(eventModel) {
    this._eventModel = eventModel;
    this._filters = new Filters();
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render(container) {
    removeComponent(this._filters);
    renderComponent(Position.AFTEREND, this._filters, container);
    this._filters.setClickHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    // Avoid errors when model is empty
    if (this._eventModel.getData().length !== 0) {
      this._currentFilterType = filterType;
      this._eventModel.setFilter(this._currentFilterType);
    }
  }
}
