/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/*! exports provided: HOURS_NAME, MINUTES_NAME, DAYS_NAME, MONTH_NAMES, TYPES, CITIES, DESCRIPTIONS_CONDENSED, OFFER_NAMES, TWO_DAYS_IN_MINUTES, ONE_DAY_IN_MINUTES, HOURS_IN_DAY, MINUTES_IN_HOUR, NUMBER_OF_EVENTS, NUMBER_OF_OFFERS, OfferPrice, EventPrice, positions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOURS_NAME", function() { return HOURS_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MINUTES_NAME", function() { return MINUTES_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAYS_NAME", function() { return DAYS_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CITIES", function() { return CITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESCRIPTIONS_CONDENSED", function() { return DESCRIPTIONS_CONDENSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFER_NAMES", function() { return OFFER_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWO_DAYS_IN_MINUTES", function() { return TWO_DAYS_IN_MINUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_DAY_IN_MINUTES", function() { return ONE_DAY_IN_MINUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOURS_IN_DAY", function() { return HOURS_IN_DAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MINUTES_IN_HOUR", function() { return MINUTES_IN_HOUR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER_OF_EVENTS", function() { return NUMBER_OF_EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER_OF_OFFERS", function() { return NUMBER_OF_OFFERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferPrice", function() { return OfferPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPrice", function() { return EventPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positions", function() { return positions; });
const HOURS_NAME = `H `;
const MINUTES_NAME = `M `;
const DAYS_NAME = `D `;

const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Chicago`, `New York`, `Los Angeles`, `Saint-Louis`, `Houston`, `Washington DC`];
const DESCRIPTIONS_CONDENSED = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const OFFER_NAMES = [`Add luggage`, `Add meal`, `Switch to comfort class`, `Travel by train`, `Choose seats`];
const TWO_DAYS_IN_MINUTES = 2880;
const ONE_DAY_IN_MINUTES = 1440;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const NUMBER_OF_EVENTS = 15;
const NUMBER_OF_OFFERS = 3;

const OfferPrice = {
  MIN: 5,
  MAX: 15
};

const EventPrice = {
  MIN: 0,
  MAX: 60
};

const positions = {
  afterbegin: `afterbegin`,
  afterend: `afterend`,
  beforeend: `beforeend`
};


/***/ }),

/***/ "./src/components/editevent.js":
/*!*************************************!*\
  !*** ./src/components/editevent.js ***!
  \*************************************/
/*! exports provided: returnEditEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnEditEvent", function() { return returnEditEvent; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");


const returnEditEvent = (tripEvent) => {

  let {startMinutes, startHours, startDay, startMonth, startYear} = tripEvent.startDates;
  let {endMinutes, endHours, endDay, endMonth} = tripEvent.endDates;
  let {description, photo} = tripEvent.destination;
  const eventIcon = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["splitAString"])(tripEvent.type.toLowerCase(), ` `);

  return `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventIcon[0]}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${tripEvent.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripEvent.city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDay}/${startMonth}/${startYear} ${startHours}:${startMinutes}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDay}/${endMonth}/${startYear} ${endHours}:${endMinutes}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripEvent.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">30</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
            <label class="event__offer-label" for="event-offer-comfort-1">
              <span class="event__offer-title">Switch to comfort class</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">100</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
            <label class="event__offer-label" for="event-offer-meal-1">
              <span class="event__offer-title">Add meal</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">15</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
            <label class="event__offer-label" for="event-offer-seats-1">
              <span class="event__offer-title">Choose seats</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">5</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
            <label class="event__offer-label" for="event-offer-train-1">
              <span class="event__offer-title">Travel by train</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">40</span>
            </label>
          </div>
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="${photo}" alt="Event photo">
            <img class="event__photo" src="${photo}" alt="Event photo">
            <img class="event__photo" src="${photo}" alt="Event photo">
            <img class="event__photo" src="${photo}" alt="Event photo">
            <img class="event__photo" src="${photo}" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};


/***/ }),

/***/ "./src/components/event-offers.js":
/*!****************************************!*\
  !*** ./src/components/event-offers.js ***!
  \****************************************/
