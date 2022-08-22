// cards array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.png",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.png",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.png",
  },
];

// const imagePreview = document.getElementById("image-preview");
// const imagePreviewPicture = imagePreview.querySelector(".modal__preview-image");

// const cardImages = document.querySelectorAll(".card .card__image");

// cardImages.forEach((item, i) => {
//   item.addEventListener("click", () => {
//     imagePreview.classList.add("modal_opened");
//     imagePreviewPicture.src = item.src;
//   });
// });
// -----------------------------------

//popups and buttons
const profileEditPopup = document.querySelector("#profileEdit");
// const addCardPopup = document.querySelector("#cardAdd");
// const previewModal = document.querySelector("#image-preview");
const editProfileButton = document.querySelector("#openModal");
// const addCardButton = document.querySelector("#openModal2");
const profileCloseBtn = document.querySelector("#profileExitBtn");
// const addCloseBtn = document.querySelector("#addExitBtn");
// const previewClose = document.querySelector("#image-preview_close");

//functions
function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_opened");
}
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("modal_opened");
}

function renderCard(cardElement, container) {
  cardList.prepend(cardElement);
}

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // const cardLikeButton = cardElement.querySelector(".card__edit-button");
  // cardLikeButton.addEventListener("click", () => {
  //   cardLikeButton.classList.toggle("card__like-button_on");
  // });

  // const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  // cardDeleteButton.addEventListener("click", () => {
  //   cardElement.remove();
  // });

  // cardImage.addEventListener("click", () => {
  //   const previewImage = previewModal.querySelector(".modal__preview-image");
  //   const previewTitle = previewModal.querySelector(".modal__preview-title");
  //   previewImage.src = data.link;
  //   previewImage.alt = data.name;
  //   previewTitle.textContent = data.name;
  //   openModalWindow(previewModal);
  // });

  // return cardElement;
}

//event listeners
editProfileButton.addEventListener("click", () =>
  openModalWindow(profileEditPopup)
);
profileCloseBtn.addEventListener("click", () =>
  closeModalWindow(profileEditPopup)
);
// addCardButton.addEventListener("click", () => openModalWindow(addCardPopup));
// addCloseBtn.addEventListener("click", () => closeModalWindow(addCardPopup));
// previewClose.addEventListener("click", () => closeModalWindow(previewModal));

//forms
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");

const profileName = document.querySelector(".profile__text");
const profileJob = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModalWindow(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// addFormElement.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.title.value;
//   const link = evt.target.link.value;
//   const cardView = createCard({
//     name,
//     link,
//   });
//   renderCard(cardView, cardList);
//   addFormElement.reset();
//   closeModalWindow(addCardPopup);
// });

const cardTemplate = document.querySelector("#cardTemplate").content;

const cardList = document.querySelector(".cards__container");

initialCards.forEach(function (data) {
  const cardView = createCard(data);
  renderCard(cardView, cardList);
});
