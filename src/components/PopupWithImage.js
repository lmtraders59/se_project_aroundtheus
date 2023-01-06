import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._previewTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  openModal(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = `A picture of ${data.name}`;
    this._previewTitle.textContent = data.name;
    super.open();
  }
}