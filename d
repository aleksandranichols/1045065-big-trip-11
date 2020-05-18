[1mdiff --git a/src/components/editevent.js b/src/components/editevent.js[m
[1mindex 2057d1a..9960d85 100644[m
[1m--- a/src/components/editevent.js[m
[1m+++ b/src/components/editevent.js[m
[36m@@ -1,10 +1,9 @@[m
 import AllMightySmarty from './allmightysmarty.js';[m
 import EventOffers from './event-offers.js';[m
 import {TYPES} from '../utils/constants';[m
[31m-import {splitAString} from '../utils/general.js';[m
 import {addArticleToEventType, returnEventDates} from '../utils/event-helpers';[m
[32m+[m[32mimport {splitAString} from '../utils/general.js';[m
 import {existingOffers} from '../mocks/event.js';[m
[31m-import {returnEventOffersOnEdit} from './event-offers.js';[m
 import flatpickr from "flatpickr";[m
 import "flatpickr/dist/flatpickr.min.css";[m
 [m
[36m@@ -13,6 +12,7 @@[m [mconst returnEditEvent = (tripEvent) => {[m
   let {description, pictures, name} = tripEvent.destination;[m
   const eventIcon = splitAString(tripEvent.type.toLowerCase(), ` `);[m
   const isFavorite = tripEvent.isFavorite === false ? `` : `checked`;[m
[32m+[m[32m  const isChecked = tripEvent.type.isChecked === false ? `` : `checked`;[m
   const eventOffers = new EventOffers(tripEvent.offers).getEventTemplateOnEdit();[m
 [m
   return `<li class="trip-events__item">[m
[36m@@ -60,7 +60,7 @@[m [mconst returnEditEvent = (tripEvent) => {[m
             </div>[m
 [m
             <div class="event__type-item">[m
[31m-              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>[m
[32m+[m[32m              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">[m
               <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>[m
             </div>[m
           </fieldset>[m
[36m@@ -79,7 +79,7 @@[m [mconst returnEditEvent = (tripEvent) => {[m
             </div>[m
 [m
             <div class="event__type-item">[m
[31m-              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">[m
[32m+[m[32m              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" >[m
               <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>[m
             </div>[m
           </fieldset>[m
[36m@@ -162,6 +162,7 @@[m [mexport default class EditTripEvent extends AllMightySmarty {[m
     this._changeType();[m
     this._changeDestination();[m
     this._applyFlatpickr();[m
[32m+[m[32m    this._setCheckedOnType();[m
   }[m
 [m
   getTemplate() {[m
[36m@@ -184,6 +185,10 @@[m [mexport default class EditTripEvent extends AllMightySmarty {[m
     this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);[m
   }[m
 [m
[32m+[m[32m  _setCheckedOnType() {[m
[32m+[m[32m    this.getElement().querySelector(`input[value=${splitAString(this._tripEvent.type.toLowerCase(), ` `)[0].toLowerCase()}]`).setAttribute(`checked`, ``);[m
[32m+[m[32m  }[m
[32m+[m
   _changeType() {[m
     const allEventsLabels = this.getElement().querySelectorAll(`.event__type-label`);[m
     allEventsLabels.forEach((label) => label.addEventListener(`click`, () => {[m
[36m@@ -192,6 +197,7 @@[m [mexport default class EditTripEvent extends AllMightySmarty {[m
       this._tripEvent.offers = existingOffers[currentOfferIndex];[m
       this.rerender();[m
       this.recoveryListeners();[m
[32m+[m[32m      this._setCheckedOnType();[m
     }));[m
   }[m
 [m
[36m@@ -211,14 +217,13 @@[m [mexport default class EditTripEvent extends AllMightySmarty {[m
       this._flatpickr = null;[m
     }[m
     const calendarInputs = this.getElement().querySelectorAll(`.event__input--time`);[m
[32m+[m[32m    /* eslint-disable */[m
     calendarInputs.forEach((input) => this._flatpickr = flatpickr(input, {[m
[31m-      /* eslint-disable */[m
       allowInput: true,[m
       enableTime: true,[m
       time_24hr: true,[m
       dateFormat: `d/m/Y H:i`[m
[31m-      /* eslint-enable */[m
     }));[m
[31m-    return calendarInputs;[m
[32m+[m[32m    /* eslint-enable */[m
   }[m
 }[m
[1mdiff --git a/src/components/event-offers.js b/src/components/event-offers.js[m
[1mindex f219a80..c819524 100644[m
[1m--- a/src/components/event-offers.js[m
[1m+++ b/src/components/event-offers.js[m
[36m@@ -11,7 +11,7 @@[m [mconst returnOfferMarkUp = (title, price) => {[m
 [m
 const returnOfferMarkUpOnEdit = (title, name, price) => {[m
   return (`<div class="event__offer-selector">[m
[31m-    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${name}">[m
[32m+[m[32m    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}">[m
     <label class="event__offer-label" for="event-offer-${name}-1">[m
       <span class="event__offer-title">${title}</span>[m
       &plus;[m
[1mdiff --git a/src/components/event.js b/src/components/event.js[m
[1mindex 7ba1d51..a677f89 100644[m
[1m--- a/src/components/event.js[m
[1m+++ b/src/components/event.js[m
[36m@@ -1,8 +1,7 @@[m
 import AllMighty from './allmighty.js';[m
 import EventOffers from './event-offers.js';[m
[31m-import {splitAString} from '../utils/general.js';[m
 import {returnEventDates} from '../utils/event-helpers.js';[m
[31m-import {returnEventOffers} from './event-offers.js';[m
[32m+[m[32mimport {splitAString} from '../utils/general.js';[m
 [m
 const returnEvent = (tripEvent) => {[m
   let {startDateWithDash, endDateWithDash, startTime, endTime, duration} = returnEventDates(tripEvent.startDate, tripEvent.endDate);[m
[1mdiff --git a/src/controllers/event.js b/src/controllers/event.js[m
[1mindex 78d25a7..36d291e 100644[m
[1m--- a/src/controllers/event.js[m
[1m+++ b/src/controllers/event.js[m
[36m@@ -8,8 +8,8 @@[m [mexport default class TripEventController {[m
     this._container = container;[m
     this._onDataChange = onDataChange;[m
     this._onViewChange = onViewChange;[m
[31m-    this.tripEvent;[m
[31m-    this.editTripEvent;[m
[32m+[m[32m    this.tripEvent = null;[m
[32m+[m[32m    this.editTripEvent = null;[m
   }[m
 [m
   render(eventMock) {[m
[36m@@ -44,8 +44,8 @@[m [mexport default class TripEventController {[m
   }[m
 [m
   setDefaultView() {[m
[31m-    if (this.editTripEvent !== undefined && this.tripEvent !== undefined) {[m
[31m-      // toggleComponents(this.editTripEvent, this.tripEvent);[m
[32m+[m[32m    if (document.contains(this.editTripEvent.getElement())) {[m
[32m+[m[32m      toggleComponents(this.editTripEvent, this.tripEvent);[m
     }[m
   }[m
 }[m
[1mdiff --git a/src/controllers/trip.js b/src/controllers/trip.js[m
[1mindex 2895f92..6d631a4 100644[m
[1m--- a/src/controllers/trip.js[m
[1m+++ b/src/controllers/trip.js[m
[36m@@ -81,7 +81,7 @@[m [mexport default class TripController {[m
     });[m
   }[m
 [m
[31m-  _onDataChange(TripEventController, oldTripEventData, newTripEventData) {[m
[32m+[m[32m  _onDataChange(oldTripEventData, newTripEventData) {[m
     // find index of changed event[m
     const index = this._eventMocks.findIndex((eventMock) => eventMock === oldTripEventData);[m
 [m
[1mdiff --git a/src/utils/event-helpers.js b/src/utils/event-helpers.js[m
[1mindex 4d88aa0..566aef0 100644[m
[1m--- a/src/utils/event-helpers.js[m
[1m+++ b/src/utils/event-helpers.js[m
[36m@@ -11,9 +11,8 @@[m [mexport const returnEventDates = (dateFrom, dateTo) => {[m
   const endTime = endDate.format(`HH:mm`);[m
   const shortDate = startDate.format(`MMM DD`);[m
   const durationDiff = moment.duration(endDate.diff(startDate));[m
[31m-  let durationDays = durationDiff.days();[m
[31m-  durationDays === 0 ? durationDays = `` : durationDays + `D`;[m
[31m-  const duration = durationDays + ` ` + durationDiff.hours() + `H ` + durationDiff.minutes() + `M`;[m
[32m+[m[32m  let durationDays = durationDiff.days() === 0 ? `` : durationDays + `D`;[m
[32m+[m[32m  const duration = `${durationDays} ${durationDiff.hours()}H ${durationDiff.minutes()}M`;[m
 [m
   return {startDateWithDash, endDateWithDash, startDateWithSlash, endDateWithSlash, shortDate,[m
     startTime, endTime, durationDiff, duration};[m
[36m@@ -21,10 +20,8 @@[m [mexport const returnEventDates = (dateFrom, dateTo) => {[m
 [m
 export const addArticleToEventType = (eventType, allEventTypes) => {[m
   const LAST_INDEX_OF_TRANSPORT_EVENT = 6;[m
[31m-  if (allEventTypes.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {[m
[31m-    eventType = eventType + ` in`;[m
[31m-  } else {[m
[31m-    eventType = eventType + ` to`;[m
[31m-  }[m
[31m-  return eventType;[m
[32m+[m[32m  const article = allEventTypes.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT[m
[32m+[m[32m    ? `in`[m
[32m+[m[32m    : `to`;[m
[32m+[m[32m  return `${eventType} ${article}`;[m
 };[m