/*! exports provided: returnEventOffers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnEventOffers", function() { return returnEventOffers; });
const returnOfferMarkUp = (name, price) => {
  return (`<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`);
};

const returnEventOffers = (offers) => {
  let {names, prices} = offers;
  const offersMarkUp = [];
  for (let i = 0; i < names.length; i++) {
    offersMarkUp.push(returnOfferMarkUp(names[i], prices[i]));
  }
  return (`<ul class="event__selected-offers">${offersMarkUp.join(`\n`)}</ul>`);
};


/***/ }),

/***/ "./src/components/event.js":
/*!*********************************!*\
  !*** ./src/components/event.js ***!
  \*********************************/
/*! exports provided: returnEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnEvent", function() { return returnEvent; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./src/components/constants.js");
/* harmony import */ var _event_offers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-offers.js */ "./src/components/event-offers.js");




const returnEvent = (tripEvent) => {
  let {startMinutes, startHours, startDay, startMonth, startYear} = tripEvent.startDates;
  let {endMinutes, endHours, endDay, endMonth} = tripEvent.endDates;

  const generateDuration = (endDuration, startDuration, durationName) => {
    let duration;
    if (endDuration < startDuration) {
      duration = -(endDuration - startDuration) + durationName;
    } else {
      if (endDuration === startDuration) {
        duration = ``;
      } else {
        duration = endDuration - startDuration + durationName;
      }
    }
    return duration;
  };

  const generateEventDuration = () => {
    const durationDays = generateDuration(endDay, startDay, _constants_js__WEBPACK_IMPORTED_MODULE_1__["DAYS_NAME"]);
    const durationHours = generateDuration(endHours, startHours, _constants_js__WEBPACK_IMPORTED_MODULE_1__["HOURS_NAME"]);
    const durationMinutes = generateDuration(endMinutes, startMinutes, _constants_js__WEBPACK_IMPORTED_MODULE_1__["MINUTES_NAME"]);

    const eventDuration = {durationDays, durationHours, durationMinutes};
    return eventDuration;
  };

  let {durationDays, durationHours, durationMinutes} = generateEventDuration();

  const eventIcon = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["splitAString"])(tripEvent.type.toLowerCase(), ` `);

  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventIcon[0]}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripEvent.type} ${tripEvent.city}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}">${startHours}:${startMinutes}</time>
        &mdash;
        <time class="event__end-time" datetime="${startYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}">${endHours}:${endMinutes}</time>
      </p>
      <p class="event__duration">${durationDays}${durationHours}${durationMinutes}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${tripEvent.price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${Object(_event_offers_js__WEBPACK_IMPORTED_MODULE_2__["returnEventOffers"])(tripEvent.offers)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/*! exports provided: returnFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnFilters", function() { return returnFilters; });
const returnFilters = () => (`<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);


/***/ }),

/***/ "./src/components/navigation.js":
/*!**************************************!*\
  !*** ./src/components/navigation.js ***!
  \**************************************/
/*! exports provided: returnNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnNavigation", function() { return returnNavigation; });
const returnNavigation = () => (`<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`);


/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/*! exports provided: returnSorting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnSorting", function() { return returnSorting; });
const returnSorting = () => (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">Day</span>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">
      Time
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">
      Price
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>

  <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>`);


/***/ }),

/***/ "./src/components/trip-days.js":
/*!*************************************!*\
  !*** ./src/components/trip-days.js ***!
  \*************************************/
/*! exports provided: returnTripList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnTripList", function() { return returnTripList; });
const returnTripList = () =>
  (`<ul class="trip-days">
  </ul>`
  );


/***/ }),

/***/ "./src/components/tripcost.js":
/*!************************************!*\
  !*** ./src/components/tripcost.js ***!
  \************************************/
/*! exports provided: returnTripCost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnTripCost", function() { return returnTripCost; });
const returnTripCost = () => (`<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`);


/***/ }),

/***/ "./src/components/tripdetails.js":
/*!***************************************!*\
  !*** ./src/components/tripdetails.js ***!
  \***************************************/
/*! exports provided: returnTripDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnTripDetails", function() { return returnTripDetails; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/components/constants.js");


const returnTripDetails = (tripEvent, counter) => {
  let {startDay, startMonth, startYear} = tripEvent.startDates;
  const startMonthShort = _constants_js__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][startMonth - 1];

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${startYear}-${startMonth}-${startDay}">${startMonthShort} ${startDay}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`;
};


/***/ }),

/***/ "./src/components/tripinfo.js":
/*!************************************!*\
  !*** ./src/components/tripinfo.js ***!
  \************************************/
