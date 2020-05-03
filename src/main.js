import {returnTripInfo} from './components/tripinfo.js';
import {returnTripCost} from './components/tripcost.js';
import {returnNavigation} from './components/navigation.js';
import {returnFilters} from './components/filters.js';
import {returnSorting} from './components/sorting.js';
import {returnTripList} from './components/trip-days.js';
import {returnTripDetails} from './components/tripdetails.js';
import {returnEditEvent} from './components/editevent.js';
import {returnEvent} from './components/event.js';
import {generateTripEvents} from './mocks/event.js';
import {positions} from './components/constants';

const renderComponent = (position, component, place) => {
  place.insertAdjacentHTML(position, component);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);
renderComponent(positions.afterbegin, returnTripInfo(), tripMain);
const tripInfo = document.querySelector(`.trip-info`);
renderComponent(positions.beforeend, returnTripCost(), tripInfo);
renderComponent(positions.afterend, returnNavigation(), tripControlsMenuHeading);
renderComponent(positions.afterend, returnFilters(), tripControlsFiltersHeading);

const tripEvents = document.querySelector(`.trip-events`);
renderComponent(positions.beforeend, returnSorting(), tripEvents);
renderComponent(positions.beforeend, returnTripList(), tripEvents);

const NUMBER_OF_EVENTS = 15;
const tripDaysList = document.querySelector(`.trip-days`);

const generateEvents = (numberOfEvents) => {
  const eventData = generateTripEvents(numberOfEvents);
  renderComponent(positions.beforeend, returnEditEvent(eventData[0]), tripDaysList);
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
      renderComponent(positions.beforeend, returnEvent(eventData[i]), tripDays);
    } else {
      days.push({listCounter, currentEventDay});
      renderComponent(positions.beforeend, returnTripDetails(eventData[i], listCounter), tripDaysList);
      let tripDays = Array.from(document.querySelectorAll(`.trip-days__item`)).find((tripDay) => tripDay.querySelector(`.day__counter`).textContent === listCounter.toString());
      if (tripDays === undefined) {
        tripDays = document.querySelector(`.trip-days__item`).querySelector(`.trip-events__list`);
      } else {
        tripDays = tripDays.querySelector(`.trip-events__list`);
      }
      renderComponent(positions.beforeend, returnEvent(eventData[i]), tripDays);
      listCounter++;
    }
  }
};

generateEvents(NUMBER_OF_EVENTS);
