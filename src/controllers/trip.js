import TripInfo from '../components/tripinfo.js';
import TripCost from '../components/tripcost.js';
import Sorting from '../components/sorting.js';
import TripList from '../components/trip-days.js';
import EditTripEvent from '../components/editevent.js';
import TripEvent from '../components/event.js';
import TripDayDetails from '../components/trip-day-details.js';
import {renderComponent} from '../utils/render.js';
import {Positions} from '../utils/constants.js';

const toggleComponents = (oldComponent, newComponent) => {
  oldComponent.getElement().replaceWith(newComponent.getElement());
};


export default class TripController {
  render(eventMocks) {
    const tripMain = document.querySelector(`.trip-main`);
    const tripEvents = document.querySelector(`.trip-events`);

    renderComponent(Positions.BEFOREEND, new Sorting(), tripEvents);
    renderComponent(Positions.BEFOREEND, new TripList(), tripEvents);
    renderComponent(Positions.AFTERBEGIN, new TripInfo(), tripMain);
    const tripInfo = document.querySelector(`.trip-info`);
    renderComponent(Positions.BEFOREEND, new TripCost(), tripInfo);

    let tripDaysList = document.querySelector(`.trip-days`);
    this._eventMocks = eventMocks;
    let listCounter = 1;
    const days = [];

    this._eventMocks.forEach((eventMock, index) => {
      const tripEvent = new TripEvent(eventMock);
      const editTripEvent = new EditTripEvent(eventMock);
      const currentEventDay = this._eventMocks[index].startDates.startDay;
      let tripDay = document.querySelector(`.day-${listCounter - 1}`);

      if (tripDay !== null && days.some((day) => day.currentEventDay === currentEventDay)) {
        const tripDayList = tripDay.querySelector(`.trip-events__list`);
        renderComponent(Positions.BEFOREEND, tripEvent, tripDayList);
      } else {
        tripDay = new TripDayDetails(this._eventMocks[index], listCounter);
        const tripDayList = tripDay.getElement().querySelector(`.trip-events__list`);
        renderComponent(Positions.BEFOREEND, tripDay, tripDaysList);
        tripDay.getElement().classList.add(`day-${listCounter}`);
        days.push({listCounter, currentEventDay});
        renderComponent(Positions.BEFOREEND, tripEvent, tripDayList);
        listCounter++;
      }

      const onEscKey = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          toggleComponents(editTripEvent, tripEvent);
          document.removeEventListener(`keydown`, onEscKey);
        }
      };

      tripEvent.setclickHandler(() => {
        toggleComponents(tripEvent, editTripEvent);
        document.addEventListener(`keydown`, onEscKey);
      });

      editTripEvent.setEventHandler((evt) => {
        evt.preventDefault();
        toggleComponents(editTripEvent, tripEvent);
      });
    });
  }
}
