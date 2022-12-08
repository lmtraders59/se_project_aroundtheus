class Card {
  constructor(data, cardselector) {
    this.data = data.link;
    this.data = data.name;
    this._cardselector = cardselector;
  }
}

//Create Card
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

export default Card;
