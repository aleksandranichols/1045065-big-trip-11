export const addArticleToEventType = (eventType, allEventTypes) => {
  const LAST_INDEX_OF_TRANSPORT_EVENT = 6;
  if (allEventTypes.indexOf(eventType) > LAST_INDEX_OF_TRANSPORT_EVENT) {
    eventType = eventType + ` in`;
  } else {
    eventType = eventType + ` to`;
  }
  return eventType;
};
