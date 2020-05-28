import {createDOMElement} from '../utils/render.js';

export default class AllMighty {
  constructor() {
    if (new.target === AllMighty) {
      throw new Error(`Creating a new instance of AllMighty is forbidden`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Method getTemplate is required`);
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  display() {
    this._element.classList.add(`displayed`);
    this._element.classList.remove(`hidden`);
  }

  hide() {
    this._element.classList.add(`hidden`);
    this._element.classList.remove(`displayed`);
  }
}
