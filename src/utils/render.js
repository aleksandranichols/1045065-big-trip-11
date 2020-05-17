import {Position} from './constants.js';

export const toggleComponents = (oldComponent, newComponent) => {
  oldComponent.getElement().replaceWith(newComponent.getElement());
};

export const createDOMElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstChild;
};

export const renderComponent = (place, component, container) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Position.AFTEREND:
      container.parentNode.insertBefore(component.getElement(), container.nextSibling);
      break;
    case Position.BEFOREEND:
      container.append(component.getElement());
      break;
    default:
      throw new Error(`Switch case doesn't exist at renderComponent`);
  }
};
