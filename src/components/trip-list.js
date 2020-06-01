import AllMighty from './all-mighty.js';

const returnTripList = () =>
  (`<ul class="trip-days">
  </ul>`
  );

export default class TripList extends AllMighty {
  getTemplate() {
    return returnTripList();
  }
}
