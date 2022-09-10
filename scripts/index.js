// cards array
const initialCards = [
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.png",
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
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.png",
  },
];

//popups and buttons
const profileEditPopup = document.querySelector("#profileEdit");
const editProfileButton = document.querySelector("#openModal");
const profileCloseBtn = document.querySelector("#profileExitBtn");
const addCardPopup = document.querySelector("#cardAdd");
const addCardButton = document.querySelector("#openModal2");
const addCloseBtn = document.querySelector("#addExitBtn");
const previewCloseBtn = document.querySelector("#image-preview_close");

// preview image modal
const previewImageEl = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewModal = document.querySelector("#image-preview");

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

//event listeners
editProfileButton.addEventListener("click", () =>
  openModalWindow(profileEditPopup)
);
profileCloseBtn.addEventListener("click", () =>
  closeModalWindow(profileEditPopup)
);

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");

  cardImage.addEventListener("click", (event) => {
    openModalWindow(previewModal);

    previewImageEl.src = event.target.src;
    previewImageEl.alt = event.target.alt;
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

//forms
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");

addCardButton.addEventListener("click", () => openModalWindow(addCardPopup));
addCloseBtn.addEventListener("click", () => closeModalWindow(addCardPopup));
previewCloseBtn.addEventListener("click", () => closeModalWindow(previewModal));

const profileName = document.querySelector(".profile__text");
const profileJob = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModalWindow(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

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
  closeModalWindow(addCardPopup);
});

const cardTemplate = document.querySelector("#cardTemplate").content;

const cardList = document.querySelector(".cards__container");

initialCards.forEach(function (data) {
  const cardView = createCard(data);
  renderCard(cardView, cardList);
});
