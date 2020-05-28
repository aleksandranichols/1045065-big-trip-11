import AllMighty from './allmighty.js';
import {splitAString} from '../utils/general.js';

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
  const offersMarkUp = [];
  offers.forEach((offer) => offersMarkUp.push(returnOfferMarkUp(offer.title, offer.price)));
  return (`<ul class="event__selected-offers">${offersMarkUp.join(`\n`)}</ul>`);
};


const returnEventOffersOnEdit = (offers) => {
  let markUp = ``;
  if (offers.title !== `` && offers.length !== 0) {
    const offersMarkUp = [];
    offers.forEach((offer) => {
      const splitOfferTitle = splitAString(offer.title, ` `);
      const offerName = `${splitOfferTitle[splitOfferTitle.length - 2]}-${splitOfferTitle[splitOfferTitle.length - 1]}`;
      offersMarkUp.push(returnOfferMarkUpOnEdit(offer.title, offerName, offer.price));
    });
    markUp = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">${offersMarkUp.join(`\n`)}</div>
    </section>`;
  } else {
    markUp = ``;
  }
  return markUp;
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
