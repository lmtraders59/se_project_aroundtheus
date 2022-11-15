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

function toggleInputError(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
    // document
    //   .querySelector(config.submitButtonSelector)
    //   .classList.add("modal__form-button_disabled");
  } else {
    hideInputError(formEl, inputEl, options);
    // document
    //   .querySelector(config.submitButtonSelector)
    //   .classList.remove("modal__form-button_disabled");
  }
}

// function toggleButtonState() {
//   // switches button state
//   if (foundInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function checkFieldValidity() {
//   // this function checks the input is valid
//   let foundInvalid = false;
//   inputEls.forEach((inputEl) => {
//     if (!inputEl.validity.valid) {
//       foundInvalid = true;
//     }
//   });
// }

// function validationHellWrapper(elements) {
//   toggleButtonState(() => elements.forEach(element => {
//     checkFieldValidity(element)
//   }))
//   // ----->
// }

const checkFormValidity = (inputs) =>
  inputs.every((input) => input.validity.valid);
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let isValid = checkFormValidity(inputEls);
  // let foundInvalid = false;
  // inputEls.forEach((inputEl) => {
  //   if (!inputEl.validity.valid) {
  //     foundInvalid = true;
  //   }
  // });
  // ------------------------------------------
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
  const submitButton = formEl.querySelector(".modal__form-button");

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
    const submitButton = formEl.querySelector(".modal__form-button");
    toggleButtonState(inputEls, submitButton, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
