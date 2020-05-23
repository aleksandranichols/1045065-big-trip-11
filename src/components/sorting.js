import AllMighty from './allmighty.js';
import {SortType} from '../utils/constants.js';

const returnSorting = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
};

export default class Sorting extends AllMighty {
  constructor() {
    super();
    this._currentSortType = SortType.EVENT;
    this._oldSortType = null;
    this._setCheckedOnSorting(this._currentSortType, this._oldSortType);
  }
  getTemplate() {
    return returnSorting();
  }

  setClickHandler(handler) {
    let currentSortType = this._currentSortType;
    let oldSortType = this._oldSortType;
    this.getElement().querySelectorAll(`.trip-sort__btn`).forEach((sortButton) => {
      sortButton.addEventListener(`click`, (evt) => {
        if (evt.target.dataset.sortType !== currentSortType) {
          currentSortType = evt.target.dataset.sortType;
          this._setCheckedOnSorting(currentSortType, oldSortType);
          handler(currentSortType);
          oldSortType = currentSortType;

        }
      });
    });
  }

  _setCheckedOnSorting(currentSortType, oldSortType) {
    this.getElement().querySelector(`input[value=sort-${currentSortType}]`).setAttribute(`checked`, ``);
    if (oldSortType !== null) {
      this.getElement().querySelector(`input[value=sort-${oldSortType}]`).removeAttribute(`checked`);
    }
  }
}
