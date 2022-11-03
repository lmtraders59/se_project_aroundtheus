function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEls, options) {
  return inputEls.every((inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, options);
      document
        .querySelector(".modal__form-button")
        .classList.add("modal__form-button_disabled");
    } else {
      hideInputError(formEl, inputEl, options);
      document
        .querySelector(".modal__form-button")
        .classList.remove("modal__form-button_disabled");
    }
    return inputEl.validity.valid;
  });
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__form-button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      const value = checkInputValidity(formEl, inputEls, options);

      if (value) {
        document.querySelector(".modal__form-button").disabled = false;
      } else {
        document.querySelector(".modal__form-button").disabled = true;
      }

      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function functionCheckIsFieldValid(event, target) {}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

// look for all inputs inside of the form
// setEventlisteners (formEl, options) ({
// loop thru all inputs to see if they are valid
// if all inputs are not valid
// get validation message
// add error class to input
// display error message
// disable submit button
// if all inputs are valid
// enable submit button
// reset error messages

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
