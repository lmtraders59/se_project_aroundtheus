import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupElement.querySelector(".modal__form-button").textContent = "Deleting...";
    } else {
      this._popupElement.querySelector(".modal__form-button").textContent = "Yes";
    }
  }

  setEventListeners() {
    const formEl = this._popupElement.querySelector(".modal__form");
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }
}