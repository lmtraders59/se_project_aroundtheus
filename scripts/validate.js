console.log("Form validate.js this works superstar :)");

function setEventlisteners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll("inputSelector")];
      inputEls.forEach = ((inputEl) => {
          inputEl.addEventListener("e", () => { 
      });
  });
}
console.log(inputEls);

function enableValidation(options) {
  const formEls = [...document.querySelectorAll("options.formSelector")];
  formEls.forEach((formEl) => 
    formEl.addEventListener(submit, (e) => { 
      e.preventDefault()   
    })

// look for all inputs inside of the form
  setEventlisteners (formEl, options) ({
// loop thru all inputs to see if they are valid
  // if all inputs are not valid
    // get validation message
    // add error class to input
    // display error message
    // disable submit button
  // if all inputs are valid  
    // enable submit button
    // reset error messages
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
