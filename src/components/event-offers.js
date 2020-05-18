import AllMighty from './allmighty.js';
import {OFFER_NAMES} from '../utils/constants.js';

const returnOfferMarkUp = (title, price) => {
  return (`<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`);
};

const returnOfferMarkUpOnEdit = (title, name, price) => {
  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}">
    <label class="event__offer-label" for="event-offer-${name}-1">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`);
};

const returnEventOffers = (offers) => {
  let {titles, prices} = offers;
  const offersMarkUp = [];
  titles.forEach((title, index) => {
    offersMarkUp.push(returnOfferMarkUp(title, prices[index]));
  });
  return (`<ul class="event__selected-offers">${offersMarkUp.join(`\n`)}</ul>`);
};


const returnEventOffersOnEdit = (offers) => {
  let {titles, prices} = offers;
  const offersMarkUp = [];
  titles.forEach((title, index) => {
    offersMarkUp.push(returnOfferMarkUpOnEdit(title, OFFER_NAMES[index], prices[index]));
  });
  return (`<div class="event__available-offers">${offersMarkUp.join(`\n`)}</div>`);
};

export default class EventOffers extends AllMighty {
  constructor(offers) {
    super();
    this._offers = offers;
  }
  getEventTemplate() {
    return returnEventOffers(this._offers);
  }

  getEventTemplateOnEdit() {
    return returnEventOffersOnEdit(this._offers);
  }
}
