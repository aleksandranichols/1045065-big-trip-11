import {Positions} from './constants.js';

export const getRandomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const splitAString = (string, delimiter) => string.split(delimiter);

export const returnRandomArray = (array, min, max) => {
  const random = [];
  let newArrayLength = (getRandomIntegerInRange(min, max));
  while (newArrayLength > min) {
    let randomArrayElement = array[getRandomIntegerInRange(min, max - 1)];
    if (!random.includes(randomArrayElement)) {
      random.push(randomArrayElement);
      newArrayLength--;
    }
  }
  return random;
};

export const returnRandomElementInArray = (array) => array[getRandomIntegerInRange(0, array.length - 1)];

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstChild;
};

export const renderElement = (place, element, container) => {
  switch (place) {
    case Positions.AFTERBEGIN:
      container.prepend(element);
      break;
    case Positions.AFTEREND:
      container.parentNode.insertBefore(element, container.nextSibling);
      break;
    case Positions.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Switch case doesn't exist at renderElement`);
  }
};
