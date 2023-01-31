// Import of Classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import {
  addFormElement,
  profileFormElement,
  profileNameInput,
  editProfileButton,
  addCardButton,
  nameEl,
  jobEl,
  profileOccupationInput,
} from "../utils/constants.js";
import Api from "../utils/Api.js";

const config = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

let cardList;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInitialCards(), api.getProfileData()])
  .then((values) => {
    // Card List
    cardList = new Section(
      {
        items: values[0],
        renderer: (cardData) => {
          const card = renderCard(cardData);
          cardList.addItem(card.getView());
        },
      },
      ".cards__container"
    );
    cardList.renderItems();

    userInfo.setUserInfo({
      name: values[1].name,
      description: values[1].about,
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

function renderCard(cardData) {
  return new Card(cardData, "#cardTemplate", {
    handleCardClick: (card) => {
      previewPopup.openModal(card);
    },
  });
}

const previewPopup = new PopupWithImage("#image-preview");
previewPopup.setEventListeners();

//Add card popup
const cardFormPopup = new PopupWithForm("#cardAdd", (data) => {
  const card = renderCard(data);
  cardList.addItem(card.getView());
  cardFormPopup.closeModal();
});
cardFormPopup.setEventListeners();

const profileEditPopup = new PopupWithForm("#profileEdit", (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.closeModal();
});
profileEditPopup.setEventListeners();

// Card Button States
addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  cardFormPopup.openModal();
});

editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.userName;
  profileOccupationInput.value = data.userJob;
  addProfileValidator.resetValidation();
  profileEditPopup.openModal();
});
