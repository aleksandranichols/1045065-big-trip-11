import {Positions} from './constants.js';

export const createDOMElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstChild;
};

export const renderComponent = (place, component, container) => {
  switch (place) {
    case Positions.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Positions.AFTEREND:
      container.parentNode.insertBefore(component.getElement(), container.nextSibling);
      break;
    case Positions.BEFOREEND:
      container.append(component.getElement());
      break;
    default:
      throw new Error(`Switch case doesn't exist at renderComponent`);
  }
};
