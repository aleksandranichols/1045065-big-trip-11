import {getRandomIntegerInRange, splitAString, returnRandomArray, returnRandomElementInArray} from '../utils/general.js';
import {addArticleToEventType} from '../utils/event-helpers.js';
import {TYPES, CITIES, DESCRIPTIONS_CONDENSED, OFFER_TITLES, NUMBER_OF_OFFERS, TWO_DAYS_IN_MINUTES, ONE_DAY_IN_MINUTES, HOURS_IN_DAY, MINUTES_IN_HOUR, OfferPrice, EventPrice} from '../utils/constants.js';

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

const generateEventEndDates = (date_from) => {
  let {startDay, startMonth} = date_from;
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
    const titles = returnRandomArray(OFFER_TITLES, 0, NUMBER_OF_OFFERS);
    const prices = generatePricesForOffers(titles);
    return {type, titles, prices};
  });
};

export const existingOffers = generateOffers();

const generateTripEvent = () => {
  const randomCity = returnRandomElementInArray(CITIES);
  const randomOffer = returnRandomElementInArray(existingOffers);
  let eventStartDates = generateEventStartDates();
  return {
    base_price: getRandomIntegerInRange(EventPrice.MIN, EventPrice.MAX),
    date_from: eventStartDates,
    date_to: generateEventEndDates(eventStartDates),
    destination: {
      description: returnRandomDescription(),
      name: randomCity,
      pictures: [
        {
          src: `http://picsum.photos/248/152?r=${Math.random()}`,
          description: `Destination picture description`,
        }
      ]
    },
    id: 0,
    is_favorite: false,
    offers: randomOffer,
    type: addArticleToEventType(randomOffer.type, TYPES),
    city: randomCity,
  };
};

export const generateTripEventMocks = (count) => {
  return new Array(count).
  fill(``).
  map(generateTripEvent).
  sort((a, b) => a.date_from.startMonth - b.date_from.startMonth).
  sort((a, b) => a.date_from.startDay - b.date_from.startDay);
};
