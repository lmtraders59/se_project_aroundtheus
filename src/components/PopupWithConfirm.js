import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }

  setEventListeners() {
    this._popupElement.querySelector(".modal__form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }
}
