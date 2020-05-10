import Navigation from './components/navigation.js';
import Filters from './components/filters.js';
import NoTripEvents from './components/no-trip-events.js';
import TripController from './controllers/trip.js';
import {renderComponent} from './utils/render.js';
import {generateTripEventMocks} from './mocks/event.js';
import {Positions, NUMBER_OF_EVENTS} from './utils/constants.js';

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);

renderComponent(Positions.AFTEREND, new Navigation(), tripControlsMenuHeading);
renderComponent(Positions.AFTEREND, new Filters(), tripControlsFiltersHeading);

const tripList = document.querySelector(`.trip-events`);

const checkIfNoEvents = (numberOfEvents) => numberOfEvents === 0 ? true : false;

const renderATrip = (numberOfEvents) => {
  if (checkIfNoEvents(numberOfEvents)) {
    renderComponent(Positions.BEFOREEND, new NoTripEvents(), tripList);
  } else {
    const tripEvents = generateTripEventMocks(numberOfEvents);
    new TripController().render(tripEvents);
  }
};

renderATrip(NUMBER_OF_EVENTS);
