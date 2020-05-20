import AllMighty from './allmighty.js';
import {FilterType} from '../utils/constants.js';

const returnFilters = () => (`<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything" data-filter-type="${FilterType.DEFAULT}">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future" data-filter-type="${FilterType.FUTURE}">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past" data-filter-type="${FilterType.PAST}">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);

export default class Filters extends AllMighty {
  getTemplate() {
    return returnFilters();
  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll(`.trip-filters__filter-label`).forEach((filterButton) => {
      filterButton.addEventListener(`click`, (evt) => {
        const currentFilterType = evt.target.dataset.filterType;
        handler(currentFilterType);
      });
    });
  }
}
