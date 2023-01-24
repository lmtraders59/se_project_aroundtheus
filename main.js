/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Card {
  constructor(data, cardselector, _ref) {
    let {
      handleCardClick
    } = _ref;
    _defineProperty(this, "_handleDelete", () => {
      this._cardElement.remove();
    });
    _defineProperty(this, "_handleLike", () => {
      this.cardLikeButton.classList.toggle("card__like-button_on");
    });
    this._link = data.link;
    this._name = data.name;
    this._cardselector = cardselector;
    this._handleCardClick = handleCardClick;
  }
  _setEventListeners() {
    // like button
    this.cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this.cardLikeButton.addEventListener("click", this._handleLike);

    // delete card button
    const cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", this._handleDelete);

    //listen for card image click
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        link: this._cardImage.src,
        name: this._cardTitle.textContent
      });
    });
  }
  getView() {
    this._cardElement = document.querySelector(this._cardselector).content.querySelector(".card").cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._cardElement;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector("#" + inputEl.id + "-error");
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector("#" + inputEl.id + "-error");
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _toggleButtonState() {
    const isValid = this._checkFormValidity(this._inputEls);
    if (!isValid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  _checkFormValidity(inputs) {
    return inputs.every(input => input.validity.valid);
  }
  _toggleInputError(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _setEventListeners() {
    this._inputEls = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputEls.forEach(inputEl => {
      inputEl.addEventListener("input", event => {
        this._toggleInputError(inputEl);
        this._toggleButtonState();
      });
    });
  }
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  resetValidation() {
    this._toggleButtonState();
    this._inputEls.forEach(input => {
      this._hideInputError(input);
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", e => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
/* harmony default export */ __webpack_exports__["default"] = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._exitButton = this._popupElement.querySelector(".modal__exit-button");
    this._handleEscUp = this._handleEscUp.bind(this);
  }
  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", evt => this._closePopupWithOverlay(evt));
    this._exitButton.addEventListener("click", () => this.closeModal());
  }
  openModal() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscUp);
  }
  closeModal() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscUp);
  }
  _closePopupWithOverlay(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.closeModal();
    }
  }
}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithForm; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleSubmit = handleFormSubmit;
    this._formEl = this._popupElement.querySelector(".modal__form");
    this._saveButton = this._formEl.querySelector(".modal__form-button");
    this._inputEls = Array.from(this._formEl.querySelectorAll(".modal__form-input"));
  }
  _getInputValues() {
    const inputValues = {};
    this._inputEls.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  closeModal() {
    this._formEl.reset();
    super.closeModal();
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }
  setEventListeners() {
    this._formEl.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithImage; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__preview-image");
    this._previewTitle = this._popupElement.querySelector(".modal__preview-title");
  }
  openModal(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = `A picture of ${data.name}`;
    this._previewTitle.textContent = data.name;
    super.openModal();
  }
}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Section; }
/* harmony export */ });
class Section {
  constructor(_ref, selector) {
    let {
      items,
      renderer
    } = _ref;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._items = items;
  }
  renderItems() {
    this._items.forEach(elem => {
      this._renderer(elem);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UserInfo; }
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      nameElement,
      jobElement
    } = _ref;
    this._profileName = nameElement;
    this._profileJob = jobElement;
  }
  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userJob: this._profileJob.textContent
    };
  }
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.description;
  }
}

/***/ }),

/***/ "./src/utils/Api.js":
/*!**************************!*\
  !*** ./src/utils/Api.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Api; }
/* harmony export */ });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Api {
  constructor(config) {
    _defineProperty(this, "getInitialCards", () => {
      return fetch(`${this.url}/cards`, {
        headers: this.headers
      }).then(this._checkServerResponse);
    });
    _defineProperty(this, "getProfileData", () => {
      return fetch(`${this.url}/users/me`, {
        headers: this.headers
      }).then(this._checkServerResponse);
    });
    _defineProperty(this, "updateProfileData", (name, about) => {
      return fetch(`${this.url}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name,
          about
        })
      }).then(this._checkServerResponse);
    });
    _defineProperty(this, "addNewCard", data => {
      return fetch(`${this.url}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then(this._checkServerResponse);
    });
    this.url = config.baseUrl;
    this.headers = config.headers;
  }
  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }
  getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getProfileData()]);
  }
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers
    }).then(this._checkServerResponse);
  }
  addLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT"
    }).then(this._checkServerResponse);
  }
  removeLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE"
    }).then(this._checkServerResponse);
  }
  setUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkServerResponse);
  }
}

// // Api config
// // Token: b9a1bbc7-9041-4365-a327-38782162fa8e Group ID: group-12
// export const apiConfig = {
//   baseUrl: "https://around.nomoreparties.co/v1/group-12",
//   headers: {
//     authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
//     "Content-Type": "application/json",
//   },
// };

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCardButton": function() { return /* binding */ addCardButton; },
/* harmony export */   "addFormElement": function() { return /* binding */ addFormElement; },
/* harmony export */   "editProfileButton": function() { return /* binding */ editProfileButton; },
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "jobEl": function() { return /* binding */ jobEl; },
/* harmony export */   "nameEl": function() { return /* binding */ nameEl; },
/* harmony export */   "profileEditPopupEl": function() { return /* binding */ profileEditPopupEl; },
/* harmony export */   "profileFormElement": function() { return /* binding */ profileFormElement; },
/* harmony export */   "profileNameInput": function() { return /* binding */ profileNameInput; },
/* harmony export */   "profileOccupationInput": function() { return /* binding */ profileOccupationInput; },
/* harmony export */   "selectors": function() { return /* binding */ selectors; }
/* harmony export */ });
//popups and buttons
const profileEditPopupEl = document.querySelector("#profileEdit");
const editProfileButton = document.querySelector("#openModal");
const addCardButton = document.querySelector("#openModal2");
const profileNameInput = profileEditPopupEl.querySelector(".modal__form-input-name");

//forms and inputs
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const profileOccupationInput = profileEditPopupEl.querySelector(".modal__form-input-description");
const nameEl = document.querySelector(".profile__text");
const jobEl = document.querySelector(".profile__description");

/// cards array
const initialCards = [{
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
}, {
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
}, {
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
}, {
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg"
}, {
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
}, {
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg"
}];

//selectors
const selectors = {
  addFormElement: "#add-form",
  profileEditPopupEl: "#profileEdit",
  profileFormElement: "#edit-form",
  profileNameInput: ".modal__form-input-name",
  editProfileButton: "#openModal",
  addCardButton: "#openModal2",
  nameEl: ".profile__text",
  jobEl: ".profile__description",
  profileOccupationInput: ".modal__form-input-description"
};

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _utils_Api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Api.js */ "./src/utils/Api.js");
// Import of Classes








const config = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible"
};

let cardList;
const api = new _utils_Api_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
    "Content-Type": "application/json"
  }
});
api.getInitialCards().then(initialCards => {
  // Card List
  cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    items: initialCards,
    renderer: cardData => {
      card = renderCard(cardData);
      cardList.addItem(card.getView());
    }
  }, ".cards__container");
  cardList.renderItems();
});

// Card Validator
const addCardValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.addFormElement);
addCardValidator.enableValidation();

// Profile Validator
const addProfileValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.profileFormElement);
addProfileValidator.enableValidation();

