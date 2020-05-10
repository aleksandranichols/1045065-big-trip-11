import AllMighty from './allmighty.js';

const returnTripList = () =>
  (`<ul class="trip-days">
  </ul>`
  );

export default class TripList extends AllMighty {
  getTemplate() {
    return returnTripList();
  }
}
