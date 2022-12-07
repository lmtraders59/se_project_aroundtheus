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

// Card Validator
const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();
addCardValidator.disableSubmitButton();

// Create Card
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

  //  // like button
  //  const cardLikeButton = cardElement.querySelector(".card__like-button");
  //  cardLikeButton.addEventListener("click", () => {
  //    cardLikeButton.classList.toggle("card__like-button_on");
  //  });
 
  //  // delete card button
  //  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  //  cardDeleteButton.addEventListener("click", () => {
  //    cardElement.remove();
  //  });
 
  //  cardImage.src = data.link;
  //  cardImage.alt = data.name;
  //  cardTitle.textContent = data.name;
  //  return cardElement;
 }
 
 // Card Button States
 addCardButton.addEventListener("click", () => openModalWindow(addCardPopup));
 addCloseButton.addEventListener("click", () => closeModalWindow());
 previewCloseButton.addEventListener("click", () => closeModalWindow());
 
 const profileName = document.querySelector(".profile__text");
 const profileJob = document.querySelector(".profile__description");
 
 function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileJob.textContent = jobInput.value;
   closeModalWindow();
 }

addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.title.value;
  const link = evt.target.link.value;
  const cardView = createCard({
    name,
    link,
  });
  renderCard(cardView, cardList);
  addFormElement.reset();
  const submitButton = addFormElement.querySelector(".modal__form-button");
  closeModalWindow();
});

const cardTemplate = document
  .querySelector("#cardTemplate")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__container");

initialCards.forEach(function (data) {
  const cardView = createCard(data);
  renderCard(cardView, cardList);
});

// // export default Card;
// function fillProfileForm() {
//   profileNameInput.value = profileTitle.textContent;
//   profileOccupationInput.value = profileDescription.textContent;
//   const submitButton = profileEditPopup.querySelector(".modal__form-button");
//   toggleButtonState([profileNameInput, profileOccupationInput], submitButton, {
//     inactiveButtonClass: "modal__form-button_disabled",
//   });
// }

// // Close Profile Button
// profileCloseButton.addEventListener("click", () => closeModalWindow());

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
