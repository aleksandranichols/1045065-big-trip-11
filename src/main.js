import API from './api.js';
import Navigation from './components/navigation.js';
import NewEventButton from './components/new-event-button.js';
import NoTripEvents from './components/no-trip-events.js';
import Statistics from './components/statistics.js';
import TripEventsModel from './models/trip-events-model.js';
import TripEventModel from './models/trip-event-model.js';
import TripController from './controllers/trip-controller.js';
import {renderComponent, removeComponent} from './utils/render.js';
import {Position, Page, AUTHORIZATION_TOKEN, NO_EVENTS_MESSAGE} from './utils/constants.js';

const api = new API(AUTHORIZATION_TOKEN);

const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const bodyContainer = document.querySelector(`.page-main .page-body__container`);
const tripList = document.querySelector(`.trip-events`);
const body = document.querySelector(`.page-body`);
const main = document.querySelector(`.trip-main`);
const navigation = new Navigation();
const statistics = new Statistics();
renderComponent(Position.AFTEREND, navigation, tripControlsMenuHeading);

const noEvents = new NoTripEvents();
renderComponent(Position.BEFOREEND, noEvents, tripList);
api.getEvents()
.then((events) => {
  if (events.length === 0 || events === undefined) {
    noEvents.updateData(NO_EVENTS_MESSAGE);
    const newEventButton = new NewEventButton();
    renderComponent(Position.BEFOREEND, newEventButton, main);
    const tripEventsModel = new TripEventsModel(events);
    const tripEventModel = TripEventModel.returnNewEvent();
    new TripController(body, tripEventsModel, api).createNewEvent(newEventButton, tripEventModel);
  } else {
    removeComponent(noEvents);
    const newEventButton = new NewEventButton();
    renderComponent(Position.BEFOREEND, newEventButton, main);
    renderComponent(Position.AFTERBEGIN, statistics, bodyContainer);
    const tripEventsModel = new TripEventsModel(events);
    const tripController = new TripController(body, tripEventsModel, api);
    const tripEventModel = TripEventModel.returnNewEvent();
    tripController.createNewEvent(newEventButton, tripEventModel);
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
.catch((error) => error.message);
