import AllMighty from './allmighty.js';

export default class AllMightySmarty extends AllMighty {
  constructor() {
    super();
    if (new.target === AllMightySmarty) {
      throw new Error(`Creating a new instance of AllMightySmarty is forbidden`);
    }
  }

  recoveryListeners() {
    throw new Error(`Method recoveryListeners is required`);
  }

  rerender() {
    const oldElement = this._element;
    const elementParent = oldElement.parentElement;
    this._element = this.removeElement();
    const newElement = this.getElement();
    elementParent.replaceChild(newElement, oldElement);
  }
}
