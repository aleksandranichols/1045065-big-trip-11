import {getRandomIntegerInRange, splitAString, returnRandomArray, returnRandomElementInArray} from '../utils/general.js';
import {TYPES, CITIES, DESCRIPTIONS_CONDENSED, OFFER_NAMES, NUMBER_OF_OFFERS, TWO_DAYS_IN_MINUTES, ONE_DAY_IN_MINUTES, HOURS_IN_DAY, MINUTES_IN_HOUR, OfferPrice, EventPrice} from '../utils/constants.js';

const eventTimeInMinutes = getRandomIntegerInRange(0, TWO_DAYS_IN_MINUTES);

const generateEventStartDates = () => {
  const startDate = new Date();
  const startMinutes = startDate.getMinutes();
  const startHours = startDate.getHours();
  const startDay = startDate.getDate() + getRandomIntegerInRange(1, 5);
  // since getMonth() returns results from 0, add + 1
  const startMonth = startDate.getMonth() + 1;
  const startYear = startDate.getFullYear();

  return {startMinutes, startHours, startDay, startMonth, startYear};
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

  return {endMinutes, endHours, endDay, endMonth};
};

const returnRandomDescription = () => {
  const descriptions = splitAString(DESCRIPTIONS_CONDENSED, `.`);
  return returnRandomArray(descriptions, 0, descriptions.length);
};

const generatePricesForOffers = (names) => {
  const prices = [];
  names.forEach(() => {
    prices.push(getRandomIntegerInRange(OfferPrice.MIN, OfferPrice.MAX));
  });
  return prices;
};

const generateOffers = () => {
  return TYPES.map((type) => {
    const names = returnRandomArray(OFFER_NAMES, 0, NUMBER_OF_OFFERS);
    const prices = generatePricesForOffers(names);
    return {type, names, prices};
  });
};

const getOffer = () => returnRandomElementInArray(generateOffers());

const addArticleToEventType = () => {
  const LAST_INDEX_OF_TRANSPORT_EVENT = 6;
  let eventType = getOffer().type;
  if (TYPES.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {
    eventType = eventType + ` in`;
  } else {
    eventType = eventType + ` to`;
  }
  return eventType;
};

const generateTripEvent = () => {
  let eventStartDates = generateEventStartDates();
  return {
    type: addArticleToEventType(),
    city: returnRandomElementInArray(CITIES),
    destination: {
      description: returnRandomDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDates: eventStartDates,
    endDates: generateEventEndDates(eventStartDates),
    offers: getOffer(),
    price: getRandomIntegerInRange(EventPrice.MIN, EventPrice.MAX),
  };
};

export const generateTripEventMocks = (count) => {
  return new Array(count).
  fill(``).
  map(generateTripEvent).
  sort((a, b) => a.startDates.startMonth - b.startDates.startMonth).
  sort((a, b) => a.startDates.startDay - b.startDates.startDay);
};
