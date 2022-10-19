function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  console.log(inputEls);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("keydown", (event) => {
      console.log(event.target.validity.valid);
      console.log(inputEl.validationMessage);
      console.log(inputEl.value);
      // if (!inputEl.validity.valid) {
      //   const error = document.querySelector("#" + inputEl.id + "-error");
      //   return modal__error;
      //   // add class if error
      // }
    });
  });
}

// looking for each form
// -- inside of this form...search for all inputs

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
