import { openModalWindow } from "./utils.js";

class Card {
  constructor(data, cardselector) {
    this._link = data.link;
    this._name = data.name;
    this._cardselector = cardselector;
  }

  _handleDelete = () => {
    this._cardElement.remove();
  };

  _handleLike = () => {
    this.cardLikeButton.classList.toggle("card__like-button_on");
  };

  _setEventListeners() {
    // like button
    this.cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this.cardLikeButton.addEventListener("click", this._handleLike);

    // delete card button
    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    cardDeleteButton.addEventListener("click", this._handleDelete);

    //listen for card image click
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        document.querySelector(".modal__preview-image").src =
          this._cardImage.src;

        document.querySelector(".modal__preview-image").alt =
          this._cardTitle.textContent;

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
