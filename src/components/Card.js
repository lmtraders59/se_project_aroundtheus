class Card {
  constructor(
    data,
    userId,
    cardSelector,
    { handleCardClick, handleDeleteClick, handleLike }
  ) {
    this.id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._userId = userId;
    this._likes = data.likes;
    // console.log(this._likes.length);
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCallback = handleLike;
    this._handleDeleteClick = handleDeleteClick;
  }

  _handleDelete = () => {
    this._cardElement.remove();
  };

  // _handleLikeClick = () => {
  //   this.cardLikeButton.classList.toggle("card__like-button_on");
  //   this._handleLike(this);
  // };

  cardLiked() {
    return this._likes.some((item) => {
      return item._id === this._userId
      
    });
  }

  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.cardLiked()) {
      this.cardLikeButton.classList.add("card__like-button_on");
    } else {
      this.cardLikeButton.classList.remove("card__like-button_on");
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _setEventListeners() {
    // like button
    this.cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this.cardLikeButton.addEventListener("click", () =>
      this._handleLikeCallback(this)
    );

    // delete card button
    const cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    cardDeleteButton.addEventListener("click", this._handleDeleteClick);

    //listen for card image click
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        link: this._cardImage.src,
        name: this._cardTitle.textContent,
      });
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesCount = this._cardElement.querySelector(".card__like-count");
    this._likesCount.textContent = this._likes.length;
    return this._cardElement;
  }
}

export default Card;
