import TripInfo from './components/tripinfo.js';
import TripCost from './components/tripcost.js';
import Navigation from './components/navigation.js';
import Filters from './components/filters.js';
import Sorting from './components/sorting.js';
import TripList from './components/trip-days.js';
import TripDayDetails from './components/trip-day-details.js';
import EditTripEvent from './components/editevent.js';
import TripEvent from './components/event.js';
import NoTripEvents from './components/no-trip-events.js';
import {generateTripEvents} from './mocks/event.js';
import {Positions, NUMBER_OF_EVENTS} from './components/constants.js';
import {renderElement} from './components/utils.js';

const tripMain = document.querySelector(`.trip-main`);
const tripControlsMenuHeading = document.querySelector(`.trip-controls h2:first-of-type`);
const tripControlsFiltersHeading = document.querySelector(`.trip-controls h2:last-of-type`);

renderElement(Positions.AFTEREND, new Navigation().getElement(), tripControlsMenuHeading);
renderElement(Positions.AFTEREND, new Filters().getElement(), tripControlsFiltersHeading);

const tripEvents = document.querySelector(`.trip-events`);

const onEventButton = (oldChild, newChild) => {
  oldChild.replaceWith(newChild);
};

const checkIfNoEvents = (numberOfEvents) => {
  if (numberOfEvents === 0) {
    renderElement(Positions.BEFOREEND, new NoTripEvents().getElement(), tripEvents);
  } else {
    renderElement(Positions.BEFOREEND, new Sorting().getElement(), tripEvents);
    renderElement(Positions.BEFOREEND, new TripList().getElement(), tripEvents);
    renderElement(Positions.AFTERBEGIN, new TripInfo().getElement(), tripMain);
    const tripInfo = document.querySelector(`.trip-info`);
    renderElement(Positions.BEFOREEND, new TripCost().getElement(), tripInfo);
  }
};

checkIfNoEvents(NUMBER_OF_EVENTS);

let tripDaysList = document.querySelector(`.trip-days`);

const generateEvents = (numberOfEvents) => {
  const eventData = generateTripEvents(numberOfEvents);
  let listCounter = 1;
  const days = [];

  eventData.forEach((data, index) => {
    const tripEvent = new TripEvent().getElement(data);
    const editTripEvent = new EditTripEvent().getElement(data);
    const currentEventDay = eventData[index].startDates.startDay;
    let tripDay = document.querySelector(`.day-${listCounter - 1}`);

    if (tripDay !== null && days.some((day) => day.currentEventDay === currentEventDay)) {
      const tripDayList = tripDay.querySelector(`.trip-events__list`);
      renderElement(Positions.BEFOREEND, tripEvent, tripDayList);
    } else {
      tripDay = new TripDayDetails().getElement(eventData[index], listCounter);
      const tripDayList = tripDay.querySelector(`.trip-events__list`);
      renderElement(Positions.BEFOREEND, tripDay, tripDaysList);
      tripDay.classList.add(`day-${listCounter}`);
      days.push({listCounter, currentEventDay});
      renderElement(Positions.BEFOREEND, tripEvent, tripDayList);
      listCounter++;
    }

    const eventButton = tripEvent.querySelector(`.event__rollup-btn`);
    const eventSubmitForm = editTripEvent.querySelector(`form`);

    const onEscKey = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        onEventButton(editTripEvent, tripEvent);
        document.removeEventListener(`keydown`, onEscKey);
      }
    };

    eventButton.addEventListener(`click`, function () {
      onEventButton(tripEvent, editTripEvent);
      document.addEventListener(`keydown`, onEscKey);
    });
    eventSubmitForm.addEventListener(`submit`, function (evt) {
      evt.preventDefault();
      onEventButton(editTripEvent, tripEvent);
    });
  });
};

generateEvents(NUMBER_OF_EVENTS);
