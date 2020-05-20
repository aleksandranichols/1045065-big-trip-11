import Filters from './components/filters.js';
import Navigation from './components/navigation.js';
import NoTripEvents from './components/no-trip-events.js';
import TripEvents from './models/events.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import {renderComponent} from './utils/render.js';
import {generateTripEventMocks} from './mocks/event.js';
import {Position, NUMBER_OF_EVENTS} from './utils/constants.js';

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);

renderComponent(Position.AFTEREND, new Navigation(), tripControlsMenuHeading);

const tripList = document.querySelector(`.trip-events`);
const body = document.querySelector(`.page-body`);

const renderATrip = (numberOfEvents) => {
  const tripEvents = generateTripEventMocks(numberOfEvents);
  if (numberOfEvents === 0) {
    renderComponent(Position.BEFOREEND, new NoTripEvents(), tripList);
  } else {
    new TripController(body, new TripEvents(tripEvents)).render();
  }
  new FiltersController(tripControlsFiltersHeading, new TripEvents(tripEvents)).render(new Filters);
};

renderATrip(NUMBER_OF_EVENTS);
