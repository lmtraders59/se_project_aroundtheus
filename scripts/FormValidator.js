class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formEl = formEl;
  }

  FormValidator

  _showInputError(inputEl, options) {
    const errorMessageEl = this._formEl.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.add(this.options._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this.options._errorClass);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    const isValid = checkFormValidity(inputEls);
    if (!isValid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _checkFormValidity() {
    const checkFormValidity = (inputs) =>
      inputs.every((input) => input.validity.valid);
  }

  _toggleInputError() {}

  _setEventListeners() {
    this._inputEls = [...formEl.querySelectorAll(inputSelector)];
    this._submitButton = formEl.querySelector(options.submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (event) => {
        toggleInputError(formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  }
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

export default FormValidator;
