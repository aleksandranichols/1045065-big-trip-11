import Navigation from './components/navigation.js';
import NoTripEvents from './components/no-trip-events.js';
import Statistics from './components/statistics.js';
import TripEvents from './models/events.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import {renderComponent} from './utils/render.js';
import {generateTripEventMocks} from './mocks/event.js';
import {Position, Page, NUMBER_OF_EVENTS} from './utils/constants.js';

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);
const bodyContainer = document.querySelector(`.page-main .page-body__container`);
const navigation = new Navigation();
renderComponent(Position.AFTEREND, navigation, tripControlsMenuHeading);

const tripList = document.querySelector(`.trip-events`);
const body = document.querySelector(`.page-body`);

const tripEvents = generateTripEventMocks(NUMBER_OF_EVENTS);
const tripEventsComponent = new TripEvents(tripEvents);
const tripController = new TripController(body, tripEventsComponent);
const statistics = new Statistics();

const renderATrip = (numberOfEvents) => {
  new FiltersController(tripControlsFiltersHeading, tripEventsComponent).render();
  if (numberOfEvents === 0) {
    renderComponent(Position.BEFOREEND, new NoTripEvents(), tripList);
  } else {
    renderComponent(Position.AFTERBEGIN, statistics, bodyContainer);
    tripController.render();
    navigation.onPageChange(displayContentByPage);
    statistics.getCharts(tripEventsComponent.getData());
  }
};

const displayContentByPage = (page) => {
  switch (page) {
    case Page.TABLE:
      tripController.display();
      statistics.hide();
      break;
    case Page.STATS:
      statistics.updateStatisticsData(tripEventsComponent.getData());
      tripController.hide();
      statistics.display();
      break;
    default:
      throw new Error(`Switch case doesn't exist at displayContentByPage`);
  }
};

renderATrip(NUMBER_OF_EVENTS);
