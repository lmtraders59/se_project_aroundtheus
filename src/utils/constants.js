//popups and buttons
const profileEditPopupEl = document.querySelector("#profileEdit");
const editProfileButton = document.querySelector("#openModal");
const addCardButton = document.querySelector("#openModal2");
const profileNameInput = profileEditPopupEl.querySelector(
  ".modal__form-input-name"
);

//forms and inputs
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const profileOccupationInput = profileEditPopupEl.querySelector(
  ".modal__form-input-description"
);
const nameEl = document.querySelector(".profile__text");
const jobEl = document.querySelector(".profile__description");

/// cards array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//selectors
export const selectors = {
  // previewPopup: "#image-preview",
  addFormElement: "#add-form",
  profileEditPopupEl: "#profileEdit",
  profileFormElement: "#edit-form",
  // cardTemplate: "#cardTemplate",
  nameEl: ".profile__text",
  jobEl: ".profile__description",
  // deletePopup: "#delete-card",
};

//validation config
// export const validationConfig = {
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__form-button",
//   inactiveButtonClass: "modal__form-button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "modal__error_visible",
// };
