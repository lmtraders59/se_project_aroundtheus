// function showInputError(formEl, inputEl, options) {
//   const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
//   inputEl.classList.add(options.inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(options.errorClass);
// }

// function hideInputError(formEl, inputEl, options) {
//   const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
//   inputEl.classList.remove(options.inputErrorClass);
//   errorMessageEl.textContent = " ";
//   errorMessageEl.classList.remove(options.errorClass);
// }

// function toggleInputError(formEl, inputEl, options) {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, options);
//   } else {
//     hideInputError(formEl, inputEl, options);
//   }
// }

// const checkFormValidity = (inputs) =>
//   inputs.every((input) => input.validity.valid);

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  const isValid = checkFormValidity(inputEls);
  if (!isValid) {
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
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      toggleInputError(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    toggleButtonState(inputEls, submitButton, options);
  });
}

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__form-button",
//   inactiveButtonClass: "modal__form-button_disabled",
//   inputErrorClass: "modal__form-input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(config);
