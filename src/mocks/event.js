import {getRandomIntegerInRange, splitAString, returnRandomArray, returnRandomElementInArray} from '../components/utils.js';

const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const cities = [`Chicago`, `New York`, `Los Angeles`, `Saint-Louis`, `Houston`, `Washington DC`];
const descriptionsCondensed = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const offerNames = [`Add luggage`, `Add meal`, `Switch to comfort class`, `Travel by train`, `Choose seats`];

const TWO_DAYS_IN_MINUTES = 2880;
const ONE_DAY_IN_MINUTES = 1440;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const eventTimeInMinutes = getRandomIntegerInRange(0, TWO_DAYS_IN_MINUTES);

const generateEventStartDates = () => {
  const startDate = new Date();
  const startMinutes = startDate.getMinutes();
  const startHours = startDate.getHours();
  const startDay = startDate.getDate();
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  let eventStartDates = {};
  eventStartDates = {startMinutes, startHours, startDay, startMonth, startYear};
  return eventStartDates;
};

const generateEventEndDates = (startDates) => {
  let {startDay, startMonth} = startDates;
  let endMonth;
  let endDay;
  let endHours;
  let endMinutes = eventTimeInMinutes % MINUTES_IN_HOUR;
  if (eventTimeInMinutes > ONE_DAY_IN_MINUTES) {
    endDay = Math.trunc(Math.trunc(eventTimeInMinutes / MINUTES_IN_HOUR) / HOURS_IN_DAY);
    endHours = Math.trunc(eventTimeInMinutes / MINUTES_IN_HOUR) % HOURS_IN_DAY;
  } else {
    endDay = startDay;
    endHours = Math.trunc(eventTimeInMinutes / MINUTES_IN_HOUR);
  }

  if (startDay > endDay) {
    endMonth = startMonth + 1;
  } else {
    endMonth = startMonth;
  }

  let eventEndDates = {};
  eventEndDates = {endMinutes, endHours, endDay, endMonth};
  return eventEndDates;
};

const returnRandomDescription = () => {
  const descriptions = splitAString(descriptionsCondensed, `.`);
  return returnRandomArray(descriptions, 0, descriptions.length);
};

const OFFER_PRICE_MIN = 5;
const OFFER_PRICE_MAX = 15;

const generatePricesForOffers = (names) => {
  const prices = [];
  names.forEach(() => {
    prices.push(getRandomIntegerInRange(OFFER_PRICE_MIN, OFFER_PRICE_MAX));
  });
  return prices;
};

const generateOffers = () => {
  return types.map((type) => {
    const names = returnRandomArray(offerNames, 0, offerNames.length);
    const prices = generatePricesForOffers(names);
    return {type, names, prices};
  });
};

const returnOfferMarkUp = (name, price) => {
  return (`<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`);
};

const getOffer = () => returnRandomElementInArray(generateOffers());

const returnOffersMarkUp = () => {
  let {names, prices} = getOffer();
  const offersMarkUp = [];
  for (let i = 0; i < names.length; i++) {
    offersMarkUp.push(returnOfferMarkUp(names[i], prices[i]));
  }
  return (`<ul class="event__selected-offers">${offersMarkUp.join(`\n`)}</ul>`);
};

const addArticleToEventType = () => {
  const LAST_INDEX_OF_TRANSPORT_EVENT = 6;
  let eventType = getOffer().type;
  if (types.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {
    eventType = eventType + ` in`;
  } else {
    eventType = eventType + ` to`;
  }
  return eventType;
};

const EVENT_PRICE_MIN = 0;
const EVENT_PRICE_MAX = 60;
const eventStartDates = generateEventStartDates();

const generateTripEvent = () => {
  return {
    type: addArticleToEventType(),
    city: returnRandomElementInArray(cities),
    destination: {
      description: returnRandomDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDates: eventStartDates,
    endDates: generateEventEndDates(eventStartDates),
    offers: returnOffersMarkUp(),
    price: getRandomIntegerInRange(EVENT_PRICE_MIN, EVENT_PRICE_MAX),
  };
};

export const generateTripEvents = (count) => {
  return new Array(count).
  fill(``).
  map(generateTripEvent);
};
