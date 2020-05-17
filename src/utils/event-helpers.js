import moment from "moment";

export const returnEventDates = (dateFrom, dateTo) => {
  const startDate = moment(dateFrom);
  const endDate = moment(dateTo);
  const startDateWithDash = startDate.format(`YYYY-MM-DD`);
  const endDateWithDash = endDate.format(`YYYY-MM-DD`);
  const startDateWithSlash = startDate.format(`YYYY/MM/DD`);
  const endDateWithSlash = endDate.format(`YYYY/MM/DD`);
  const startTime = startDate.format(`HH:mm`);
  const endTime = endDate.format(`HH:mm`);
  const shortDate = startDate.format(`MMM DD`);
  const durationDiff = moment.duration(endDate.diff(startDate));
  let durationDays = durationDiff.days();
  durationDays === 0 ? durationDays = `` : durationDays + `D`;
  const duration = durationDays + ` ` + durationDiff.hours() + `H ` + durationDiff.minutes() + `M`;

  return {startDateWithDash, endDateWithDash, startDateWithSlash, endDateWithSlash, shortDate,
    startTime, endTime, durationDiff, duration};
};

export const addArticleToEventType = (eventType, allEventTypes) => {
  const LAST_INDEX_OF_TRANSPORT_EVENT = 6;
  if (allEventTypes.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {
    eventType = eventType + ` in`;
  } else {
    eventType = eventType + ` to`;
  }
  return eventType;
};
