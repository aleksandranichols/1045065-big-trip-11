export const TRANSPORT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const ACTIVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];
export const TYPES = [].concat(TRANSPORT_TYPES, ACTIVITY_TYPES);
export const MAX_OFFERS_TO_SHOW = 3;

// Pretend that we have authorization
export const AUTHORIZATION_TOKEN = `Basic Zqgoo9SfdYfQuOCa33eiNMovMVDZUPpD5lENK=`;
export const NO_EVENTS_MESSAGE = `Click New Event to create your first point`;
export const SHAKE_ANIMATION_TIMEOUT = 600;

export const Position = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const SortType = {
  EVENT: `event`,
  PRICE: `price`,
  TIME: `time`
};

export const FilterType = {
  DEFAULT: `default`,
  FUTURE: `future`,
  PAST: `past`
};

export const Page = {
  TABLE: `table`,
  STATS: `stats`,
};

export const DefaultData = {
  DELETE: `Delete`,
  SAVE: `Save`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
