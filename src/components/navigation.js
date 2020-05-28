import AllMighty from './allmighty.js';
import {Page} from '../utils/constants.js';

const returnNavigation = () => (`<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#${Page.TABLE}">Table</a>
  <a class="trip-tabs__btn" href="#${Page.STATS}" >Stats</a>
</nav>`);

export default class Navigation extends AllMighty {
  constructor() {
    super();
    this._currentPage = Page.TABLE;
  }
  getTemplate() {
    return returnNavigation();
  }

  onPageChange(handler) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((page) => {
      page.addEventListener(`click`, (evt) => {
        this.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
        evt.target.classList.add(`trip-tabs__btn--active`);
        if (evt.target.href.includes(Page.TABLE)) {
          this._currentPage = Page.TABLE;
          handler(this._currentPage);
        } else {
          this._currentPage = Page.STATS;
          handler(this._currentPage);
        }
      });
    });
  }
}
