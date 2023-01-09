// Import of Classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import {
  openModalWindow,
  closeModalWindow,
} from "../components/utils/utils.js";

// cards array
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
//popups and buttons
const profileEditPopup = document.querySelector("#profileEdit");
const editProfileButton = document.querySelector("#openModal");
const profileCloseButton = document.querySelector("#profileExitBtn");
const addCardButton = document.querySelector("#openModal2");
const addCloseButton = document.querySelector("#addExitBtn");
const previewCloseButton = document.querySelector("#image-preview_close");
const profileNameInput = profileEditPopup.querySelector(
  ".modal__form-input-name"
);

const profileOccupationInput = profileEditPopup.querySelector(
  ".modal__form-input-description"
);

// Profile Value
const profileTitle = document.querySelector(".profile__text");
const profileDescription = document.querySelector(".profile__description");

//forms
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const nameEl = document.querySelector(".profile__text");
const jobEl = document.querySelector(".profile__description");

const config = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

// Card Validator
const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();

// Profile Validator
const addProfileValidator = new FormValidator(config, profileFormElement);
addProfileValidator.enableValidation();

// User Info for Profile
const userInfo = new UserInfo({
  nameElement: nameEl,
  jobElement: jobEl,
});

// Card List
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = renderCard(cardData);
      cardList.addItem(card.getView());
    },
  },
  ".cards__container"
);

cardList.renderItems();

function renderCard(cardData) {
  return new Card(cardData, "#cardTemplate", {
    handleCardClick: (card) => {
      previewPopup.openModal(card);
    },
  });
}

const previewPopup = new PopupWithImage("#image-preview");
previewPopup.setEventListeners();
previewPopup.closeModal();

//Add card popup
const cardFormPopup = new PopupWithForm("#cardAdd", (data) => {
  const card = renderCard(data);
  cardList.addItem(card.getView());
  addCardValidator.resetValidation();
  cardFormPopup.closeModal();
});
cardFormPopup.setEventListeners();

// Card Button States
addCardButton.addEventListener("click", () => {
  addFormElement.reset();
  addCardValidator.resetValidation();
  cardFormPopup.openModal();
});

//event listeners
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  addProfileValidator.resetValidation();
  openModalWindow(profileEditPopup);
});

// Profile Button
function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileOccupationInput.value = profileDescription.textContent;
}

// Close Profile Button
profileCloseButton.addEventListener("click", () => closeModalWindow());

addCloseButton.addEventListener("click", () => closeModalWindow());
previewCloseButton.addEventListener("click", () => closeModalWindow());

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: evt.target.name.value,
    description: evt.target.description.value,
  };
  userInfo.setUserInfo(data);
  closeModalWindow();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
