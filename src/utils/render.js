import {Position} from './constants.js';
import DOMPurify from 'dompurify';

const toggleComponents = (oldComponent, newComponent) => {
  oldComponent.getElement().replaceWith(newComponent.getElement());
};

const createDOMElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = DOMPurify.sanitize(template);
  return div.firstChild;
};

const renderComponent = (place, component, container) => {
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

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};


export {toggleComponents, createDOMElement, renderComponent, removeComponent};
