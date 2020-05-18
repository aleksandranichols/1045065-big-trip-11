export default class TripEvents {
  constructor(mocks) {
    this._tripEventData = mocks;
  }

  getData() {
    return this._tripEventData;
  }

  setData(newMocks) {
    return this._tripEventData = newMocks;
  }

  updateData(id, newTripEventData) {
    const index = this._tripEventData.findIndex((data) => data.id === id);
    const currentData = this._tripEventData[index];
    this._tripEventData = [].concat(this._tripEventData.slice(0, index), currentData, this._eventMocks.slice(index + 1));
  }
}
