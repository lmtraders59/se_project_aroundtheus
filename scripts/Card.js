// class Card {
//   constructor(data, cardselector) {
//     this.data = data.link;
//     this.data = data.name;
//     this._cardselector = cardselector;
//   }

//   _setEventListeners() {
//     cardLikeButton.classList.toggle("card__like-button_on");
//     cardElement.remove();
//     const cardImage = cardElement.querySelector(".card__image");
//   }

// like button
//   _handleLikeIcon() {}
const cardLikeButton = cardElement.querySelector(".card__like-button");
cardLikeButton.addEventListener("click", () => {
  cardLikeButton.classList.toggle("card__like-button_on");
});

//   _handleDeleteCard() {}
// delete card button
const cardDeleteButton = cardElement.querySelector(".card__delete-button");
cardDeleteButton.addEventListener("click", () => {
  cardElement.remove();
});

//   _handlePreviewPicture() {}
cardImage.addEventListener("click", (event) => {
  openModalWindow(previewModal);

  previewImageElement.src = event.target.src;
  previewImageElement.alt = event.target.alt;
  previewImageTitle.textContent = data.name;
});

//   _getTemplate() {
//     return document
//       .querySelector(this.cardselector)
//       .content.querySelector(".card")
//       .clonemode(true);
//   }
//   _getView() {
//     this._element = this._getTemplate();
//     this._setEventListeners();
//   }
// }

// export default Card;
function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileOccupationInput.value = profileDescription.textContent;
  const submitButton = profileEditPopup.querySelector(".modal__form-button");
  toggleButtonState([profileNameInput, profileOccupationInput], submitButton, {
    inactiveButtonClass: "modal__form-button_disabled",
  });
}

// Close Profile Button
profileCloseButton.addEventListener("click", () => closeModalWindow());

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");

  cardImage.addEventListener("click", (event) => {
    openModalWindow(previewModal);

    previewImageElement.src = event.target.src;
    previewImageElement.alt = event.target.alt;
    previewImageTitle.textContent = data.name;
  });

  // like button
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_on");
  });

  // delete card button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

export default Card;
