import { openModalWindow, closeModalWindow } from "./utils.js";

class Card {
  constructor(data, cardselector) {
    this._link = data.link;
    this._name = data.name;
    this._cardselector = cardselector;
  }

  _setEventListeners() {
    // like button
    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_on");
    });

    // delete card button
    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    cardDeleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    //listen for image click
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        document.querySelector(".modal__preview-image").src =
          this._cardImage.src;
        document.querySelector(".modal__preview-title").textContent =
          this._cardTitle.textContent;
        const previewModal = document.querySelector("#image-preview");
        openModalWindow(previewModal);
      });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardselector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._cardElement;
  }
}

export default Card;
