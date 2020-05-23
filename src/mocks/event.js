import {getRandomIntegerInRange, splitAString, returnRandomArray, returnRandomElementInArray} from '../utils/general.js';
import {addArticleToEventType} from '../utils/event-helpers.js';
import {TYPES, CITIES, DESCRIPTIONS_CONDENSED, OFFER_TITLES, NUMBER_OF_OFFERS, OfferPrice, EventPrice} from '../utils/constants.js';

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
  return {
    price: getRandomIntegerInRange(EventPrice.MIN, EventPrice.MAX),
    startDate: `2020-07-10T22:55:56.845Z`,
    endDate: `2020-07-11T11:22:13.375Z`,
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
    id: Math.random(),
    isFavorite: false,
    offers: randomOffer,
    type: addArticleToEventType(randomOffer.type, TYPES),
    city: randomCity,
  };
};

export const generateTripEventMocks = (count) => {
  return new Array(count).
  fill(``).
  map(generateTripEvent).
  sort((a, b) => a.startDate - b.endDate);
};
