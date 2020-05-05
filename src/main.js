import TripInfo from './components/tripinfo.js';
import TripCost from './components/tripcost.js';
import Navigation from './components/navigation.js';
import Filters from './components/filters.js';
import Sorting from './components/sorting.js';
import TripList from './components/trip-days.js';
import TripDetails from './components/tripdetails.js';
import EditTripEvent from './components/editevent.js';
import TripEvent from './components/event.js';
import {generateTripEvents} from './mocks/event.js';
import {Positions, NUMBER_OF_EVENTS} from './components/constants.js';
import {renderElement} from './components/utils.js';

const tripMain = document.querySelector(`.trip-main`);
const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);


renderElement(Positions.AFTERBEGIN, new TripInfo().getElement(), tripMain);
const tripInfo = document.querySelector(`.trip-info`);
renderElement(Positions.BEFOREEND, new TripCost().getElement(), tripInfo);
renderElement(Positions.AFTEREND, new Navigation().getElement(), tripControlsMenuHeading);
renderElement(Positions.AFTEREND, new Filters().getElement(), tripControlsFiltersHeading);

const tripEvents = document.querySelector(`.trip-events`);
renderElement(Positions.BEFOREEND, new Sorting().getElement(), tripEvents);
renderElement(Positions.BEFOREEND, new TripList().getElement(), tripEvents);

const tripDaysList = document.querySelector(`.trip-days`);

const onEventButton = (parent, newChild) => {
  parent.replaceWith(newChild);
};

const generateEvents = (numberOfEvents) => {
  const eventData = generateTripEvents(numberOfEvents);
  let listCounter = 1;
  const days = [];
  for (let i = 0; i < eventData.length; i++) {
    const tripEvent = new TripEvent().getElement(eventData[i]);
    const editTripEvent = new EditTripEvent().getElement(eventData[i]);

    let counter = i - 1;
    if (counter < 0) {
      counter++;
    }
    const currentEventDay = eventData[i].startDates.startDay;

    if (days.some((day) => day.currentEventDay === currentEventDay)) {
      const tripDays = Array.from(document.querySelectorAll(`.trip-days__item`)).find((tripDay) => tripDay.querySelector(`.day__counter`).textContent === (listCounter - 1).toString()).querySelector(`.trip-events__list`);
      renderElement(Positions.BEFOREEND, tripEvent, tripDays);
    } else {
      days.push({listCounter, currentEventDay});
      renderElement(Positions.BEFOREEND, new TripDetails().getElement(eventData[i], listCounter), tripDaysList);
      let tripDays = Array.from(document.querySelectorAll(`.trip-days__item`)).find((tripDay) => tripDay.querySelector(`.day__counter`).textContent === listCounter.toString());
      if (tripDays === undefined) {
        tripDays = document.querySelector(`.trip-days__item`).querySelector(`.trip-events__list`);
      } else {
        tripDays = tripDays.querySelector(`.trip-events__list`);
      }
      renderElement(Positions.BEFOREEND, tripEvent, tripDays);
      listCounter++;
    }

    const eventList = document.querySelector(`.trip-events__list`);
    const eventButton = tripEvent.querySelector(`.event__rollup-btn`);
    const eventSubmitForm = editTripEvent.querySelector(`form`);
    eventButton.addEventListener(`click`, function () {
      onEventButton(eventList, editTripEvent);
    });
    eventSubmitForm.addEventListener(`submit`, function () {
      onEventButton(eventList, tripEvent);
    });
  }
};

generateEvents(NUMBER_OF_EVENTS);
