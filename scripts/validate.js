function setEventlisteners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("onkeypress", (event) => {
      if (!inputEl.validity.valid) {
        const error = document.querySelector("#" + inputEl.id + "-error");
        // add class if error
      }
      // when user press on a keyboard, after every key this function is called
      // functionCheckIsFieldValid(event.target)
    });
    console.dir(inputEl);
  });
}
function functionCheckIsFieldValid(event, target) {}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach(
    (formEl) =>
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      })
    //setEventlisteners(formEl, options);
  );
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
console.dir(config);
