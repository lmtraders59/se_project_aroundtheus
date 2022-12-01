class FormValidator {

  enableValidation() {}
 
  constructor(settings, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
}

const editFormValidator = new FormValidator();




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

// const editFormValidator = new FormValidator();
// editFormValidator.enableValidation();
// const addFormValidator = new FormValidator();

export default FormValidator;
