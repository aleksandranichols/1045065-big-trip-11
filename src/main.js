import Navigation from './components/navigation.js';
import Filters from './components/filters.js';
import NoTripEvents from './components/no-trip-events.js';
import TripController from './controllers/trip.js';
import {renderComponent} from './utils/render.js';
import {generateTripEventMocks} from './mocks/event.js';
import {Position, NUMBER_OF_EVENTS} from './utils/constants.js';

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);

renderComponent(Position.AFTEREND, new Navigation(), tripControlsMenuHeading);
renderComponent(Position.AFTEREND, new Filters(), tripControlsFiltersHeading);

const tripList = document.querySelector(`.trip-events`);

const renderATrip = (numberOfEvents) => {
  if (numberOfEvents === 0) {
    renderComponent(Position.BEFOREEND, new NoTripEvents(), tripList);
  } else {
    const tripEvents = generateTripEventMocks(numberOfEvents);
    new TripController(tripEvents).render();
  }
};

renderATrip(NUMBER_OF_EVENTS);
