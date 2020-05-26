import moment from "moment";

export const returnEventDates = (dateFrom, dateTo) => {
  const startDate = moment(dateFrom);
  const endDate = moment(dateTo);
  const startDateWithDash = startDate.format(`YYYY-MM-DD`);
  const endDateWithDash = endDate.format(`YYYY-MM-DD`);
  const startDateWithSlash = startDate.format(`DD/MM/YY`);
  const endDateWithSlash = endDate.format(`DD/MM/YY`);
  const startTime = startDate.format(`HH:mm`);
  const endTime = endDate.format(`HH:mm`);
  const shortDate = startDate.format(`MMM DD`);
  const durationDiff = moment.duration(endDate.diff(startDate));
  let durationDays = durationDiff.days() === 0 ? `` : durationDays + `D`;
  const duration = `${durationDays} ${durationDiff.hours()}H ${durationDiff.minutes()}M`;

  return {startDate, endDate, startDateWithDash, endDateWithDash, startDateWithSlash, endDateWithSlash, shortDate,
    startTime, endTime, durationDiff, duration};
};

export const addArticleToEventType = (eventType, transportTypes) => {
  const article = transportTypes.some((type) => type === eventType) === true ? `to` : `in`;
  return `${eventType} ${article}`;
};

export const calculatePriceByEventType = (tripEvents, type) => {
  const totalPrice = tripEvents.filter((tripEvent) => tripEvent.type === type).
  map((tripEvent) => tripEvent.price).
  reduce((accumulator, tripEvent) => accumulator + tripEvent, 0);
  return totalPrice;
};

export const calculateEventTypeOccurrence = (tripEvents, type) => {
  const filteredTripEvents = tripEvents.filter((tripEvent) => tripEvent.type === type);
  return filteredTripEvents.length;
};

export const calculateEventTimeSpend = (tripEvents, type) => {
  let totalTimeSpend = 0;
  tripEvents.filter((tripEvent) => tripEvent.type === type).
  forEach((tripEvent) => {
    let {durationDiff} = returnEventDates(tripEvent.startDate, tripEvent.endDate);
    totalTimeSpend += durationDiff.hours();
  });
  return totalTimeSpend;
};
