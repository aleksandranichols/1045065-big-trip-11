import API from './api.js';
import Navigation from './components/navigation.js';
import NoTripEvents from './components/no-trip-events.js';
import Statistics from './components/statistics.js';
import TripEvents from './models/events.js';
import FiltersController from './controllers/filters.js';
import TripController from './controllers/trip.js';
import {renderComponent} from './utils/render.js';
import {Position, Page, AUTHORIZATION_TOKEN} from './utils/constants.js';

const api = new API(AUTHORIZATION_TOKEN);

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);
const bodyContainer = document.querySelector(`.page-main .page-body__container`);
const tripList = document.querySelector(`.trip-events`);
const body = document.querySelector(`.page-body`);
const navigation = new Navigation();
const statistics = new Statistics();
renderComponent(Position.AFTEREND, navigation, tripControlsMenuHeading);

api.getEvents()
.then((events) => {
  renderComponent(Position.AFTERBEGIN, statistics, bodyContainer);
  const tripEventsModel = new TripEvents(events);
  const tripController = new TripController(body, tripEventsModel, api);
  new FiltersController(tripControlsFiltersHeading, tripEventsModel).render();
  tripController.render();

  const displayContentByPage = (page) => {
    switch (page) {
      case Page.TABLE:
        tripController.display();
        statistics.hide();
        break;
      case Page.STATS:
        statistics.updateStatisticsData(tripEventsModel.getData());
        tripController.hide();
        statistics.display();
        break;
      default:
        throw new Error(`Switch case doesn't exist at displayContentByPage`);
    }
  };

  navigation.onPageChange(displayContentByPage);
  statistics.getCharts(tripEventsModel.getData());
});
// .catch(() => {
//   renderComponent(Position.BEFOREEND, new NoTripEvents(), tripList);
// })