/*! exports provided: returnTripInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnTripInfo", function() { return returnTripInfo; });
const returnTripInfo = () => (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>
</section>`);


/***/ }),

/***/ "./src/components/utils.js":
/*!*********************************!*\
  !*** ./src/components/utils.js ***!
  \*********************************/
/*! exports provided: getRandomIntegerInRange, splitAString, returnRandomArray, returnRandomElementInArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntegerInRange", function() { return getRandomIntegerInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitAString", function() { return splitAString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnRandomArray", function() { return returnRandomArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnRandomElementInArray", function() { return returnRandomElementInArray; });
const getRandomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const splitAString = (string, delimiter) => string.split(delimiter);

const returnRandomArray = (array, min, max) => {
  const random = [];
  let newArrayLength = (getRandomIntegerInRange(min, max));
  while (newArrayLength > min) {
    let randomArrayElement = array[getRandomIntegerInRange(min, max - 1)];
    if (!random.includes(randomArrayElement)) {
      random.push(randomArrayElement);
      newArrayLength--;
    }
  }
  return random;
};

const returnRandomElementInArray = (array) => array[getRandomIntegerInRange(0, array.length - 1)];


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tripinfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tripinfo.js */ "./src/components/tripinfo.js");
/* harmony import */ var _components_tripcost_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/tripcost.js */ "./src/components/tripcost.js");
/* harmony import */ var _components_navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/navigation.js */ "./src/components/navigation.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_sorting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sorting.js */ "./src/components/sorting.js");
/* harmony import */ var _components_trip_days_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/trip-days.js */ "./src/components/trip-days.js");
/* harmony import */ var _components_tripdetails_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/tripdetails.js */ "./src/components/tripdetails.js");
/* harmony import */ var _components_editevent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/editevent.js */ "./src/components/editevent.js");
/* harmony import */ var _components_event_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/event.js */ "./src/components/event.js");
/* harmony import */ var _mocks_event_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mocks/event.js */ "./src/mocks/event.js");
/* harmony import */ var _components_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/constants */ "./src/components/constants.js");












const renderComponent = (position, component, place) => {
  place.insertAdjacentHTML(position, component);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].afterbegin, Object(_components_tripinfo_js__WEBPACK_IMPORTED_MODULE_0__["returnTripInfo"])(), tripMain);
const tripInfo = document.querySelector(`.trip-info`);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_tripcost_js__WEBPACK_IMPORTED_MODULE_1__["returnTripCost"])(), tripInfo);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].afterend, Object(_components_navigation_js__WEBPACK_IMPORTED_MODULE_2__["returnNavigation"])(), tripControlsMenuHeading);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].afterend, Object(_components_filters_js__WEBPACK_IMPORTED_MODULE_3__["returnFilters"])(), tripControlsFiltersHeading);

const tripEvents = document.querySelector(`.trip-events`);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_sorting_js__WEBPACK_IMPORTED_MODULE_4__["returnSorting"])(), tripEvents);
renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_trip_days_js__WEBPACK_IMPORTED_MODULE_5__["returnTripList"])(), tripEvents);

const NUMBER_OF_EVENTS = 15;
const tripDaysList = document.querySelector(`.trip-days`);

const generateEvents = (numberOfEvents) => {
  const eventData = Object(_mocks_event_js__WEBPACK_IMPORTED_MODULE_9__["generateTripEvents"])(numberOfEvents);
  renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_editevent_js__WEBPACK_IMPORTED_MODULE_7__["returnEditEvent"])(eventData[0]), tripDaysList);
  let listCounter = 1;
  const days = [];
  for (let i = 0; i < eventData.length; i++) {
    let counter = i - 1;
    if (counter < 0) {
      counter++;
    }
    const currentEventDay = eventData[i].startDates.startDay;

    if (days.some((day) => day.currentEventDay === currentEventDay)) {
      const tripDays = Array.from(document.querySelectorAll(`.trip-days__item`)).find((tripDay) => tripDay.querySelector(`.day__counter`).textContent === (listCounter - 1).toString()).querySelector(`.trip-events__list`);
      renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_event_js__WEBPACK_IMPORTED_MODULE_8__["returnEvent"])(eventData[i]), tripDays);
    } else {
      days.push({listCounter, currentEventDay});
      renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_tripdetails_js__WEBPACK_IMPORTED_MODULE_6__["returnTripDetails"])(eventData[i], listCounter), tripDaysList);
      let tripDays = Array.from(document.querySelectorAll(`.trip-days__item`)).find((tripDay) => tripDay.querySelector(`.day__counter`).textContent === listCounter.toString());
      if (tripDays === undefined) {
        tripDays = document.querySelector(`.trip-days__item`).querySelector(`.trip-events__list`);
      } else {
        tripDays = tripDays.querySelector(`.trip-events__list`);
      }
      renderComponent(_components_constants__WEBPACK_IMPORTED_MODULE_10__["positions"].beforeend, Object(_components_event_js__WEBPACK_IMPORTED_MODULE_8__["returnEvent"])(eventData[i]), tripDays);
      listCounter++;
    }
  }
};

