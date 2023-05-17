import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  // renderLoading(isLoading) {
  //   if (isLoading) {
  //     this._saveButton.textContent = "Saving...";
  //   } else {
  //     this._saveButton.textContent = "Save";
  //   }
  // }

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