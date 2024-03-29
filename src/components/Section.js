export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._items = items;
  }
  renderItems() {
    this._items.reverse().forEach((elem) => {
      this._renderer(elem);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
