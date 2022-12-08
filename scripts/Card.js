class Card {
  constructor(data, cardselector) {
    this._link = data.link;
    this._name = data.name;
    this._cardselector = cardselector;
  }

  _setEventListeners() {
    // listen for like
    // listen for delete
    // listen for image click
  }

  getView() {
    this._cardElement = document.querySelector(this._cardselector).content.querySelector('.card').cloneNode(true);
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__text");

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._cardElement;
  }
  
}

export default Card;






// cardImage.addEventListener("click", (event) => {
//   openModalWindow(previewModal);

//   previewImageElement.src = event.target.src;
//   previewImageElement.alt = event.target.alt;
//   previewImageTitle.textContent = data.name;
// });

// Create the Card class, which creates a card with text and an image link, as per the following requirements:
// It takes card data — text and a link to the image — and a template element selector as parameters into the constructor.
// It has private methods for working with markup and adding event listeners.
// It has private methods for each event handler.
// It has one public method that returns a fully functional card element populated with data.




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
//   const submitButton = addFormElement.querySelector(".modal__form-button");
//   closeModalWindow();
// });