generateEvents(NUMBER_OF_EVENTS);


/***/ }),

/***/ "./src/mocks/event.js":
/*!****************************!*\
  !*** ./src/mocks/event.js ***!
  \****************************/
/*! exports provided: generateTripEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTripEvents", function() { return generateTripEvents; });
/* harmony import */ var _components_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/utils.js */ "./src/components/utils.js");
/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/constants.js */ "./src/components/constants.js");



const eventTimeInMinutes = Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerInRange"])(0, _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["TWO_DAYS_IN_MINUTES"]);

const generateEventStartDates = () => {
  const startDate = new Date();
  const startMinutes = startDate.getMinutes();
  const startHours = startDate.getHours();
  const startDay = startDate.getDate() + Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerInRange"])(1, 5);
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
  let endMinutes = eventTimeInMinutes % _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["MINUTES_IN_HOUR"];
  if (eventTimeInMinutes > _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["ONE_DAY_IN_MINUTES"]) {
    endDay = Math.trunc(Math.trunc(eventTimeInMinutes / _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["MINUTES_IN_HOUR"]) / _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["HOURS_IN_DAY"]);
    endHours = Math.trunc(eventTimeInMinutes / _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["MINUTES_IN_HOUR"]) % _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["HOURS_IN_DAY"];
  } else {
    endDay = startDay;
    endHours = Math.trunc(eventTimeInMinutes / _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["MINUTES_IN_HOUR"]);
  }

  if (startDay > endDay) {
    endMonth = startMonth + 1;
  } else {
    endMonth = startMonth;
  }

  return {endMinutes, endHours, endDay, endMonth};
};

const returnRandomDescription = () => {
  const descriptions = Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["splitAString"])(_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["DESCRIPTIONS_CONDENSED"], `.`);
  return Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["returnRandomArray"])(descriptions, 0, descriptions.length);
};

const generatePricesForOffers = (names) => {
  const prices = [];
  names.forEach(() => {
    prices.push(Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerInRange"])(_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["OfferPrice"].MIN, _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["OfferPrice"].MAX));
  });
  return prices;
};

const generateOffers = () => {
  return _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["TYPES"].map((type) => {
    const names = Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["returnRandomArray"])(_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["OFFER_NAMES"], 0, _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["NUMBER_OF_OFFERS"]);
    const prices = generatePricesForOffers(names);
    return {type, names, prices};
  });
};

const getOffer = () => Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["returnRandomElementInArray"])(generateOffers());

const addArticleToEventType = () => {
  const LAST_INDEX_OF_TRANSPORT_EVENT = 6;
  let eventType = getOffer().type;
  if (_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["TYPES"].indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {
    eventType = eventType + ` in`;
  } else {
    eventType = eventType + ` to`;
  }
  return eventType;
};

let eventStartDates = generateEventStartDates();

const generateTripEvent = () => {
  return {
    type: addArticleToEventType(),
    city: Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["returnRandomElementInArray"])(_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["CITIES"]),
    destination: {
      description: returnRandomDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDates: eventStartDates,
    endDates: generateEventEndDates(eventStartDates),
    offers: getOffer(),
    price: Object(_components_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerInRange"])(_components_constants_js__WEBPACK_IMPORTED_MODULE_1__["EventPrice"].MIN, _components_constants_js__WEBPACK_IMPORTED_MODULE_1__["EventPrice"].MAX),
  };
};

const generateTripEvents = (count) => {
  return new Array(count).
  fill(``).
  map(generateTripEvent).
  sort((a, b) => a.startDates.startMonth - b.startDates.startMonth).
  sort((a, b) => a.startDates.startDay - b.startDates.startDay);
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map