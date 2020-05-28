import API from './api.js';
import Navigation from './components/navigation.js';
import NewEventButton from './components/new-event.js';
import NoTripEvents from './components/no-trip-events.js';
import Statistics from './components/statistics.js';
import TripEvents from './models/events.js';
import TripEventModel from './models/event.js';
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
const main = document.querySelector(`.trip-main`);
const navigation = new Navigation();
const statistics = new Statistics();
renderComponent(Position.AFTEREND, navigation, tripControlsMenuHeading);

export const returnNewEvent = () => {
  return {
    "base_price": 0,
    "date_from": new Date(),
    "date_to": new Date(),
    "id": Math.floor(Math.random() * 10001),
    "is_favorite": false,
    "type": `transport`,
    "offers": {"price": `0`, "title": ``},
    "destination": {"desciption": ``, "name": ``, "pictures": []}
  };
};

api.getEvents()
.then((events) => {
  if (events.length === 0) {
    const newEventButton = new NewEventButton();
    renderComponent(Position.BEFOREEND, newEventButton, main);
    renderComponent(Position.BEFOREEND, new NoTripEvents(), tripList);
    const tripEventsModel = new TripEvents(events);
    const tripEventModel = new TripEventModel(returnNewEvent());
    new TripController(body, tripEventsModel, api).createNewEvent(newEventButton, tripEventModel);
  } else {
    const newEventButton = new NewEventButton();
    renderComponent(Position.BEFOREEND, newEventButton, main);
    renderComponent(Position.AFTERBEGIN, statistics, bodyContainer);
    const tripEventsModel = new TripEvents(events);
    const tripController = new TripController(body, tripEventsModel, api);
    const tripEventModel = new TripEventModel(returnNewEvent());
    tripController.createNewEvent(newEventButton, tripEventModel);
    new FiltersController(tripControlsFiltersHeading, tripEventsModel).render();
    tripController.render();

    const displayContentByPage = (page) => {
      switch (page) {
        case Page.TABLE:
          tripController.display();
          statistics.hide();
          break;
        case Page.STATS:
          tripController.hide();
          statistics.display();
          statistics.updateStatisticsData(tripEventsModel.getData());
          break;
        default:
          throw new Error(`Switch case doesn't exist at displayContentByPage`);
      }

    };
    navigation.onPageChange(displayContentByPage);
    statistics.getCharts(tripEventsModel.getData());
  }
})
.catch((error) => error.message)
