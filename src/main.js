import {returnTripInfo} from './components/tripinfo.js';
import {returnTripCost} from './components/tripcost.js';
import {returnNavigation} from './components/navigation.js';
import {returnFilters} from './components/filters.js';
import {returnSorting} from './components/sorting.js';
import {returnTripDetails} from './components/tripdetails.js';
import {returnEditEvent} from './components/editevent.js';
import {returnEvent} from './components/event.js';
import {generateTripEvents} from './mocks/event.js';

const positions = {
  afterbegin: `afterbegin`,
  afterend: `afterend`,
  beforeend: `beforeend`
};

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
renderComponent(positions.beforeend, returnTripDetails(), tripEvents);

const NUMBER_OF_EVENTS = 3;
const generateEvents = (numberOfEvents) => {
  const eventData = generateTripEvents(numberOfEvents);
  const events = [];
  const tripEventsList = document.querySelector(`.trip-events__list`);
  renderComponent(positions.beforeend, returnEditEvent(eventData[0]), tripEventsList);
  for (let i = 1; i < numberOfEvents; i++) {
    events.push(returnEvent(eventData[i]));
  }
  renderComponent(`beforeend`, events.join(``), tripEventsList);
};

generateEvents(NUMBER_OF_EVENTS);
