// Import of Classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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
  profileAddImage,
  avatarEl,
  avatarForm,
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
let userId;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
    "Content-Type": "application/json",
  },
});

/* --------------------------------------------------------------------------  */
/*                      Get initial Cards and Profile Data                     */
/* -------------------------------------------------------------------------- */
Promise.all([api.getInitialCards(), api.getProfileData()])
  .then(([ cardsList, userData ]) => {
    userId = userData._id;
    // Card List
    cardList = new Section(
      {
        items: cardsList,
        renderer: (cardData) => {
          const card = renderCard(cardData);
          cardList.addItem(card.getView());
        },
      },
      ".cards__container"
    );
    cardList.renderItems();

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar({
      avatar: userData.avatar,
    })
  })
  .catch((error) => {
    console.log(error);
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
  avatarEl: avatarEl,
});

const profileEditPopup = new PopupWithForm("#profileEdit", (data) => {
  profileEditPopup.renderLoading(true);
  api
    .updateProfileData(data.name, data.description)
    .then((newUserObject) => {
      userInfo.setUserInfo({
        name: newUserObject.name,
        description: newUserObject.about,
      });
      profileEditPopup.closeModal();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error");
    })
    .finally(() => profileEditPopup.renderLoading(false));
});
profileEditPopup.setEventListeners();

function renderCard(cardData) {
  const card = new Card(cardData, userId, "#cardTemplate", {
    handleCardClick: (card) => {
      previewPopup.openModal(card);
    },

    // Delete card
    handleDeleteClick: (cardId) => {
      deleteForm.openModal();
      deleteForm.setSubmitAction(() => {
        deleteForm.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.handleDelete();
            deleteForm.closeModal();
          })
          .catch((err) =>
            console.log(`An error occurred when deleting card: ${err}`)
          )
          .finally(() => deleteForm.renderLoading(false));
      });
    },

    // Likes
    handleLike: (card) => {
      if (card.cardLiked()) {
        api
          .removeLike(card.id)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) =>
            console.log(`An error occurred when removing a like: ${err}`)
          );
      } else {
        api
          .addLike(card.id)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) =>
            console.log(`An error occurred when adding a like: ${err}`)
          );
      }
    },
  });
  return card;
}

const previewPopup = new PopupWithImage("#image-preview");
previewPopup.setEventListeners();

const deleteForm = new PopupWithConfirm("#cardDelete");
deleteForm.setEventListeners();

//Add card popup
const cardFormPopup = new PopupWithForm("#cardAdd", (data) => {
  cardFormPopup.renderLoading(true);
  api
    .addNewCard(data)
    .then((newCard) => {
      const card = renderCard(newCard);
      cardList.addItem(card.getView());
      cardFormPopup.closeModal();
    })
    .catch((error) => {
      console.log(error);
      alert("There was an error");
    })
    .finally(() => cardFormPopup.renderLoading(false));
});
cardFormPopup.setEventListeners();

// Card Button States
addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  cardFormPopup.openModal();
});

// profile Button States
profileAddImage.addEventListener("click", () => {
  addProfileValidator.resetValidation();
  cardProfilePopup.openModal();
});

editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.userName;
  profileOccupationInput.value = data.userJob;
  addProfileValidator.resetValidation();
  profileEditPopup.openModal();
});

//Add profile popup
const cardProfilePopup = new PopupWithForm("#edit-avatar", (data) => {
  cardProfilePopup.renderLoading(true);
  api
  .setUserAvatar(data).then((res)=>{
    userInfo.setAvatar(res)
    cardProfilePopup.closeModal();
  })
  .catch((error) => {
    console.log(error);
    alert("There was an error");
  })
  .finally(() => cardProfilePopup.renderLoading(false));
});
cardProfilePopup.setEventListeners();
