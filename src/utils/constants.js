const TRANSPORT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTIVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];
const TYPES = [].concat(TRANSPORT_TYPES, ACTIVITY_TYPES);
const MAX_OFFERS_TO_SHOW = 3;

// Pretend that we have authorization
const AUTHORIZATION_TOKEN = `Basic Zqgoo9SfdYfQuOCa33eiNMovMVDZUPpD5lENK=`;
const NO_EVENTS_MESSAGE = `Click New Event to create your first point`;
const SHAKE_ANIMATION_TIMEOUT = 600;

const Position = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const SortType = {
  EVENT: `event`,
  PRICE: `price`,
  TIME: `time`
};

const FilterType = {
  DEFAULT: `default`,
  FUTURE: `future`,
  PAST: `past`
};

const Page = {
  TABLE: `table`,
  STATS: `stats`,
};

const DefaultData = {
  DELETE: `Delete`,
  SAVE: `Save`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export {TRANSPORT_TYPES, ACTIVITY_TYPES, TYPES, MAX_OFFERS_TO_SHOW, AUTHORIZATION_TOKEN, NO_EVENTS_MESSAGE, SHAKE_ANIMATION_TIMEOUT,
  Position, SortType, FilterType, Page, DefaultData, Method};