// User Info for Profile
const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  nameElement: _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.nameEl,
  jobElement: _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.jobEl
});
function renderCard(cardData) {
  return new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](cardData, "#cardTemplate", {
    handleCardClick: card => {
      previewPopup.openModal(card);
    }
  });
}
const previewPopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__["default"]("#image-preview");
previewPopup.setEventListeners();

//Add card popup
const cardFormPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#cardAdd", data => {
  const card = renderCard(data);
  cardList.addItem(card.getView());
  cardFormPopup.closeModal();
});
cardFormPopup.setEventListeners();
const profileEditPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#profileEdit", data => {
  userInfo.setUserInfo(data);
  profileEditPopup.closeModal();
});
profileEditPopup.setEventListeners();

// Card Button States
_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  cardFormPopup.openModal();
});
_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.profileNameInput.value = data.userName;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.profileOccupationInput.value = data.userJob;
  addProfileValidator.resetValidation();
  profileEditPopup.openModal();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLElBQUksQ0FBQztFQUNUQyxXQUFXLENBQUNDLElBQUksRUFBRUMsWUFBWSxRQUF1QjtJQUFBLElBQXJCO01BQUVDO0lBQWdCLENBQUM7SUFBQSx1Q0FPbkMsTUFBTTtNQUNwQixJQUFJLENBQUNDLFlBQVksQ0FBQ0MsTUFBTSxFQUFFO0lBQzVCLENBQUM7SUFBQSxxQ0FFYSxNQUFNO01BQ2xCLElBQUksQ0FBQ0MsY0FBYyxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztJQUM5RCxDQUFDO0lBWkMsSUFBSSxDQUFDQyxLQUFLLEdBQUdSLElBQUksQ0FBQ1MsSUFBSTtJQUN0QixJQUFJLENBQUNDLEtBQUssR0FBR1YsSUFBSSxDQUFDVyxJQUFJO0lBQ3RCLElBQUksQ0FBQ0MsYUFBYSxHQUFHWCxZQUFZO0lBQ2pDLElBQUksQ0FBQ1ksZ0JBQWdCLEdBQUdYLGVBQWU7RUFDekM7RUFVQVksa0JBQWtCLEdBQUc7SUFDbkI7SUFDQSxJQUFJLENBQUNULGNBQWMsR0FBRyxJQUFJLENBQUNGLFlBQVksQ0FBQ1ksYUFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQzNFLElBQUksQ0FBQ1YsY0FBYyxDQUFDVyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDQyxXQUFXLENBQUM7O0lBRS9EO0lBQ0EsTUFBTUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDZixZQUFZLENBQUNZLGFBQWEsQ0FDdEQsc0JBQXNCLENBQ3ZCO0lBQ0RHLGdCQUFnQixDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDRyxhQUFhLENBQUM7O0lBRTlEO0lBQ0EsSUFBSSxDQUFDQyxVQUFVLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQzlDLElBQUksQ0FBQ0gsZ0JBQWdCLENBQUM7UUFDcEJKLElBQUksRUFBRSxJQUFJLENBQUNXLFVBQVUsQ0FBQ0MsR0FBRztRQUN6QlYsSUFBSSxFQUFFLElBQUksQ0FBQ1csVUFBVSxDQUFDQztNQUN4QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUVBQyxPQUFPLEdBQUc7SUFDUixJQUFJLENBQUNyQixZQUFZLEdBQUdzQixRQUFRLENBQ3pCVixhQUFhLENBQUMsSUFBSSxDQUFDSCxhQUFhLENBQUMsQ0FDakNjLE9BQU8sQ0FBQ1gsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUM5QlksU0FBUyxDQUFDLElBQUksQ0FBQztJQUNsQixJQUFJLENBQUNQLFVBQVUsR0FBRyxJQUFJLENBQUNqQixZQUFZLENBQUNZLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDakUsSUFBSSxDQUFDTyxVQUFVLEdBQUcsSUFBSSxDQUFDbkIsWUFBWSxDQUFDWSxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQ2hFLElBQUksQ0FBQ0Qsa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDTSxVQUFVLENBQUNDLEdBQUcsR0FBRyxJQUFJLENBQUNiLEtBQUs7SUFDaEMsSUFBSSxDQUFDWSxVQUFVLENBQUNRLEdBQUcsR0FBRyxJQUFJLENBQUNsQixLQUFLO0lBQ2hDLElBQUksQ0FBQ1ksVUFBVSxDQUFDQyxXQUFXLEdBQUcsSUFBSSxDQUFDYixLQUFLO0lBQ3hDLE9BQU8sSUFBSSxDQUFDUCxZQUFZO0VBQzFCO0FBQ0Y7QUFFQSwrREFBZUwsSUFBSTs7Ozs7Ozs7Ozs7QUNuRG5CLE1BQU0rQixhQUFhLENBQUM7RUFDbEI5QixXQUFXLENBQUMrQixNQUFNLEVBQUVDLFdBQVcsRUFBRTtJQUMvQixJQUFJLENBQUNDLGNBQWMsR0FBR0YsTUFBTSxDQUFDRyxhQUFhO0lBQzFDLElBQUksQ0FBQ0MscUJBQXFCLEdBQUdKLE1BQU0sQ0FBQ0ssb0JBQW9CO0lBQ3hELElBQUksQ0FBQ0Msb0JBQW9CLEdBQUdOLE1BQU0sQ0FBQ08sbUJBQW1CO0lBQ3RELElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdSLE1BQU0sQ0FBQ1MsZUFBZTtJQUM5QyxJQUFJLENBQUNDLFdBQVcsR0FBR1YsTUFBTSxDQUFDVyxVQUFVO0lBQ3BDLElBQUksQ0FBQ0MsWUFBWSxHQUFHWCxXQUFXO0VBQ2pDO0VBRUFZLGVBQWUsQ0FBQ0MsT0FBTyxFQUFFO0lBQ3ZCLE1BQU1DLGNBQWMsR0FBRyxJQUFJLENBQUNILFlBQVksQ0FBQzNCLGFBQWEsQ0FDcEQsR0FBRyxHQUFHNkIsT0FBTyxDQUFDRSxFQUFFLEdBQUcsUUFBUSxDQUM1QjtJQUNERixPQUFPLENBQUN0QyxTQUFTLENBQUN5QyxHQUFHLENBQUMsSUFBSSxDQUFDVCxnQkFBZ0IsQ0FBQztJQUM1Q08sY0FBYyxDQUFDdEIsV0FBVyxHQUFHcUIsT0FBTyxDQUFDSSxpQkFBaUI7SUFDdERILGNBQWMsQ0FBQ3ZDLFNBQVMsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLENBQUNQLFdBQVcsQ0FBQztFQUNoRDtFQUVBUyxlQUFlLENBQUNMLE9BQU8sRUFBRTtJQUN2QixNQUFNQyxjQUFjLEdBQUcsSUFBSSxDQUFDSCxZQUFZLENBQUMzQixhQUFhLENBQ3BELEdBQUcsR0FBRzZCLE9BQU8sQ0FBQ0UsRUFBRSxHQUFHLFFBQVEsQ0FDNUI7SUFDREYsT0FBTyxDQUFDdEMsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDa0MsZ0JBQWdCLENBQUM7SUFDL0NPLGNBQWMsQ0FBQ3RCLFdBQVcsR0FBRyxHQUFHO0lBQ2hDc0IsY0FBYyxDQUFDdkMsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDb0MsV0FBVyxDQUFDO0VBQ25EO0VBRUFVLGtCQUFrQixHQUFHO0lBQ25CLE1BQU1DLE9BQU8sR0FBRyxJQUFJLENBQUNDLGtCQUFrQixDQUFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDO0lBQ3ZELElBQUksQ0FBQ0YsT0FBTyxFQUFFO01BQ1osSUFBSSxDQUFDRyxhQUFhLENBQUNoRCxTQUFTLENBQUN5QyxHQUFHLENBQUMsSUFBSSxDQUFDWCxvQkFBb0IsQ0FBQztNQUMzRCxJQUFJLENBQUNrQixhQUFhLENBQUNDLFFBQVEsR0FBRyxJQUFJO0lBQ3BDLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQ0QsYUFBYSxDQUFDaEQsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDZ0Msb0JBQW9CLENBQUM7TUFDOUQsSUFBSSxDQUFDa0IsYUFBYSxDQUFDQyxRQUFRLEdBQUcsS0FBSztJQUNyQztFQUNGO0VBRUFILGtCQUFrQixDQUFDSSxNQUFNLEVBQUU7SUFDekIsT0FBT0EsTUFBTSxDQUFDQyxLQUFLLENBQUVDLEtBQUssSUFBS0EsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQztFQUN0RDtFQUVBQyxpQkFBaUIsQ0FBQ2pCLE9BQU8sRUFBRTtJQUN6QixJQUFJLENBQUNBLE9BQU8sQ0FBQ2UsUUFBUSxDQUFDQyxLQUFLLEVBQUU7TUFDM0IsSUFBSSxDQUFDakIsZUFBZSxDQUFDQyxPQUFPLENBQUM7SUFDL0IsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDSyxlQUFlLENBQUNMLE9BQU8sQ0FBQztJQUMvQjtFQUNGO0VBRUE5QixrQkFBa0IsR0FBRztJQUNuQixJQUFJLENBQUN1QyxTQUFTLEdBQUcsQ0FDZixHQUFHLElBQUksQ0FBQ1gsWUFBWSxDQUFDb0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOUIsY0FBYyxDQUFDLENBQzNEO0lBQ0QsSUFBSSxDQUFDc0IsYUFBYSxHQUFHLElBQUksQ0FBQ1osWUFBWSxDQUFDM0IsYUFBYSxDQUNsRCxJQUFJLENBQUNtQixxQkFBcUIsQ0FDM0I7SUFDRCxJQUFJLENBQUNtQixTQUFTLENBQUNVLE9BQU8sQ0FBRW5CLE9BQU8sSUFBSztNQUNsQ0EsT0FBTyxDQUFDNUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFHZ0QsS0FBSyxJQUFLO1FBQzNDLElBQUksQ0FBQ0gsaUJBQWlCLENBQUNqQixPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDTSxrQkFBa0IsRUFBRTtNQUMzQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUVBZSxtQkFBbUIsR0FBRztJQUNwQixJQUFJLENBQUNYLGFBQWEsQ0FBQ2hELFNBQVMsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLENBQUNYLG9CQUFvQixDQUFDO0lBQzNELElBQUksQ0FBQ2tCLGFBQWEsQ0FBQ0MsUUFBUSxHQUFHLElBQUk7RUFDcEM7RUFFQVcsZUFBZSxHQUFHO0lBQ2hCLElBQUksQ0FBQ2hCLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0csU0FBUyxDQUFDVSxPQUFPLENBQUVMLEtBQUssSUFBSztNQUNoQyxJQUFJLENBQUNULGVBQWUsQ0FBQ1MsS0FBSyxDQUFDO0lBQzdCLENBQUMsQ0FBQztFQUNKO0VBRUFTLGdCQUFnQixHQUFHO0lBQ2pCLElBQUksQ0FBQ3pCLFlBQVksQ0FBQzFCLGdCQUFnQixDQUFDLFFBQVEsRUFBR29ELENBQUMsSUFBSztNQUNsREEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7SUFDcEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDdkQsa0JBQWtCLEVBQUU7RUFDM0I7QUFDRjtBQUNBLCtEQUFlZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ3JGYixNQUFNeUMsS0FBSyxDQUFDO0VBQ3pCdkUsV0FBVyxDQUFDd0UsYUFBYSxFQUFFO0lBQ3pCLElBQUksQ0FBQ0MsYUFBYSxHQUFHL0MsUUFBUSxDQUFDVixhQUFhLENBQUN3RCxhQUFhLENBQUM7SUFDMUQsSUFBSSxDQUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDRCxhQUFhLENBQUN6RCxhQUFhLENBQUMscUJBQXFCLENBQUM7SUFDMUUsSUFBSSxDQUFDMkQsWUFBWSxHQUFHLElBQUksQ0FBQ0EsWUFBWSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ2xEO0VBRUFELFlBQVksQ0FBQ0UsR0FBRyxFQUFFO0lBQ2hCLElBQUlBLEdBQUcsQ0FBQ0MsR0FBRyxLQUFLLFFBQVEsRUFBRTtNQUN4QixJQUFJLENBQUNDLFVBQVUsRUFBRTtJQUNuQjtFQUNGO0VBRUFDLGlCQUFpQixHQUFHO0lBQ2xCLElBQUksQ0FBQ1AsYUFBYSxDQUFDeEQsZ0JBQWdCLENBQUMsV0FBVyxFQUFHNEQsR0FBRyxJQUNuRCxJQUFJLENBQUNJLHNCQUFzQixDQUFDSixHQUFHLENBQUMsQ0FDakM7SUFDRCxJQUFJLENBQUNILFdBQVcsQ0FBQ3pELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQzhELFVBQVUsRUFBRSxDQUFDO0VBQ3JFO0VBRUFHLFNBQVMsR0FBRztJQUNWLElBQUksQ0FBQ1QsYUFBYSxDQUFDbEUsU0FBUyxDQUFDeUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUNoRHRCLFFBQVEsQ0FBQ1QsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzBELFlBQVksQ0FBQztFQUN6RDtFQUVBSSxVQUFVLEdBQUc7SUFDWCxJQUFJLENBQUNOLGFBQWEsQ0FBQ2xFLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUNuRHFCLFFBQVEsQ0FBQ3lELG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUNSLFlBQVksQ0FBQztFQUM1RDtFQUVBTSxzQkFBc0IsQ0FBQ0osR0FBRyxFQUFFO0lBQzFCLElBQUlBLEdBQUcsQ0FBQ08sTUFBTSxDQUFDN0UsU0FBUyxDQUFDOEUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO01BQ2pELElBQUksQ0FBQ04sVUFBVSxFQUFFO0lBQ25CO0VBQ0Y7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDbkMrQjtBQUVoQixNQUFNTyxhQUFhLFNBQVNmLGlEQUFLLENBQUM7RUFDL0N2RSxXQUFXLENBQUN3RSxhQUFhLEVBQUVlLGdCQUFnQixFQUFFO0lBQzNDLEtBQUssQ0FBQ2YsYUFBYSxDQUFDO0lBQ3BCLElBQUksQ0FBQ2dCLGFBQWEsR0FBR0QsZ0JBQWdCO0lBQ3JDLElBQUksQ0FBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQ2hCLGFBQWEsQ0FBQ3pELGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDL0QsSUFBSSxDQUFDMEUsV0FBVyxHQUFHLElBQUksQ0FBQ0QsT0FBTyxDQUFDekUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BFLElBQUksQ0FBQ3NDLFNBQVMsR0FBR3FDLEtBQUssQ0FBQ0MsSUFBSSxDQUN6QixJQUFJLENBQUNILE9BQU8sQ0FBQzFCLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQ3BEO0VBQ0g7RUFFQThCLGVBQWUsR0FBRztJQUNoQixNQUFNQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ3hDLFNBQVMsQ0FBQ1UsT0FBTyxDQUFFTCxLQUFLLElBQUs7TUFDaENtQyxXQUFXLENBQUNuQyxLQUFLLENBQUMvQyxJQUFJLENBQUMsR0FBRytDLEtBQUssQ0FBQ29DLEtBQUs7SUFDdkMsQ0FBQyxDQUFDO0lBQ0YsT0FBT0QsV0FBVztFQUNwQjtFQUVBZixVQUFVLEdBQUc7SUFDWCxJQUFJLENBQUNVLE9BQU8sQ0FBQ08sS0FBSyxFQUFFO0lBQ3BCLEtBQUssQ0FBQ2pCLFVBQVUsRUFBRTtFQUNwQjtFQUVBa0IsYUFBYSxDQUFDQyxTQUFTLEVBQUU7SUFDdkIsSUFBSUEsU0FBUyxFQUFFO01BQ2IsSUFBSSxDQUFDUixXQUFXLENBQUNsRSxXQUFXLEdBQUcsV0FBVztJQUM1QyxDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNrRSxXQUFXLENBQUNsRSxXQUFXLEdBQUcsTUFBTTtJQUN2QztFQUNGO0VBRUF3RCxpQkFBaUIsR0FBRztJQUNsQixJQUFJLENBQUNTLE9BQU8sQ0FBQ3hFLGdCQUFnQixDQUFDLFFBQVEsRUFBRzRELEdBQUcsSUFBSztNQUMvQ0EsR0FBRyxDQUFDUCxjQUFjLEVBQUU7TUFDcEIsSUFBSSxDQUFDa0IsYUFBYSxDQUFDLElBQUksQ0FBQ0ssZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBQ0YsS0FBSyxDQUFDYixpQkFBaUIsRUFBRTtFQUMzQjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7QUN6QytCO0FBRWhCLE1BQU1tQixjQUFjLFNBQVM1QixpREFBSyxDQUFDO0VBQ2hEdkUsV0FBVyxDQUFDd0UsYUFBYSxFQUFFO0lBQ3pCLEtBQUssQ0FBQ0EsYUFBYSxDQUFDO0lBQ3BCLElBQUksQ0FBQzRCLGFBQWEsR0FBRyxJQUFJLENBQUMzQixhQUFhLENBQUN6RCxhQUFhLENBQ25ELHVCQUF1QixDQUN4QjtJQUNELElBQUksQ0FBQ3FGLGFBQWEsR0FBRyxJQUFJLENBQUM1QixhQUFhLENBQUN6RCxhQUFhLENBQ25ELHVCQUF1QixDQUN4QjtFQUNIO0VBRUFrRSxTQUFTLENBQUNqRixJQUFJLEVBQUU7SUFDZCxJQUFJLENBQUNtRyxhQUFhLENBQUM5RSxHQUFHLEdBQUdyQixJQUFJLENBQUNTLElBQUk7SUFDbEMsSUFBSSxDQUFDMEYsYUFBYSxDQUFDdkUsR0FBRyxHQUFJLGdCQUFlNUIsSUFBSSxDQUFDVyxJQUFLLEVBQUM7SUFDcEQsSUFBSSxDQUFDeUYsYUFBYSxDQUFDN0UsV0FBVyxHQUFHdkIsSUFBSSxDQUFDVyxJQUFJO0lBQzFDLEtBQUssQ0FBQ3NFLFNBQVMsRUFBRTtFQUNuQjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQ25CZSxNQUFNb0IsT0FBTyxDQUFDO0VBQzNCdEcsV0FBVyxPQUFzQnVHLFFBQVEsRUFBRTtJQUFBLElBQS9CO01BQUVDLEtBQUs7TUFBRUM7SUFBUyxDQUFDO0lBQzdCLElBQUksQ0FBQ0MsU0FBUyxHQUFHRCxRQUFRO0lBQ3pCLElBQUksQ0FBQ0UsVUFBVSxHQUFHakYsUUFBUSxDQUFDVixhQUFhLENBQUN1RixRQUFRLENBQUM7SUFDbEQsSUFBSSxDQUFDSyxNQUFNLEdBQUdKLEtBQUs7RUFDckI7RUFDQUssV0FBVyxHQUFHO0lBQ1osSUFBSSxDQUFDRCxNQUFNLENBQUM1QyxPQUFPLENBQUU4QyxJQUFJLElBQUs7TUFDNUIsSUFBSSxDQUFDSixTQUFTLENBQUNJLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUM7RUFDSjtFQUVBQyxPQUFPLENBQUNDLElBQUksRUFBRTtJQUNaLElBQUksQ0FBQ0wsVUFBVSxDQUFDTSxPQUFPLENBQUNELElBQUksQ0FBQztFQUMvQjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQ2ZlLE1BQU1FLFFBQVEsQ0FBQztFQUM1QmxILFdBQVcsT0FBOEI7SUFBQSxJQUE3QjtNQUFFbUgsV0FBVztNQUFFQztJQUFXLENBQUM7SUFDckMsSUFBSSxDQUFDQyxZQUFZLEdBQUdGLFdBQVc7SUFDL0IsSUFBSSxDQUFDRyxXQUFXLEdBQUdGLFVBQVU7RUFDL0I7RUFFQUcsV0FBVyxHQUFHO0lBQ1osT0FBTztNQUNMQyxRQUFRLEVBQUUsSUFBSSxDQUFDSCxZQUFZLENBQUM3RixXQUFXO01BQ3ZDaUcsT0FBTyxFQUFFLElBQUksQ0FBQ0gsV0FBVyxDQUFDOUY7SUFDNUIsQ0FBQztFQUNIO0VBRUFrRyxXQUFXLENBQUN6SCxJQUFJLEVBQUU7SUFDaEIsSUFBSSxDQUFDb0gsWUFBWSxDQUFDN0YsV0FBVyxHQUFHdkIsSUFBSSxDQUFDVyxJQUFJO0lBQ3pDLElBQUksQ0FBQzBHLFdBQVcsQ0FBQzlGLFdBQVcsR0FBR3ZCLElBQUksQ0FBQzBILFdBQVc7RUFDakQ7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQmUsTUFBTUMsR0FBRyxDQUFDO0VBQ3ZCNUgsV0FBVyxDQUFDK0IsTUFBTSxFQUFFO0lBQUEseUNBU0YsTUFBTTtNQUN0QixPQUFPOEYsS0FBSyxDQUFFLEdBQUUsSUFBSSxDQUFDQyxHQUFJLFFBQU8sRUFBRTtRQUNoQ0MsT0FBTyxFQUFFLElBQUksQ0FBQ0E7TUFDaEIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNDLG9CQUFvQixDQUFDO0lBQ3BDLENBQUM7SUFBQSx3Q0FFZ0IsTUFBTTtNQUNyQixPQUFPSixLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksV0FBVSxFQUFFO1FBQ25DQyxPQUFPLEVBQUUsSUFBSSxDQUFDQTtNQUNoQixDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUFBLDJDQU1tQixDQUFDckgsSUFBSSxFQUFFc0gsS0FBSyxLQUFLO01BQ25DLE9BQU9MLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxXQUFVLEVBQUU7UUFDbkNLLE1BQU0sRUFBRSxPQUFPO1FBQ2ZKLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU87UUFDckJLLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUM7VUFDbkIxSCxJQUFJO1VBQ0pzSDtRQUNGLENBQUM7TUFDSCxDQUFDLENBQUMsQ0FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUFBLG9DQUVhaEksSUFBSSxJQUFLO01BQ3JCLE9BQU80SCxLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksUUFBTyxFQUFFO1FBQ2hDSyxNQUFNLEVBQUUsTUFBTTtRQUNkSixPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO1FBQ3JCSyxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDO1VBQ25CMUgsSUFBSSxFQUFFWCxJQUFJLENBQUNXLElBQUk7VUFDZkYsSUFBSSxFQUFFVCxJQUFJLENBQUNTO1FBQ2IsQ0FBQztNQUNILENBQUMsQ0FBQyxDQUFDc0gsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQTVDQyxJQUFJLENBQUNILEdBQUcsR0FBRy9GLE1BQU0sQ0FBQ3dHLE9BQU87SUFDekIsSUFBSSxDQUFDUixPQUFPLEdBQUdoRyxNQUFNLENBQUNnRyxPQUFPO0VBQy9CO0VBRUFFLG9CQUFvQixDQUFDTyxHQUFHLEVBQUU7SUFDeEIsT0FBT0EsR0FBRyxDQUFDQyxFQUFFLEdBQUdELEdBQUcsQ0FBQ0UsSUFBSSxFQUFFLEdBQUdDLE9BQU8sQ0FBQ0MsTUFBTSxDQUFFLFVBQVNKLEdBQUcsQ0FBQ0ssVUFBVyxFQUFDLENBQUM7RUFDekU7RUFjQUMsY0FBYyxHQUFHO0lBQ2YsT0FBT0gsT0FBTyxDQUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUNDLGVBQWUsRUFBRSxFQUFFLElBQUksQ0FBQ0MsY0FBYyxFQUFFLENBQUMsQ0FBQztFQUNyRTtFQXdCQUMsVUFBVSxDQUFDbkcsRUFBRSxFQUFFO0lBQ2IsT0FBTzhFLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxVQUFTL0UsRUFBRyxFQUFDLEVBQUU7TUFDdENvRixNQUFNLEVBQUUsUUFBUTtNQUNoQkosT0FBTyxFQUFFLElBQUksQ0FBQ0E7SUFDaEIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNDLG9CQUFvQixDQUFDO0VBQ3BDO0VBRUFrQixPQUFPLENBQUNwRyxFQUFFLEVBQUU7SUFDVixPQUFPOEUsS0FBSyxDQUFFLEdBQUUsSUFBSSxDQUFDQyxHQUFJLGdCQUFlL0UsRUFBRyxFQUFDLEVBQUU7TUFDNUNnRixPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO01BQ3JCSSxNQUFNLEVBQUU7SUFDVixDQUFDLENBQUMsQ0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7RUFDcEM7RUFFQW1CLFVBQVUsQ0FBQ3JHLEVBQUUsRUFBRTtJQUNiLE9BQU84RSxLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksZ0JBQWUvRSxFQUFHLEVBQUMsRUFBRTtNQUM1Q2dGLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU87TUFDckJJLE1BQU0sRUFBRTtJQUNWLENBQUMsQ0FBQyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQztFQUNwQztFQUVBb0IsYUFBYSxDQUFDQyxNQUFNLEVBQUU7SUFDcEIsT0FBT3pCLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxtQkFBa0IsRUFBRTtNQUMzQ0ssTUFBTSxFQUFFLE9BQU87TUFDZkosT0FBTyxFQUFFLElBQUksQ0FBQ0EsT0FBTztNQUNyQkssSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztRQUNuQmdCO01BQ0YsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7RUFDcEM7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUNPLE1BQU1zQixrQkFBa0IsR0FBRzdILFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUNqRSxNQUFNd0ksaUJBQWlCLEdBQUc5SCxRQUFRLENBQUNWLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDOUQsTUFBTXlJLGFBQWEsR0FBRy9ILFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUMzRCxNQUFNMEksZ0JBQWdCLEdBQUdILGtCQUFrQixDQUFDdkksYUFBYSxDQUM5RCx5QkFBeUIsQ0FDMUI7O0FBRUQ7QUFDTyxNQUFNMkksa0JBQWtCLEdBQUdqSSxRQUFRLENBQUNWLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDL0QsTUFBTTRJLGNBQWMsR0FBR2xJLFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUMxRCxNQUFNNkksc0JBQXNCLEdBQUdOLGtCQUFrQixDQUFDdkksYUFBYSxDQUNwRSxnQ0FBZ0MsQ0FDakM7QUFDTSxNQUFNOEksTUFBTSxHQUFHcEksUUFBUSxDQUFDVixhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDdkQsTUFBTStJLEtBQUssR0FBR3JJLFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLHVCQUF1QixDQUFDOztBQUVwRTtBQUNPLE1BQU1nSixZQUFZLEdBQUcsQ0FDMUI7RUFDRXBKLElBQUksRUFBRSxpQkFBaUI7RUFDdkJGLElBQUksRUFBRTtBQUNSLENBQUMsRUFDRDtFQUNFRSxJQUFJLEVBQUUsYUFBYTtFQUNuQkYsSUFBSSxFQUFFO0FBQ1IsQ0FBQyxFQUNEO0VBQ0VFLElBQUksRUFBRSxnQkFBZ0I7RUFDdEJGLElBQUksRUFBRTtBQUNSLENBQUMsRUFDRDtFQUNFRSxJQUFJLEVBQUUsU0FBUztFQUNmRixJQUFJLEVBQUU7QUFDUixDQUFDLEVBQ0Q7RUFDRUUsSUFBSSxFQUFFLHVCQUF1QjtFQUM3QkYsSUFBSSxFQUFFO0FBQ1IsQ0FBQyxFQUNEO0VBQ0VFLElBQUksRUFBRSxnQkFBZ0I7RUFDdEJGLElBQUksRUFBRTtBQUNSLENBQUMsQ0FDRjs7QUFFRDtBQUNPLE1BQU11SixTQUFTLEdBQUc7RUFDdkJMLGNBQWMsRUFBRSxXQUFXO0VBQzNCTCxrQkFBa0IsRUFBRSxjQUFjO0VBQ2xDSSxrQkFBa0IsRUFBRSxZQUFZO0VBQ2hDRCxnQkFBZ0IsRUFBRSx5QkFBeUI7RUFDM0NGLGlCQUFpQixFQUFFLFlBQVk7RUFDL0JDLGFBQWEsRUFBRSxhQUFhO0VBQzVCSyxNQUFNLEVBQUUsZ0JBQWdCO0VBQ3hCQyxLQUFLLEVBQUUsdUJBQXVCO0VBQzlCRixzQkFBc0IsRUFBRTtBQUMxQixDQUFDOzs7Ozs7Ozs7OztBQ3hERDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMkQ7QUFDbEI7QUFDcEI7QUFDNEI7QUFDWTtBQUNGO0FBQ1o7QUFVaEI7QUFFL0IsTUFBTTlILE1BQU0sR0FBRztFQUNiRyxhQUFhLEVBQUUsb0JBQW9CO0VBQ25DRSxvQkFBb0IsRUFBRSxxQkFBcUI7RUFDM0NFLG1CQUFtQixFQUFFLDZCQUE2QjtFQUNsREUsZUFBZSxFQUFFLDhCQUE4QjtFQUMvQ0UsVUFBVSxFQUFFO0FBQ2QsQ0FBQztBQUVpQztBQUVsQyxJQUFJd0gsUUFBUTtBQUVaLE1BQU1DLEdBQUcsR0FBRyxJQUFJdkMscURBQUcsQ0FBQztFQUNsQlcsT0FBTyxFQUFFLDZDQUE2QztFQUN0RFIsT0FBTyxFQUFFO0lBQ1BxQyxhQUFhLEVBQUUsc0NBQXNDO0lBQ3JELGNBQWMsRUFBRTtFQUNsQjtBQUNGLENBQUMsQ0FBQztBQUVGRCxHQUFHLENBQUNuQixlQUFlLEVBQUUsQ0FBQ2hCLElBQUksQ0FBRWdDLFlBQVksSUFBSztFQUMzQztFQUNBRSxRQUFRLEdBQUcsSUFBSTVELDhEQUFPLENBQ3BCO0lBQ0VFLEtBQUssRUFBRXdELFlBQVk7SUFDbkJ2RCxRQUFRLEVBQUc0RCxRQUFRLElBQUs7TUFDdEJDLElBQUksR0FBR0MsVUFBVSxDQUFDRixRQUFRLENBQUM7TUFDM0JILFFBQVEsQ0FBQ25ELE9BQU8sQ0FBQ3VELElBQUksQ0FBQzdJLE9BQU8sRUFBRSxDQUFDO0lBQ2xDO0VBQ0YsQ0FBQyxFQUNELG1CQUFtQixDQUNwQjtFQUNEeUksUUFBUSxDQUFDckQsV0FBVyxFQUFFO0FBQ3hCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0yRCxnQkFBZ0IsR0FBRyxJQUFJMUksb0VBQWEsQ0FBQ0MsTUFBTSxFQUFFNkgsK0RBQWMsQ0FBQztBQUNsRVksZ0JBQWdCLENBQUNwRyxnQkFBZ0IsRUFBRTs7QUFFbkM7QUFDQSxNQUFNcUcsbUJBQW1CLEdBQUcsSUFBSTNJLG9FQUFhLENBQUNDLE1BQU0sRUFBRTRILG1FQUFrQixDQUFDO0FBQ3pFYyxtQkFBbUIsQ0FBQ3JHLGdCQUFnQixFQUFFOztBQUV0QztBQUNBLE1BQU1zRyxRQUFRLEdBQUcsSUFBSXhELCtEQUFRLENBQUM7RUFDNUJDLFdBQVcsRUFBRTJDLHVEQUFNO0VBQ25CMUMsVUFBVSxFQUFFMkMsc0RBQUtBO0FBQ25CLENBQUMsQ0FBQztBQUVGLFNBQVNRLFVBQVUsQ0FBQ0YsUUFBUSxFQUFFO0VBQzVCLE9BQU8sSUFBSXRLLDJEQUFJLENBQUNzSyxRQUFRLEVBQUUsZUFBZSxFQUFFO0lBQ3pDbEssZUFBZSxFQUFHbUssSUFBSSxJQUFLO01BQ3pCSyxZQUFZLENBQUN6RixTQUFTLENBQUNvRixJQUFJLENBQUM7SUFDOUI7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLE1BQU1LLFlBQVksR0FBRyxJQUFJeEUscUVBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUN6RHdFLFlBQVksQ0FBQzNGLGlCQUFpQixFQUFFOztBQUVoQztBQUNBLE1BQU00RixhQUFhLEdBQUcsSUFBSXRGLG9FQUFhLENBQUMsVUFBVSxFQUFHckYsSUFBSSxJQUFLO0VBQzVELE1BQU1xSyxJQUFJLEdBQUdDLFVBQVUsQ0FBQ3RLLElBQUksQ0FBQztFQUM3QmlLLFFBQVEsQ0FBQ25ELE9BQU8sQ0FBQ3VELElBQUksQ0FBQzdJLE9BQU8sRUFBRSxDQUFDO0VBQ2hDbUosYUFBYSxDQUFDN0YsVUFBVSxFQUFFO0FBQzVCLENBQUMsQ0FBQztBQUNGNkYsYUFBYSxDQUFDNUYsaUJBQWlCLEVBQUU7QUFFakMsTUFBTTZGLGdCQUFnQixHQUFHLElBQUl2RixvRUFBYSxDQUFDLGNBQWMsRUFBR3JGLElBQUksSUFBSztFQUNuRXlLLFFBQVEsQ0FBQ2hELFdBQVcsQ0FBQ3pILElBQUksQ0FBQztFQUMxQjRLLGdCQUFnQixDQUFDOUYsVUFBVSxFQUFFO0FBQy9CLENBQUMsQ0FBQztBQUNGOEYsZ0JBQWdCLENBQUM3RixpQkFBaUIsRUFBRTs7QUFFcEM7QUFDQXlFLCtFQUE4QixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQzVDZSxnQkFBZ0IsQ0FBQ3JHLGVBQWUsRUFBRTtFQUNsQ3lHLGFBQWEsQ0FBQzFGLFNBQVMsRUFBRTtBQUMzQixDQUFDLENBQUM7QUFFRnNFLG1GQUFrQyxDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ2hELE1BQU12SixJQUFJLEdBQUd5SyxRQUFRLENBQUNuRCxXQUFXLEVBQUU7RUFDbkNtQyx1RUFBc0IsR0FBR3pKLElBQUksQ0FBQ3VILFFBQVE7RUFDdENxQyw2RUFBNEIsR0FBRzVKLElBQUksQ0FBQ3dILE9BQU87RUFDM0NnRCxtQkFBbUIsQ0FBQ3RHLGVBQWUsRUFBRTtFQUNyQzBHLGdCQUFnQixDQUFDM0YsU0FBUyxFQUFFO0FBQzlCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL3V0aWxzL0FwaS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcHJpbnQtOC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZHNlbGVjdG9yLCB7IGhhbmRsZUNhcmRDbGljayB9KSB7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2NhcmRzZWxlY3RvciA9IGNhcmRzZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcclxuICB9XHJcblxyXG4gIF9oYW5kbGVEZWxldGUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBfaGFuZGxlTGlrZSA9ICgpID0+IHtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX29uXCIpO1xyXG4gIH07XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIC8vIGxpa2UgYnV0dG9uXHJcbiAgICB0aGlzLmNhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZUxpa2UpO1xyXG5cclxuICAgIC8vIGRlbGV0ZSBjYXJkIGJ1dHRvblxyXG4gICAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIlxyXG4gICAgKTtcclxuICAgIGNhcmREZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZURlbGV0ZSk7XHJcblxyXG4gICAgLy9saXN0ZW4gZm9yIGNhcmQgaW1hZ2UgY2xpY2tcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soe1xyXG4gICAgICAgIGxpbms6IHRoaXMuX2NhcmRJbWFnZS5zcmMsXHJcbiAgICAgICAgbmFtZTogdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZHNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RleHRcIik7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcclxuICAgIHRoaXMuX2NhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjXCIgKyBpbnB1dEVsLmlkICsgXCItZXJyb3JcIlxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI1wiICsgaW5wdXRFbC5pZCArIFwiLWVycm9yXCJcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCIgXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuX2NoZWNrRm9ybVZhbGlkaXR5KHRoaXMuX2lucHV0RWxzKTtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jaGVja0Zvcm1WYWxpZGl0eShpbnB1dHMpIHtcclxuICAgIHJldHVybiBpbnB1dHMuZXZlcnkoKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gW1xyXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yXHJcbiAgICApO1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xyXG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl90b2dnbGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2V4aXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZXhpdC1idXR0b25cIik7XHJcbiAgICB0aGlzLl9oYW5kbGVFc2NVcCA9IHRoaXMuX2hhbmRsZUVzY1VwLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjVXAoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT5cclxuICAgICAgdGhpcy5fY2xvc2VQb3B1cFdpdGhPdmVybGF5KGV2dClcclxuICAgICk7XHJcbiAgICB0aGlzLl9leGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSk7XHJcbiAgfVxyXG5cclxuICBvcGVuTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIF9jbG9zZVBvcHVwV2l0aE92ZXJsYXkoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikpIHtcclxuICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX3NhdmVCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19mb3JtLWlucHV0XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlTW9kYWwoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nKSB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuX3NhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX3ByZXZpZXctaW1hZ2VcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuX3ByZXZpZXdUaXRsZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy10aXRsZVwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKGRhdGEpIHtcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UuYWx0ID0gYEEgcGljdHVyZSBvZiAke2RhdGEubmFtZX1gO1xyXG4gICAgdGhpcy5fcHJldmlld1RpdGxlLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgc3VwZXIub3Blbk1vZGFsKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgfVxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihlbGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShpdGVtKSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChpdGVtKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKHsgbmFtZUVsZW1lbnQsIGpvYkVsZW1lbnQgfSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUgPSBuYW1lRWxlbWVudDtcclxuICAgIHRoaXMuX3Byb2ZpbGVKb2IgPSBqb2JFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VyTmFtZTogdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQsXHJcbiAgICAgIHVzZXJKb2I6IHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlckluZm8oZGF0YSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9wcm9maWxlSm9iLnRleHRDb250ZW50ID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgIHRoaXMudXJsID0gY29uZmlnLmJhc2VVcmw7XHJcbiAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcclxuICB9XHJcblxyXG4gIF9jaGVja1NlcnZlclJlc3BvbnNlKHJlcykge1xyXG4gICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c1RleHR9YCk7XHJcbiAgfVxyXG5cclxuICBnZXRJbml0aWFsQ2FyZHMgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L2NhcmRzYCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGdldFByb2ZpbGVEYXRhID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS91c2Vycy9tZWAsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9O1xyXG5cclxuICBnZXRXZWJwYWdlSW5mbygpIHtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRQcm9maWxlRGF0YSgpXSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9maWxlRGF0YSA9IChuYW1lLCBhYm91dCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS91c2Vycy9tZWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgYWJvdXQsXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9O1xyXG5cclxuICBhZGROZXdDYXJkID0gKGRhdGEpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHNgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcclxuICAgICAgICBsaW5rOiBkYXRhLmxpbmssXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9O1xyXG5cclxuICBkZWxldGVDYXJkKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L2NhcmRzLyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfVxyXG5cclxuICBhZGRMaWtlKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L2NhcmRzL2xpa2VzLyR7aWR9YCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVMaWtlKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L2NhcmRzL2xpa2VzLyR7aWR9YCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyQXZhdGFyKGF2YXRhcikge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS91c2Vycy9tZS9hdmF0YXIvYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgYXZhdGFyLFxyXG4gICAgICB9KSxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAvLyBBcGkgY29uZmlnXHJcbi8vIC8vIFRva2VuOiBiOWExYmJjNy05MDQxLTQzNjUtYTMyNy0zODc4MjE2MmZhOGUgR3JvdXAgSUQ6IGdyb3VwLTEyXHJcbi8vIGV4cG9ydCBjb25zdCBhcGlDb25maWcgPSB7XHJcbi8vICAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXHJcbi8vICAgaGVhZGVyczoge1xyXG4vLyAgICAgYXV0aG9yaXphdGlvbjogXCJiOWExYmJjNy05MDQxLTQzNjUtYTMyNy0zODc4MjE2MmZhOGVcIixcclxuLy8gICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4vLyAgIH0sXHJcbi8vIH07XHJcbiIsIi8vcG9wdXBzIGFuZCBidXR0b25zXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRWRpdFBvcHVwRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVFZGl0XCIpO1xyXG5leHBvcnQgY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29wZW5Nb2RhbFwiKTtcclxuZXhwb3J0IGNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29wZW5Nb2RhbDJcIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlTmFtZUlucHV0ID0gcHJvZmlsZUVkaXRQb3B1cEVsLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIubW9kYWxfX2Zvcm0taW5wdXQtbmFtZVwiXHJcbik7XHJcblxyXG4vL2Zvcm1zIGFuZCBpbnB1dHNcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVGb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1mb3JtXCIpO1xyXG5leHBvcnQgY29uc3QgYWRkRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1mb3JtXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZU9jY3VwYXRpb25JbnB1dCA9IHByb2ZpbGVFZGl0UG9wdXBFbC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLm1vZGFsX19mb3JtLWlucHV0LWRlc2NyaXB0aW9uXCJcclxuKTtcclxuZXhwb3J0IGNvbnN0IG5hbWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGV4dFwiKTtcclxuZXhwb3J0IGNvbnN0IGpvYkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcclxuXHJcbi8vLyBjYXJkcyBhcnJheVxyXG5leHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL3lvc2VtaXRlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWtlIExvdWlzZVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWtlLWxvdWlzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvYmFsZC1tb3VudGFpbnMuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGF0ZW1hci5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiVmFub2lzZSBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL3Zhbm9pc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhZ28gZGkgQnJhaWVzXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhZ28uanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbi8vc2VsZWN0b3JzXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XHJcbiAgYWRkRm9ybUVsZW1lbnQ6IFwiI2FkZC1mb3JtXCIsXHJcbiAgcHJvZmlsZUVkaXRQb3B1cEVsOiBcIiNwcm9maWxlRWRpdFwiLFxyXG4gIHByb2ZpbGVGb3JtRWxlbWVudDogXCIjZWRpdC1mb3JtXCIsXHJcbiAgcHJvZmlsZU5hbWVJbnB1dDogXCIubW9kYWxfX2Zvcm0taW5wdXQtbmFtZVwiLFxyXG4gIGVkaXRQcm9maWxlQnV0dG9uOiBcIiNvcGVuTW9kYWxcIixcclxuICBhZGRDYXJkQnV0dG9uOiBcIiNvcGVuTW9kYWwyXCIsXHJcbiAgbmFtZUVsOiBcIi5wcm9maWxlX190ZXh0XCIsXHJcbiAgam9iRWw6IFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIsXHJcbiAgcHJvZmlsZU9jY3VwYXRpb25JbnB1dDogXCIubW9kYWxfX2Zvcm0taW5wdXQtZGVzY3JpcHRpb25cIixcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gSW1wb3J0IG9mIENsYXNzZXNcclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgYWRkRm9ybUVsZW1lbnQsXHJcbiAgcHJvZmlsZUZvcm1FbGVtZW50LFxyXG4gIHByb2ZpbGVOYW1lSW5wdXQsXHJcbiAgZWRpdFByb2ZpbGVCdXR0b24sXHJcbiAgYWRkQ2FyZEJ1dHRvbixcclxuICBuYW1lRWwsXHJcbiAgam9iRWwsXHJcbiAgcHJvZmlsZU9jY3VwYXRpb25JbnB1dCxcclxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0taW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fZm9ybS1idXR0b25fZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2Zvcm0taW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuXHJcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaS5qc1wiO1xyXG5cclxubGV0IGNhcmRMaXN0O1xyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaSh7XHJcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgYXV0aG9yaXphdGlvbjogXCJiOWExYmJjNy05MDQxLTQzNjUtYTMyNy0zODc4MjE2MmZhOGVcIixcclxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuYXBpLmdldEluaXRpYWxDYXJkcygpLnRoZW4oKGluaXRpYWxDYXJkcykgPT4ge1xyXG4gIC8vIENhcmQgTGlzdFxyXG4gIGNhcmRMaXN0ID0gbmV3IFNlY3Rpb24oXHJcbiAgICB7XHJcbiAgICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXHJcbiAgICAgIHJlbmRlcmVyOiAoY2FyZERhdGEpID0+IHtcclxuICAgICAgICBjYXJkID0gcmVuZGVyQ2FyZChjYXJkRGF0YSk7XHJcbiAgICAgICAgY2FyZExpc3QuYWRkSXRlbShjYXJkLmdldFZpZXcoKSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgXCIuY2FyZHNfX2NvbnRhaW5lclwiXHJcbiAgKTtcclxuICBjYXJkTGlzdC5yZW5kZXJJdGVtcygpO1xyXG59KTtcclxuXHJcbi8vIENhcmQgVmFsaWRhdG9yXHJcbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGFkZEZvcm1FbGVtZW50KTtcclxuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vLyBQcm9maWxlIFZhbGlkYXRvclxyXG5jb25zdCBhZGRQcm9maWxlVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBwcm9maWxlRm9ybUVsZW1lbnQpO1xyXG5hZGRQcm9maWxlVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbi8vIFVzZXIgSW5mbyBmb3IgUHJvZmlsZVxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgbmFtZUVsZW1lbnQ6IG5hbWVFbCxcclxuICBqb2JFbGVtZW50OiBqb2JFbCxcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBDYXJkKGNhcmREYXRhLCBcIiNjYXJkVGVtcGxhdGVcIiwge1xyXG4gICAgaGFuZGxlQ2FyZENsaWNrOiAoY2FyZCkgPT4ge1xyXG4gICAgICBwcmV2aWV3UG9wdXAub3Blbk1vZGFsKGNhcmQpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuY29uc3QgcHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI2ltYWdlLXByZXZpZXdcIik7XHJcbnByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuLy9BZGQgY2FyZCBwb3B1cFxyXG5jb25zdCBjYXJkRm9ybVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY2FyZEFkZFwiLCAoZGF0YSkgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSByZW5kZXJDYXJkKGRhdGEpO1xyXG4gIGNhcmRMaXN0LmFkZEl0ZW0oY2FyZC5nZXRWaWV3KCkpO1xyXG4gIGNhcmRGb3JtUG9wdXAuY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuY2FyZEZvcm1Qb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgcHJvZmlsZUVkaXRQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGVFZGl0XCIsIChkYXRhKSA9PiB7XHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YSk7XHJcbiAgcHJvZmlsZUVkaXRQb3B1cC5jbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5wcm9maWxlRWRpdFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4vLyBDYXJkIEJ1dHRvbiBTdGF0ZXNcclxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGFkZENhcmRWYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgY2FyZEZvcm1Qb3B1cC5vcGVuTW9kYWwoKTtcclxufSk7XHJcblxyXG5lZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHByb2ZpbGVOYW1lSW5wdXQudmFsdWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQudmFsdWUgPSBkYXRhLnVzZXJKb2I7XHJcbiAgYWRkUHJvZmlsZVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBwcm9maWxlRWRpdFBvcHVwLm9wZW5Nb2RhbCgpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkc2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfY2FyZEVsZW1lbnQiLCJyZW1vdmUiLCJjYXJkTGlrZUJ1dHRvbiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9saW5rIiwibGluayIsIl9uYW1lIiwibmFtZSIsIl9jYXJkc2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlTGlrZSIsImNhcmREZWxldGVCdXR0b24iLCJfaGFuZGxlRGVsZXRlIiwiX2NhcmRJbWFnZSIsInNyYyIsIl9jYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJhbHQiLCJGb3JtVmFsaWRhdG9yIiwiY29uZmlnIiwiZm9ybUVsZW1lbnQiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybUVsZW1lbnQiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsIiwiZXJyb3JNZXNzYWdlRWwiLCJpZCIsImFkZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiaXNWYWxpZCIsIl9jaGVja0Zvcm1WYWxpZGl0eSIsIl9pbnB1dEVscyIsIl9zdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsImlucHV0cyIsImV2ZXJ5IiwiaW5wdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUlucHV0RXJyb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImV2ZW50IiwiZGlzYWJsZVN1Ym1pdEJ1dHRvbiIsInJlc2V0VmFsaWRhdGlvbiIsImVuYWJsZVZhbGlkYXRpb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2V4aXRCdXR0b24iLCJfaGFuZGxlRXNjVXAiLCJiaW5kIiwiZXZ0Iiwia2V5IiwiY2xvc2VNb2RhbCIsInNldEV2ZW50TGlzdGVuZXJzIiwiX2Nsb3NlUG9wdXBXaXRoT3ZlcmxheSIsIm9wZW5Nb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZVN1Ym1pdCIsIl9mb3JtRWwiLCJfc2F2ZUJ1dHRvbiIsIkFycmF5IiwiZnJvbSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0VmFsdWVzIiwidmFsdWUiLCJyZXNldCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2UiLCJfcHJldmlld1RpdGxlIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJfaXRlbXMiLCJyZW5kZXJJdGVtcyIsImVsZW0iLCJhZGRJdGVtIiwiaXRlbSIsInByZXBlbmQiLCJVc2VySW5mbyIsIm5hbWVFbGVtZW50Iiwiam9iRWxlbWVudCIsIl9wcm9maWxlTmFtZSIsIl9wcm9maWxlSm9iIiwiZ2V0VXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJzZXRVc2VySW5mbyIsImRlc2NyaXB0aW9uIiwiQXBpIiwiZmV0Y2giLCJ1cmwiLCJoZWFkZXJzIiwidGhlbiIsIl9jaGVja1NlcnZlclJlc3BvbnNlIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImJhc2VVcmwiLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzVGV4dCIsImdldFdlYnBhZ2VJbmZvIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0UHJvZmlsZURhdGEiLCJkZWxldGVDYXJkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJzZXRVc2VyQXZhdGFyIiwiYXZhdGFyIiwicHJvZmlsZUVkaXRQb3B1cEVsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJhZGRDYXJkQnV0dG9uIiwicHJvZmlsZU5hbWVJbnB1dCIsInByb2ZpbGVGb3JtRWxlbWVudCIsImFkZEZvcm1FbGVtZW50IiwicHJvZmlsZU9jY3VwYXRpb25JbnB1dCIsIm5hbWVFbCIsImpvYkVsIiwiaW5pdGlhbENhcmRzIiwic2VsZWN0b3JzIiwiY2FyZExpc3QiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY2FyZERhdGEiLCJjYXJkIiwicmVuZGVyQ2FyZCIsImFkZENhcmRWYWxpZGF0b3IiLCJhZGRQcm9maWxlVmFsaWRhdG9yIiwidXNlckluZm8iLCJwcmV2aWV3UG9wdXAiLCJjYXJkRm9ybVBvcHVwIiwicHJvZmlsZUVkaXRQb3B1cCJdLCJzb3VyY2VSb290IjoiIn0=