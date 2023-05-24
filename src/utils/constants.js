//popups and buttons
export const profileEditPopupEl = document.querySelector("#profileEdit");
export const editProfileButton = document.querySelector("#openModal");
export const addCardButton = document.querySelector("#openModal2");
export const profileAddImage = document.querySelector(".profile__image-edit");
export const profileNameInput = profileEditPopupEl.querySelector(
  ".modal__form-input-name"
);

//forms and inputs
export const profileFormElement = document.querySelector("#edit-form");
export const addFormElement = document.querySelector("#add-form");
export const profileOccupationInput = profileEditPopupEl.querySelector(
  ".modal__form-input-description"
);
export const nameEl = document.querySelector(".profile__text");
export const jobEl = document.querySelector(".profile__description");

// cards array
export const initialCards = [
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
  addFormElement: "#add-form",
  profileEditPopupEl: "#profileEdit",
  profileFormElement: "#edit-form",
  profileNameInput: ".modal__form-input-name",
  editProfileButton: "#openModal",
  addCardButton: "#openModal2",
  nameEl: ".profile__text",
  jobEl: ".profile__description",
  profileOccupationInput: ".modal__form-input-description",
};
