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
  const cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    items: initialCards,
    renderer: cardData => {
      const card = renderCard(cardData);
      cardList.addItem(card.getView());
    }
  }, ".cards__container");
  cardList.renderItems();
  //Add card popup
  const cardFormPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#cardAdd", data => {
    const card = renderCard(data);
    cardList.addItem(card.getView());
    cardFormPopup.closeModal();
  });
  cardFormPopup.setEventListeners();
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
// const cardFormPopup = new PopupWithForm("#cardAdd", (data) => {
//   const card = renderCard(data);
//   cardList.addItem(card.getView());
//   cardFormPopup.closeModal();
// });
// cardFormPopup.setEventListeners();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLElBQUksQ0FBQztFQUNUQyxXQUFXLENBQUNDLElBQUksRUFBRUMsWUFBWSxRQUF1QjtJQUFBLElBQXJCO01BQUVDO0lBQWdCLENBQUM7SUFBQSx1Q0FPbkMsTUFBTTtNQUNwQixJQUFJLENBQUNDLFlBQVksQ0FBQ0MsTUFBTSxFQUFFO0lBQzVCLENBQUM7SUFBQSxxQ0FFYSxNQUFNO01BQ2xCLElBQUksQ0FBQ0MsY0FBYyxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztJQUM5RCxDQUFDO0lBWkMsSUFBSSxDQUFDQyxLQUFLLEdBQUdSLElBQUksQ0FBQ1MsSUFBSTtJQUN0QixJQUFJLENBQUNDLEtBQUssR0FBR1YsSUFBSSxDQUFDVyxJQUFJO0lBQ3RCLElBQUksQ0FBQ0MsYUFBYSxHQUFHWCxZQUFZO0lBQ2pDLElBQUksQ0FBQ1ksZ0JBQWdCLEdBQUdYLGVBQWU7RUFDekM7RUFVQVksa0JBQWtCLEdBQUc7SUFDbkI7SUFDQSxJQUFJLENBQUNULGNBQWMsR0FBRyxJQUFJLENBQUNGLFlBQVksQ0FBQ1ksYUFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQzNFLElBQUksQ0FBQ1YsY0FBYyxDQUFDVyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDQyxXQUFXLENBQUM7O0lBRS9EO0lBQ0EsTUFBTUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDZixZQUFZLENBQUNZLGFBQWEsQ0FDdEQsc0JBQXNCLENBQ3ZCO0lBQ0RHLGdCQUFnQixDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDRyxhQUFhLENBQUM7O0lBRTlEO0lBQ0EsSUFBSSxDQUFDQyxVQUFVLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQzlDLElBQUksQ0FBQ0gsZ0JBQWdCLENBQUM7UUFDcEJKLElBQUksRUFBRSxJQUFJLENBQUNXLFVBQVUsQ0FBQ0MsR0FBRztRQUN6QlYsSUFBSSxFQUFFLElBQUksQ0FBQ1csVUFBVSxDQUFDQztNQUN4QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUVBQyxPQUFPLEdBQUc7SUFDUixJQUFJLENBQUNyQixZQUFZLEdBQUdzQixRQUFRLENBQ3pCVixhQUFhLENBQUMsSUFBSSxDQUFDSCxhQUFhLENBQUMsQ0FDakNjLE9BQU8sQ0FBQ1gsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUM5QlksU0FBUyxDQUFDLElBQUksQ0FBQztJQUNsQixJQUFJLENBQUNQLFVBQVUsR0FBRyxJQUFJLENBQUNqQixZQUFZLENBQUNZLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDakUsSUFBSSxDQUFDTyxVQUFVLEdBQUcsSUFBSSxDQUFDbkIsWUFBWSxDQUFDWSxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQ2hFLElBQUksQ0FBQ0Qsa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDTSxVQUFVLENBQUNDLEdBQUcsR0FBRyxJQUFJLENBQUNiLEtBQUs7SUFDaEMsSUFBSSxDQUFDWSxVQUFVLENBQUNRLEdBQUcsR0FBRyxJQUFJLENBQUNsQixLQUFLO0lBQ2hDLElBQUksQ0FBQ1ksVUFBVSxDQUFDQyxXQUFXLEdBQUcsSUFBSSxDQUFDYixLQUFLO0lBQ3hDLE9BQU8sSUFBSSxDQUFDUCxZQUFZO0VBQzFCO0FBQ0Y7QUFFQSwrREFBZUwsSUFBSTs7Ozs7Ozs7Ozs7QUNuRG5CLE1BQU0rQixhQUFhLENBQUM7RUFDbEI5QixXQUFXLENBQUMrQixNQUFNLEVBQUVDLFdBQVcsRUFBRTtJQUMvQixJQUFJLENBQUNDLGNBQWMsR0FBR0YsTUFBTSxDQUFDRyxhQUFhO0lBQzFDLElBQUksQ0FBQ0MscUJBQXFCLEdBQUdKLE1BQU0sQ0FBQ0ssb0JBQW9CO0lBQ3hELElBQUksQ0FBQ0Msb0JBQW9CLEdBQUdOLE1BQU0sQ0FBQ08sbUJBQW1CO0lBQ3RELElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdSLE1BQU0sQ0FBQ1MsZUFBZTtJQUM5QyxJQUFJLENBQUNDLFdBQVcsR0FBR1YsTUFBTSxDQUFDVyxVQUFVO0lBQ3BDLElBQUksQ0FBQ0MsWUFBWSxHQUFHWCxXQUFXO0VBQ2pDO0VBRUFZLGVBQWUsQ0FBQ0MsT0FBTyxFQUFFO0lBQ3ZCLE1BQU1DLGNBQWMsR0FBRyxJQUFJLENBQUNILFlBQVksQ0FBQzNCLGFBQWEsQ0FDcEQsR0FBRyxHQUFHNkIsT0FBTyxDQUFDRSxFQUFFLEdBQUcsUUFBUSxDQUM1QjtJQUNERixPQUFPLENBQUN0QyxTQUFTLENBQUN5QyxHQUFHLENBQUMsSUFBSSxDQUFDVCxnQkFBZ0IsQ0FBQztJQUM1Q08sY0FBYyxDQUFDdEIsV0FBVyxHQUFHcUIsT0FBTyxDQUFDSSxpQkFBaUI7SUFDdERILGNBQWMsQ0FBQ3ZDLFNBQVMsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLENBQUNQLFdBQVcsQ0FBQztFQUNoRDtFQUVBUyxlQUFlLENBQUNMLE9BQU8sRUFBRTtJQUN2QixNQUFNQyxjQUFjLEdBQUcsSUFBSSxDQUFDSCxZQUFZLENBQUMzQixhQUFhLENBQ3BELEdBQUcsR0FBRzZCLE9BQU8sQ0FBQ0UsRUFBRSxHQUFHLFFBQVEsQ0FDNUI7SUFDREYsT0FBTyxDQUFDdEMsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDa0MsZ0JBQWdCLENBQUM7SUFDL0NPLGNBQWMsQ0FBQ3RCLFdBQVcsR0FBRyxHQUFHO0lBQ2hDc0IsY0FBYyxDQUFDdkMsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDb0MsV0FBVyxDQUFDO0VBQ25EO0VBRUFVLGtCQUFrQixHQUFHO0lBQ25CLE1BQU1DLE9BQU8sR0FBRyxJQUFJLENBQUNDLGtCQUFrQixDQUFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDO0lBQ3ZELElBQUksQ0FBQ0YsT0FBTyxFQUFFO01BQ1osSUFBSSxDQUFDRyxhQUFhLENBQUNoRCxTQUFTLENBQUN5QyxHQUFHLENBQUMsSUFBSSxDQUFDWCxvQkFBb0IsQ0FBQztNQUMzRCxJQUFJLENBQUNrQixhQUFhLENBQUNDLFFBQVEsR0FBRyxJQUFJO0lBQ3BDLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQ0QsYUFBYSxDQUFDaEQsU0FBUyxDQUFDRixNQUFNLENBQUMsSUFBSSxDQUFDZ0Msb0JBQW9CLENBQUM7TUFDOUQsSUFBSSxDQUFDa0IsYUFBYSxDQUFDQyxRQUFRLEdBQUcsS0FBSztJQUNyQztFQUNGO0VBRUFILGtCQUFrQixDQUFDSSxNQUFNLEVBQUU7SUFDekIsT0FBT0EsTUFBTSxDQUFDQyxLQUFLLENBQUVDLEtBQUssSUFBS0EsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQztFQUN0RDtFQUVBQyxpQkFBaUIsQ0FBQ2pCLE9BQU8sRUFBRTtJQUN6QixJQUFJLENBQUNBLE9BQU8sQ0FBQ2UsUUFBUSxDQUFDQyxLQUFLLEVBQUU7TUFDM0IsSUFBSSxDQUFDakIsZUFBZSxDQUFDQyxPQUFPLENBQUM7SUFDL0IsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDSyxlQUFlLENBQUNMLE9BQU8sQ0FBQztJQUMvQjtFQUNGO0VBRUE5QixrQkFBa0IsR0FBRztJQUNuQixJQUFJLENBQUN1QyxTQUFTLEdBQUcsQ0FDZixHQUFHLElBQUksQ0FBQ1gsWUFBWSxDQUFDb0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOUIsY0FBYyxDQUFDLENBQzNEO0lBQ0QsSUFBSSxDQUFDc0IsYUFBYSxHQUFHLElBQUksQ0FBQ1osWUFBWSxDQUFDM0IsYUFBYSxDQUNsRCxJQUFJLENBQUNtQixxQkFBcUIsQ0FDM0I7SUFDRCxJQUFJLENBQUNtQixTQUFTLENBQUNVLE9BQU8sQ0FBRW5CLE9BQU8sSUFBSztNQUNsQ0EsT0FBTyxDQUFDNUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFHZ0QsS0FBSyxJQUFLO1FBQzNDLElBQUksQ0FBQ0gsaUJBQWlCLENBQUNqQixPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDTSxrQkFBa0IsRUFBRTtNQUMzQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUVBZSxtQkFBbUIsR0FBRztJQUNwQixJQUFJLENBQUNYLGFBQWEsQ0FBQ2hELFNBQVMsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLENBQUNYLG9CQUFvQixDQUFDO0lBQzNELElBQUksQ0FBQ2tCLGFBQWEsQ0FBQ0MsUUFBUSxHQUFHLElBQUk7RUFDcEM7RUFFQVcsZUFBZSxHQUFHO0lBQ2hCLElBQUksQ0FBQ2hCLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0csU0FBUyxDQUFDVSxPQUFPLENBQUVMLEtBQUssSUFBSztNQUNoQyxJQUFJLENBQUNULGVBQWUsQ0FBQ1MsS0FBSyxDQUFDO0lBQzdCLENBQUMsQ0FBQztFQUNKO0VBRUFTLGdCQUFnQixHQUFHO0lBQ2pCLElBQUksQ0FBQ3pCLFlBQVksQ0FBQzFCLGdCQUFnQixDQUFDLFFBQVEsRUFBR29ELENBQUMsSUFBSztNQUNsREEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7SUFDcEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDdkQsa0JBQWtCLEVBQUU7RUFDM0I7QUFDRjtBQUNBLCtEQUFlZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ3JGYixNQUFNeUMsS0FBSyxDQUFDO0VBQ3pCdkUsV0FBVyxDQUFDd0UsYUFBYSxFQUFFO0lBQ3pCLElBQUksQ0FBQ0MsYUFBYSxHQUFHL0MsUUFBUSxDQUFDVixhQUFhLENBQUN3RCxhQUFhLENBQUM7SUFDMUQsSUFBSSxDQUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDRCxhQUFhLENBQUN6RCxhQUFhLENBQUMscUJBQXFCLENBQUM7SUFDMUUsSUFBSSxDQUFDMkQsWUFBWSxHQUFHLElBQUksQ0FBQ0EsWUFBWSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ2xEO0VBRUFELFlBQVksQ0FBQ0UsR0FBRyxFQUFFO0lBQ2hCLElBQUlBLEdBQUcsQ0FBQ0MsR0FBRyxLQUFLLFFBQVEsRUFBRTtNQUN4QixJQUFJLENBQUNDLFVBQVUsRUFBRTtJQUNuQjtFQUNGO0VBRUFDLGlCQUFpQixHQUFHO0lBQ2xCLElBQUksQ0FBQ1AsYUFBYSxDQUFDeEQsZ0JBQWdCLENBQUMsV0FBVyxFQUFHNEQsR0FBRyxJQUNuRCxJQUFJLENBQUNJLHNCQUFzQixDQUFDSixHQUFHLENBQUMsQ0FDakM7SUFDRCxJQUFJLENBQUNILFdBQVcsQ0FBQ3pELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQzhELFVBQVUsRUFBRSxDQUFDO0VBQ3JFO0VBRUFHLFNBQVMsR0FBRztJQUNWLElBQUksQ0FBQ1QsYUFBYSxDQUFDbEUsU0FBUyxDQUFDeUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUNoRHRCLFFBQVEsQ0FBQ1QsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzBELFlBQVksQ0FBQztFQUN6RDtFQUVBSSxVQUFVLEdBQUc7SUFDWCxJQUFJLENBQUNOLGFBQWEsQ0FBQ2xFLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUNuRHFCLFFBQVEsQ0FBQ3lELG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUNSLFlBQVksQ0FBQztFQUM1RDtFQUVBTSxzQkFBc0IsQ0FBQ0osR0FBRyxFQUFFO0lBQzFCLElBQUlBLEdBQUcsQ0FBQ08sTUFBTSxDQUFDN0UsU0FBUyxDQUFDOEUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO01BQ2pELElBQUksQ0FBQ04sVUFBVSxFQUFFO0lBQ25CO0VBQ0Y7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDbkMrQjtBQUVoQixNQUFNTyxhQUFhLFNBQVNmLGlEQUFLLENBQUM7RUFDL0N2RSxXQUFXLENBQUN3RSxhQUFhLEVBQUVlLGdCQUFnQixFQUFFO0lBQzNDLEtBQUssQ0FBQ2YsYUFBYSxDQUFDO0lBQ3BCLElBQUksQ0FBQ2dCLGFBQWEsR0FBR0QsZ0JBQWdCO0lBQ3JDLElBQUksQ0FBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQ2hCLGFBQWEsQ0FBQ3pELGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDL0QsSUFBSSxDQUFDMEUsV0FBVyxHQUFHLElBQUksQ0FBQ0QsT0FBTyxDQUFDekUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BFLElBQUksQ0FBQ3NDLFNBQVMsR0FBR3FDLEtBQUssQ0FBQ0MsSUFBSSxDQUN6QixJQUFJLENBQUNILE9BQU8sQ0FBQzFCLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQ3BEO0VBQ0g7RUFFQThCLGVBQWUsR0FBRztJQUNoQixNQUFNQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ3hDLFNBQVMsQ0FBQ1UsT0FBTyxDQUFFTCxLQUFLLElBQUs7TUFDaENtQyxXQUFXLENBQUNuQyxLQUFLLENBQUMvQyxJQUFJLENBQUMsR0FBRytDLEtBQUssQ0FBQ29DLEtBQUs7SUFDdkMsQ0FBQyxDQUFDO0lBQ0YsT0FBT0QsV0FBVztFQUNwQjtFQUVBZixVQUFVLEdBQUc7SUFDWCxJQUFJLENBQUNVLE9BQU8sQ0FBQ08sS0FBSyxFQUFFO0lBQ3BCLEtBQUssQ0FBQ2pCLFVBQVUsRUFBRTtFQUNwQjtFQUVBa0IsYUFBYSxDQUFDQyxTQUFTLEVBQUU7SUFDdkIsSUFBSUEsU0FBUyxFQUFFO01BQ2IsSUFBSSxDQUFDUixXQUFXLENBQUNsRSxXQUFXLEdBQUcsV0FBVztJQUM1QyxDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNrRSxXQUFXLENBQUNsRSxXQUFXLEdBQUcsTUFBTTtJQUN2QztFQUNGO0VBRUF3RCxpQkFBaUIsR0FBRztJQUNsQixJQUFJLENBQUNTLE9BQU8sQ0FBQ3hFLGdCQUFnQixDQUFDLFFBQVEsRUFBRzRELEdBQUcsSUFBSztNQUMvQ0EsR0FBRyxDQUFDUCxjQUFjLEVBQUU7TUFDcEIsSUFBSSxDQUFDa0IsYUFBYSxDQUFDLElBQUksQ0FBQ0ssZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBQ0YsS0FBSyxDQUFDYixpQkFBaUIsRUFBRTtFQUMzQjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7QUN6QytCO0FBRWhCLE1BQU1tQixjQUFjLFNBQVM1QixpREFBSyxDQUFDO0VBQ2hEdkUsV0FBVyxDQUFDd0UsYUFBYSxFQUFFO0lBQ3pCLEtBQUssQ0FBQ0EsYUFBYSxDQUFDO0lBQ3BCLElBQUksQ0FBQzRCLGFBQWEsR0FBRyxJQUFJLENBQUMzQixhQUFhLENBQUN6RCxhQUFhLENBQ25ELHVCQUF1QixDQUN4QjtJQUNELElBQUksQ0FBQ3FGLGFBQWEsR0FBRyxJQUFJLENBQUM1QixhQUFhLENBQUN6RCxhQUFhLENBQ25ELHVCQUF1QixDQUN4QjtFQUNIO0VBRUFrRSxTQUFTLENBQUNqRixJQUFJLEVBQUU7SUFDZCxJQUFJLENBQUNtRyxhQUFhLENBQUM5RSxHQUFHLEdBQUdyQixJQUFJLENBQUNTLElBQUk7SUFDbEMsSUFBSSxDQUFDMEYsYUFBYSxDQUFDdkUsR0FBRyxHQUFJLGdCQUFlNUIsSUFBSSxDQUFDVyxJQUFLLEVBQUM7SUFDcEQsSUFBSSxDQUFDeUYsYUFBYSxDQUFDN0UsV0FBVyxHQUFHdkIsSUFBSSxDQUFDVyxJQUFJO0lBQzFDLEtBQUssQ0FBQ3NFLFNBQVMsRUFBRTtFQUNuQjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQ25CZSxNQUFNb0IsT0FBTyxDQUFDO0VBQzNCdEcsV0FBVyxPQUFzQnVHLFFBQVEsRUFBRTtJQUFBLElBQS9CO01BQUVDLEtBQUs7TUFBRUM7SUFBUyxDQUFDO0lBQzdCLElBQUksQ0FBQ0MsU0FBUyxHQUFHRCxRQUFRO0lBQ3pCLElBQUksQ0FBQ0UsVUFBVSxHQUFHakYsUUFBUSxDQUFDVixhQUFhLENBQUN1RixRQUFRLENBQUM7SUFDbEQsSUFBSSxDQUFDSyxNQUFNLEdBQUdKLEtBQUs7RUFDckI7RUFDQUssV0FBVyxHQUFHO0lBQ1osSUFBSSxDQUFDRCxNQUFNLENBQUM1QyxPQUFPLENBQUU4QyxJQUFJLElBQUs7TUFDNUIsSUFBSSxDQUFDSixTQUFTLENBQUNJLElBQUksQ0FBQztJQUN0QixDQUFDLENBQUM7RUFDSjtFQUVBQyxPQUFPLENBQUNDLElBQUksRUFBRTtJQUNaLElBQUksQ0FBQ0wsVUFBVSxDQUFDTSxPQUFPLENBQUNELElBQUksQ0FBQztFQUMvQjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQ2ZlLE1BQU1FLFFBQVEsQ0FBQztFQUM1QmxILFdBQVcsT0FBOEI7SUFBQSxJQUE3QjtNQUFFbUgsV0FBVztNQUFFQztJQUFXLENBQUM7SUFDckMsSUFBSSxDQUFDQyxZQUFZLEdBQUdGLFdBQVc7SUFDL0IsSUFBSSxDQUFDRyxXQUFXLEdBQUdGLFVBQVU7RUFDL0I7RUFFQUcsV0FBVyxHQUFHO0lBQ1osT0FBTztNQUNMQyxRQUFRLEVBQUUsSUFBSSxDQUFDSCxZQUFZLENBQUM3RixXQUFXO01BQ3ZDaUcsT0FBTyxFQUFFLElBQUksQ0FBQ0gsV0FBVyxDQUFDOUY7SUFDNUIsQ0FBQztFQUNIO0VBRUFrRyxXQUFXLENBQUN6SCxJQUFJLEVBQUU7SUFDaEIsSUFBSSxDQUFDb0gsWUFBWSxDQUFDN0YsV0FBVyxHQUFHdkIsSUFBSSxDQUFDVyxJQUFJO0lBQ3pDLElBQUksQ0FBQzBHLFdBQVcsQ0FBQzlGLFdBQVcsR0FBR3ZCLElBQUksQ0FBQzBILFdBQVc7RUFDakQ7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQmUsTUFBTUMsR0FBRyxDQUFDO0VBQ3ZCNUgsV0FBVyxDQUFDK0IsTUFBTSxFQUFFO0lBQUEseUNBU0YsTUFBTTtNQUN0QixPQUFPOEYsS0FBSyxDQUFFLEdBQUUsSUFBSSxDQUFDQyxHQUFJLFFBQU8sRUFBRTtRQUNoQ0MsT0FBTyxFQUFFLElBQUksQ0FBQ0E7TUFDaEIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNDLG9CQUFvQixDQUFDO0lBQ3BDLENBQUM7SUFBQSx3Q0FFZ0IsTUFBTTtNQUNyQixPQUFPSixLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksV0FBVSxFQUFFO1FBQ25DQyxPQUFPLEVBQUUsSUFBSSxDQUFDQTtNQUNoQixDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUFBLDJDQU1tQixDQUFDckgsSUFBSSxFQUFFc0gsS0FBSyxLQUFLO01BQ25DLE9BQU9MLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxXQUFVLEVBQUU7UUFDbkNLLE1BQU0sRUFBRSxPQUFPO1FBQ2ZKLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU87UUFDckJLLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUM7VUFDbkIxSCxJQUFJO1VBQ0pzSDtRQUNGLENBQUM7TUFDSCxDQUFDLENBQUMsQ0FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUFBLG9DQUVhaEksSUFBSSxJQUFLO01BQ3JCLE9BQU80SCxLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksUUFBTyxFQUFFO1FBQ2hDSyxNQUFNLEVBQUUsTUFBTTtRQUNkSixPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO1FBQ3JCSyxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDO1VBQ25CMUgsSUFBSSxFQUFFWCxJQUFJLENBQUNXLElBQUk7VUFDZkYsSUFBSSxFQUFFVCxJQUFJLENBQUNTO1FBQ2IsQ0FBQztNQUNILENBQUMsQ0FBQyxDQUFDc0gsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQTVDQyxJQUFJLENBQUNILEdBQUcsR0FBRy9GLE1BQU0sQ0FBQ3dHLE9BQU87SUFDekIsSUFBSSxDQUFDUixPQUFPLEdBQUdoRyxNQUFNLENBQUNnRyxPQUFPO0VBQy9CO0VBRUFFLG9CQUFvQixDQUFDTyxHQUFHLEVBQUU7SUFDeEIsT0FBT0EsR0FBRyxDQUFDQyxFQUFFLEdBQUdELEdBQUcsQ0FBQ0UsSUFBSSxFQUFFLEdBQUdDLE9BQU8sQ0FBQ0MsTUFBTSxDQUFFLFVBQVNKLEdBQUcsQ0FBQ0ssVUFBVyxFQUFDLENBQUM7RUFDekU7RUFjQUMsY0FBYyxHQUFHO0lBQ2YsT0FBT0gsT0FBTyxDQUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUNDLGVBQWUsRUFBRSxFQUFFLElBQUksQ0FBQ0MsY0FBYyxFQUFFLENBQUMsQ0FBQztFQUNyRTtFQXdCQUMsVUFBVSxDQUFDbkcsRUFBRSxFQUFFO0lBQ2IsT0FBTzhFLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxVQUFTL0UsRUFBRyxFQUFDLEVBQUU7TUFDdENvRixNQUFNLEVBQUUsUUFBUTtNQUNoQkosT0FBTyxFQUFFLElBQUksQ0FBQ0E7SUFDaEIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNDLG9CQUFvQixDQUFDO0VBQ3BDO0VBRUFrQixPQUFPLENBQUNwRyxFQUFFLEVBQUU7SUFDVixPQUFPOEUsS0FBSyxDQUFFLEdBQUUsSUFBSSxDQUFDQyxHQUFJLGdCQUFlL0UsRUFBRyxFQUFDLEVBQUU7TUFDNUNnRixPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO01BQ3JCSSxNQUFNLEVBQUU7SUFDVixDQUFDLENBQUMsQ0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7RUFDcEM7RUFFQW1CLFVBQVUsQ0FBQ3JHLEVBQUUsRUFBRTtJQUNiLE9BQU84RSxLQUFLLENBQUUsR0FBRSxJQUFJLENBQUNDLEdBQUksZ0JBQWUvRSxFQUFHLEVBQUMsRUFBRTtNQUM1Q2dGLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU87TUFDckJJLE1BQU0sRUFBRTtJQUNWLENBQUMsQ0FBQyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQztFQUNwQztFQUVBb0IsYUFBYSxDQUFDQyxNQUFNLEVBQUU7SUFDcEIsT0FBT3pCLEtBQUssQ0FBRSxHQUFFLElBQUksQ0FBQ0MsR0FBSSxtQkFBa0IsRUFBRTtNQUMzQ0ssTUFBTSxFQUFFLE9BQU87TUFDZkosT0FBTyxFQUFFLElBQUksQ0FBQ0EsT0FBTztNQUNyQkssSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztRQUNuQmdCO01BQ0YsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQ0Msb0JBQW9CLENBQUM7RUFDcEM7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUNPLE1BQU1zQixrQkFBa0IsR0FBRzdILFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUNqRSxNQUFNd0ksaUJBQWlCLEdBQUc5SCxRQUFRLENBQUNWLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDOUQsTUFBTXlJLGFBQWEsR0FBRy9ILFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUMzRCxNQUFNMEksZ0JBQWdCLEdBQUdILGtCQUFrQixDQUFDdkksYUFBYSxDQUM5RCx5QkFBeUIsQ0FDMUI7O0FBRUQ7QUFDTyxNQUFNMkksa0JBQWtCLEdBQUdqSSxRQUFRLENBQUNWLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDL0QsTUFBTTRJLGNBQWMsR0FBR2xJLFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUMxRCxNQUFNNkksc0JBQXNCLEdBQUdOLGtCQUFrQixDQUFDdkksYUFBYSxDQUNwRSxnQ0FBZ0MsQ0FDakM7QUFDTSxNQUFNOEksTUFBTSxHQUFHcEksUUFBUSxDQUFDVixhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDdkQsTUFBTStJLEtBQUssR0FBR3JJLFFBQVEsQ0FBQ1YsYUFBYSxDQUFDLHVCQUF1QixDQUFDOztBQUVwRTtBQUNPLE1BQU1nSixZQUFZLEdBQUcsQ0FDMUI7RUFDRXBKLElBQUksRUFBRSxpQkFBaUI7RUFDdkJGLElBQUksRUFBRTtBQUNSLENBQUMsRUFDRDtFQUNFRSxJQUFJLEVBQUUsYUFBYTtFQUNuQkYsSUFBSSxFQUFFO0FBQ1IsQ0FBQyxFQUNEO0VBQ0VFLElBQUksRUFBRSxnQkFBZ0I7RUFDdEJGLElBQUksRUFBRTtBQUNSLENBQUMsRUFDRDtFQUNFRSxJQUFJLEVBQUUsU0FBUztFQUNmRixJQUFJLEVBQUU7QUFDUixDQUFDLEVBQ0Q7RUFDRUUsSUFBSSxFQUFFLHVCQUF1QjtFQUM3QkYsSUFBSSxFQUFFO0FBQ1IsQ0FBQyxFQUNEO0VBQ0VFLElBQUksRUFBRSxnQkFBZ0I7RUFDdEJGLElBQUksRUFBRTtBQUNSLENBQUMsQ0FDRjs7QUFFRDtBQUNPLE1BQU11SixTQUFTLEdBQUc7RUFDdkJMLGNBQWMsRUFBRSxXQUFXO0VBQzNCTCxrQkFBa0IsRUFBRSxjQUFjO0VBQ2xDSSxrQkFBa0IsRUFBRSxZQUFZO0VBQ2hDRCxnQkFBZ0IsRUFBRSx5QkFBeUI7RUFDM0NGLGlCQUFpQixFQUFFLFlBQVk7RUFDL0JDLGFBQWEsRUFBRSxhQUFhO0VBQzVCSyxNQUFNLEVBQUUsZ0JBQWdCO0VBQ3hCQyxLQUFLLEVBQUUsdUJBQXVCO0VBQzlCRixzQkFBc0IsRUFBRTtBQUMxQixDQUFDOzs7Ozs7Ozs7OztBQ3hERDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMkQ7QUFDbEI7QUFDcEI7QUFDNEI7QUFDWTtBQUNGO0FBQ1o7QUFVaEI7QUFFL0IsTUFBTTlILE1BQU0sR0FBRztFQUNiRyxhQUFhLEVBQUUsb0JBQW9CO0VBQ25DRSxvQkFBb0IsRUFBRSxxQkFBcUI7RUFDM0NFLG1CQUFtQixFQUFFLDZCQUE2QjtFQUNsREUsZUFBZSxFQUFFLDhCQUE4QjtFQUMvQ0UsVUFBVSxFQUFFO0FBQ2QsQ0FBQztBQUVpQztBQUVsQyxJQUFJd0gsUUFBUTtBQUVaLE1BQU1DLEdBQUcsR0FBRyxJQUFJdkMscURBQUcsQ0FBQztFQUNsQlcsT0FBTyxFQUFFLDZDQUE2QztFQUN0RFIsT0FBTyxFQUFFO0lBQ1BxQyxhQUFhLEVBQUUsc0NBQXNDO0lBQ3JELGNBQWMsRUFBRTtFQUNsQjtBQUNGLENBQUMsQ0FBQztBQUVGRCxHQUFHLENBQUNuQixlQUFlLEVBQUUsQ0FBQ2hCLElBQUksQ0FBRWdDLFlBQVksSUFBSztFQUMzQztFQUNBLE1BQU1FLFFBQVEsR0FBRyxJQUFJNUQsOERBQU8sQ0FDMUI7SUFDRUUsS0FBSyxFQUFFd0QsWUFBWTtJQUNuQnZELFFBQVEsRUFBRzRELFFBQVEsSUFBSztNQUN0QixNQUFNQyxJQUFJLEdBQUdDLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDO01BQ2pDSCxRQUFRLENBQUNuRCxPQUFPLENBQUN1RCxJQUFJLENBQUM3SSxPQUFPLEVBQUUsQ0FBQztJQUNsQztFQUNGLENBQUMsRUFDRCxtQkFBbUIsQ0FDcEI7RUFDRHlJLFFBQVEsQ0FBQ3JELFdBQVcsRUFBRTtFQUN0QjtFQUNBLE1BQU0yRCxhQUFhLEdBQUcsSUFBSWxGLG9FQUFhLENBQUMsVUFBVSxFQUFHckYsSUFBSSxJQUFLO0lBQzVELE1BQU1xSyxJQUFJLEdBQUdDLFVBQVUsQ0FBQ3RLLElBQUksQ0FBQztJQUM3QmlLLFFBQVEsQ0FBQ25ELE9BQU8sQ0FBQ3VELElBQUksQ0FBQzdJLE9BQU8sRUFBRSxDQUFDO0lBQ2hDK0ksYUFBYSxDQUFDekYsVUFBVSxFQUFFO0VBQzVCLENBQUMsQ0FBQztFQUNGeUYsYUFBYSxDQUFDeEYsaUJBQWlCLEVBQUU7QUFDbkMsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTXlGLGdCQUFnQixHQUFHLElBQUkzSSxvRUFBYSxDQUFDQyxNQUFNLEVBQUU2SCwrREFBYyxDQUFDO0FBQ2xFYSxnQkFBZ0IsQ0FBQ3JHLGdCQUFnQixFQUFFOztBQUVuQztBQUNBLE1BQU1zRyxtQkFBbUIsR0FBRyxJQUFJNUksb0VBQWEsQ0FBQ0MsTUFBTSxFQUFFNEgsbUVBQWtCLENBQUM7QUFDekVlLG1CQUFtQixDQUFDdEcsZ0JBQWdCLEVBQUU7O0FBRXRDO0FBQ0EsTUFBTXVHLFFBQVEsR0FBRyxJQUFJekQsK0RBQVEsQ0FBQztFQUM1QkMsV0FBVyxFQUFFMkMsdURBQU07RUFDbkIxQyxVQUFVLEVBQUUyQyxzREFBS0E7QUFDbkIsQ0FBQyxDQUFDO0FBRUYsU0FBU1EsVUFBVSxDQUFDRixRQUFRLEVBQUU7RUFDNUIsT0FBTyxJQUFJdEssMkRBQUksQ0FBQ3NLLFFBQVEsRUFBRSxlQUFlLEVBQUU7SUFDekNsSyxlQUFlLEVBQUdtSyxJQUFJLElBQUs7TUFDekJNLFlBQVksQ0FBQzFGLFNBQVMsQ0FBQ29GLElBQUksQ0FBQztJQUM5QjtFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUEsTUFBTU0sWUFBWSxHQUFHLElBQUl6RSxxRUFBYyxDQUFDLGdCQUFnQixDQUFDO0FBQ3pEeUUsWUFBWSxDQUFDNUYsaUJBQWlCLEVBQUU7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU02RixnQkFBZ0IsR0FBRyxJQUFJdkYsb0VBQWEsQ0FBQyxjQUFjLEVBQUdyRixJQUFJLElBQUs7RUFDbkUwSyxRQUFRLENBQUNqRCxXQUFXLENBQUN6SCxJQUFJLENBQUM7RUFDMUI0SyxnQkFBZ0IsQ0FBQzlGLFVBQVUsRUFBRTtBQUMvQixDQUFDLENBQUM7QUFDRjhGLGdCQUFnQixDQUFDN0YsaUJBQWlCLEVBQUU7O0FBRXBDO0FBQ0F5RSwrRUFBOEIsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUM1Q2dCLGdCQUFnQixDQUFDdEcsZUFBZSxFQUFFO0VBQ2xDcUcsYUFBYSxDQUFDdEYsU0FBUyxFQUFFO0FBQzNCLENBQUMsQ0FBQztBQUVGc0UsbUZBQWtDLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDaEQsTUFBTXZKLElBQUksR0FBRzBLLFFBQVEsQ0FBQ3BELFdBQVcsRUFBRTtFQUNuQ21DLHVFQUFzQixHQUFHekosSUFBSSxDQUFDdUgsUUFBUTtFQUN0Q3FDLDZFQUE0QixHQUFHNUosSUFBSSxDQUFDd0gsT0FBTztFQUMzQ2lELG1CQUFtQixDQUFDdkcsZUFBZSxFQUFFO0VBQ3JDMEcsZ0JBQWdCLENBQUMzRixTQUFTLEVBQUU7QUFDOUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvdXRpbHMvQXBpLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9wYWdlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkc2VsZWN0b3IsIHsgaGFuZGxlQ2FyZENsaWNrIH0pIHtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fY2FyZHNlbGVjdG9yID0gY2FyZHNlbGVjdG9yO1xyXG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZURlbGV0ZSA9ICgpID0+IHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xyXG4gIH07XHJcblxyXG4gIF9oYW5kbGVMaWtlID0gKCkgPT4ge1xyXG4gICAgdGhpcy5jYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fb25cIik7XHJcbiAgfTtcclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgLy8gbGlrZSBidXR0b25cclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5jYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlTGlrZSk7XHJcblxyXG4gICAgLy8gZGVsZXRlIGNhcmQgYnV0dG9uXHJcbiAgICBjb25zdCBjYXJkRGVsZXRlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiXHJcbiAgICApO1xyXG4gICAgY2FyZERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlRGVsZXRlKTtcclxuXHJcbiAgICAvL2xpc3RlbiBmb3IgY2FyZCBpbWFnZSBjbGlja1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayh7XHJcbiAgICAgICAgbGluazogdGhpcy5fY2FyZEltYWdlLnNyYyxcclxuICAgICAgICBuYW1lOiB0aGlzLl9jYXJkVGl0bGUudGV4dENvbnRlbnQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkc2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxyXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2NhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGV4dFwiKTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xyXG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBjb25maWcuZXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNcIiArIGlucHV0RWwuaWQgKyBcIi1lcnJvclwiXHJcbiAgICApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjXCIgKyBpbnB1dEVsLmlkICsgXCItZXJyb3JcIlxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBcIiBcIjtcclxuICAgIGVycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5fY2hlY2tGb3JtVmFsaWRpdHkodGhpcy5faW5wdXRFbHMpO1xyXG4gICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2NoZWNrRm9ybVZhbGlkaXR5KGlucHV0cykge1xyXG4gICAgcmV0dXJuIGlucHV0cy5ldmVyeSgoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5faW5wdXRFbHMgPSBbXHJcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XHJcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUlucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc2FibGVTdWJtaXRCdXR0b24oKSB7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZXNldFZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbiA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19leGl0LWJ1dHRvblwiKTtcclxuICAgIHRoaXMuX2hhbmRsZUVzY1VwID0gdGhpcy5faGFuZGxlRXNjVXAuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVFc2NVcChldnQpIHtcclxuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PlxyXG4gICAgICB0aGlzLl9jbG9zZVBvcHVwV2l0aE92ZXJsYXkoZXZ0KVxyXG4gICAgKTtcclxuICAgIHRoaXMuX2V4aXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2VNb2RhbCgpKTtcclxuICB9XHJcblxyXG4gIG9wZW5Nb2RhbCgpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjVXApO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VNb2RhbCgpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjVXApO1xyXG4gIH1cclxuXHJcbiAgX2Nsb3NlUG9wdXBXaXRoT3ZlcmxheShldnQpIHtcclxuICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX29wZW5lZFwiKSkge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5faGFuZGxlU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcclxuICAgIHRoaXMuX2Zvcm1FbCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xyXG4gICAgdGhpcy5fc2F2ZUJ1dHRvbiA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gQXJyYXkuZnJvbShcclxuICAgICAgdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2Zvcm0taW5wdXRcIilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgaW5wdXRWYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlucHV0VmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VNb2RhbCgpIHtcclxuICAgIHRoaXMuX2Zvcm1FbC5yZXNldCgpO1xyXG4gICAgc3VwZXIuY2xvc2VNb2RhbCgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcpIHtcclxuICAgIGlmIChpc0xvYWRpbmcpIHtcclxuICAgICAgdGhpcy5fc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcclxuICAgIH0pO1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy1pbWFnZVwiXHJcbiAgICApO1xyXG4gICAgdGhpcy5fcHJldmlld1RpdGxlID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLm1vZGFsX19wcmV2aWV3LXRpdGxlXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvcGVuTW9kYWwoZGF0YSkge1xyXG4gICAgdGhpcy5fcHJldmlld0ltYWdlLnNyYyA9IGRhdGEubGluaztcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZS5hbHQgPSBgQSBwaWN0dXJlIG9mICR7ZGF0YS5uYW1lfWA7XHJcbiAgICB0aGlzLl9wcmV2aWV3VGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICBzdXBlci5vcGVuTW9kYWwoKTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBzZWxlY3Rvcikge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICB9XHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGVsZW0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGl0ZW0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgY29uc3RydWN0b3IoeyBuYW1lRWxlbWVudCwgam9iRWxlbWVudCB9KSB7XHJcbiAgICB0aGlzLl9wcm9maWxlTmFtZSA9IG5hbWVFbGVtZW50O1xyXG4gICAgdGhpcy5fcHJvZmlsZUpvYiA9IGpvYkVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVzZXJOYW1lOiB0aGlzLl9wcm9maWxlTmFtZS50ZXh0Q29udGVudCxcclxuICAgICAgdXNlckpvYjogdGhpcy5fcHJvZmlsZUpvYi50ZXh0Q29udGVudCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRVc2VySW5mbyhkYXRhKSB7XHJcbiAgICB0aGlzLl9wcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQgPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgdGhpcy51cmwgPSBjb25maWcuYmFzZVVybDtcclxuICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKSB7XHJcbiAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzVGV4dH1gKTtcclxuICB9XHJcblxyXG4gIGdldEluaXRpYWxDYXJkcyA9ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHNgLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvZmlsZURhdGEgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lYCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGdldFdlYnBhZ2VJbmZvKCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFByb2ZpbGVEYXRhKCldKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2ZpbGVEYXRhID0gKG5hbWUsIGFib3V0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhYm91dCxcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGFkZE5ld0NhcmQgPSAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS9jYXJkc2AsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxyXG4gICAgICAgIGxpbms6IGRhdGEubGluayxcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGRlbGV0ZUNhcmQoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIGFkZExpa2UoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvbGlrZXMvJHtpZH1gLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUxpa2UoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvbGlrZXMvJHtpZH1gLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJBdmF0YXIoYXZhdGFyKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lL2F2YXRhci9gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBhdmF0YXIsXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIC8vIEFwaSBjb25maWdcclxuLy8gLy8gVG9rZW46IGI5YTFiYmM3LTkwNDEtNDM2NS1hMzI3LTM4NzgyMTYyZmE4ZSBHcm91cCBJRDogZ3JvdXAtMTJcclxuLy8gZXhwb3J0IGNvbnN0IGFwaUNvbmZpZyA9IHtcclxuLy8gICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcclxuLy8gICBoZWFkZXJzOiB7XHJcbi8vICAgICBhdXRob3JpemF0aW9uOiBcImI5YTFiYmM3LTkwNDEtNDM2NS1hMzI3LTM4NzgyMTYyZmE4ZVwiLFxyXG4vLyAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbi8vICAgfSxcclxuLy8gfTtcclxuIiwiLy9wb3B1cHMgYW5kIGJ1dHRvbnNcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVFZGl0UG9wdXBFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZUVkaXRcIik7XHJcbmV4cG9ydCBjb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3Blbk1vZGFsXCIpO1xyXG5leHBvcnQgY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3Blbk1vZGFsMlwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVOYW1lSW5wdXQgPSBwcm9maWxlRWRpdFBvcHVwRWwucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fZm9ybS1pbnB1dC1uYW1lXCJcclxuKTtcclxuXHJcbi8vZm9ybXMgYW5kIGlucHV0c1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWZvcm1cIik7XHJcbmV4cG9ydCBjb25zdCBhZGRGb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWZvcm1cIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlT2NjdXBhdGlvbklucHV0ID0gcHJvZmlsZUVkaXRQb3B1cEVsLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIubW9kYWxfX2Zvcm0taW5wdXQtZGVzY3JpcHRpb25cIlxyXG4pO1xyXG5leHBvcnQgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190ZXh0XCIpO1xyXG5leHBvcnQgY29uc3Qgam9iRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5cclxuLy8vIGNhcmRzIGFycmF5XHJcbmV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogXCJZb3NlbWl0ZSBWYWxsZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvdmFub2lzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuLy9zZWxlY3RvcnNcclxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcclxuICBhZGRGb3JtRWxlbWVudDogXCIjYWRkLWZvcm1cIixcclxuICBwcm9maWxlRWRpdFBvcHVwRWw6IFwiI3Byb2ZpbGVFZGl0XCIsXHJcbiAgcHJvZmlsZUZvcm1FbGVtZW50OiBcIiNlZGl0LWZvcm1cIixcclxuICBwcm9maWxlTmFtZUlucHV0OiBcIi5tb2RhbF9fZm9ybS1pbnB1dC1uYW1lXCIsXHJcbiAgZWRpdFByb2ZpbGVCdXR0b246IFwiI29wZW5Nb2RhbFwiLFxyXG4gIGFkZENhcmRCdXR0b246IFwiI29wZW5Nb2RhbDJcIixcclxuICBuYW1lRWw6IFwiLnByb2ZpbGVfX3RleHRcIixcclxuICBqb2JFbDogXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIixcclxuICBwcm9maWxlT2NjdXBhdGlvbklucHV0OiBcIi5tb2RhbF9fZm9ybS1pbnB1dC1kZXNjcmlwdGlvblwiLFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBJbXBvcnQgb2YgQ2xhc3Nlc1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcclxuaW1wb3J0IHtcclxuICBhZGRGb3JtRWxlbWVudCxcclxuICBwcm9maWxlRm9ybUVsZW1lbnQsXHJcbiAgcHJvZmlsZU5hbWVJbnB1dCxcclxuICBlZGl0UHJvZmlsZUJ1dHRvbixcclxuICBhZGRDYXJkQnV0dG9uLFxyXG4gIG5hbWVFbCxcclxuICBqb2JFbCxcclxuICBwcm9maWxlT2NjdXBhdGlvbklucHV0LFxyXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybS1pbnB1dFwiLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybS1idXR0b25cIixcclxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19mb3JtLWJ1dHRvbl9kaXNhYmxlZFwiLFxyXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9fZm9ybS1pbnB1dF90eXBlX2Vycm9yXCIsXHJcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxyXG59O1xyXG5cclxuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XHJcblxyXG5sZXQgY2FyZExpc3Q7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcclxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcclxuICBoZWFkZXJzOiB7XHJcbiAgICBhdXRob3JpemF0aW9uOiBcImI5YTFiYmM3LTkwNDEtNDM2NS1hMzI3LTM4NzgyMTYyZmE4ZVwiLFxyXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG5hcGkuZ2V0SW5pdGlhbENhcmRzKCkudGhlbigoaW5pdGlhbENhcmRzKSA9PiB7XHJcbiAgLy8gQ2FyZCBMaXN0XHJcbiAgY29uc3QgY2FyZExpc3QgPSBuZXcgU2VjdGlvbihcclxuICAgIHtcclxuICAgICAgaXRlbXM6IGluaXRpYWxDYXJkcyxcclxuICAgICAgcmVuZGVyZXI6IChjYXJkRGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcmQgPSByZW5kZXJDYXJkKGNhcmREYXRhKTtcclxuICAgICAgICBjYXJkTGlzdC5hZGRJdGVtKGNhcmQuZ2V0VmlldygpKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBcIi5jYXJkc19fY29udGFpbmVyXCJcclxuICApO1xyXG4gIGNhcmRMaXN0LnJlbmRlckl0ZW1zKCk7XHJcbiAgLy9BZGQgY2FyZCBwb3B1cFxyXG4gIGNvbnN0IGNhcmRGb3JtUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjYXJkQWRkXCIsIChkYXRhKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZChkYXRhKTtcclxuICAgIGNhcmRMaXN0LmFkZEl0ZW0oY2FyZC5nZXRWaWV3KCkpO1xyXG4gICAgY2FyZEZvcm1Qb3B1cC5jbG9zZU1vZGFsKCk7XHJcbiAgfSk7XHJcbiAgY2FyZEZvcm1Qb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG59KTtcclxuXHJcbi8vIENhcmQgVmFsaWRhdG9yXHJcbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGFkZEZvcm1FbGVtZW50KTtcclxuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vLyBQcm9maWxlIFZhbGlkYXRvclxyXG5jb25zdCBhZGRQcm9maWxlVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBwcm9maWxlRm9ybUVsZW1lbnQpO1xyXG5hZGRQcm9maWxlVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbi8vIFVzZXIgSW5mbyBmb3IgUHJvZmlsZVxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgbmFtZUVsZW1lbnQ6IG5hbWVFbCxcclxuICBqb2JFbGVtZW50OiBqb2JFbCxcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBDYXJkKGNhcmREYXRhLCBcIiNjYXJkVGVtcGxhdGVcIiwge1xyXG4gICAgaGFuZGxlQ2FyZENsaWNrOiAoY2FyZCkgPT4ge1xyXG4gICAgICBwcmV2aWV3UG9wdXAub3Blbk1vZGFsKGNhcmQpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuY29uc3QgcHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI2ltYWdlLXByZXZpZXdcIik7XHJcbnByZXZpZXdQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuLy9BZGQgY2FyZCBwb3B1cFxyXG4vLyBjb25zdCBjYXJkRm9ybVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY2FyZEFkZFwiLCAoZGF0YSkgPT4ge1xyXG4vLyAgIGNvbnN0IGNhcmQgPSByZW5kZXJDYXJkKGRhdGEpO1xyXG4vLyAgIGNhcmRMaXN0LmFkZEl0ZW0oY2FyZC5nZXRWaWV3KCkpO1xyXG4vLyAgIGNhcmRGb3JtUG9wdXAuY2xvc2VNb2RhbCgpO1xyXG4vLyB9KTtcclxuLy8gY2FyZEZvcm1Qb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgcHJvZmlsZUVkaXRQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGVFZGl0XCIsIChkYXRhKSA9PiB7XHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YSk7XHJcbiAgcHJvZmlsZUVkaXRQb3B1cC5jbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5wcm9maWxlRWRpdFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4vLyBDYXJkIEJ1dHRvbiBTdGF0ZXNcclxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGFkZENhcmRWYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgY2FyZEZvcm1Qb3B1cC5vcGVuTW9kYWwoKTtcclxufSk7XHJcblxyXG5lZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHByb2ZpbGVOYW1lSW5wdXQudmFsdWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQudmFsdWUgPSBkYXRhLnVzZXJKb2I7XHJcbiAgYWRkUHJvZmlsZVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBwcm9maWxlRWRpdFBvcHVwLm9wZW5Nb2RhbCgpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkc2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfY2FyZEVsZW1lbnQiLCJyZW1vdmUiLCJjYXJkTGlrZUJ1dHRvbiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9saW5rIiwibGluayIsIl9uYW1lIiwibmFtZSIsIl9jYXJkc2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlTGlrZSIsImNhcmREZWxldGVCdXR0b24iLCJfaGFuZGxlRGVsZXRlIiwiX2NhcmRJbWFnZSIsInNyYyIsIl9jYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJhbHQiLCJGb3JtVmFsaWRhdG9yIiwiY29uZmlnIiwiZm9ybUVsZW1lbnQiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybUVsZW1lbnQiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsIiwiZXJyb3JNZXNzYWdlRWwiLCJpZCIsImFkZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiaXNWYWxpZCIsIl9jaGVja0Zvcm1WYWxpZGl0eSIsIl9pbnB1dEVscyIsIl9zdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsImlucHV0cyIsImV2ZXJ5IiwiaW5wdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUlucHV0RXJyb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImV2ZW50IiwiZGlzYWJsZVN1Ym1pdEJ1dHRvbiIsInJlc2V0VmFsaWRhdGlvbiIsImVuYWJsZVZhbGlkYXRpb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2V4aXRCdXR0b24iLCJfaGFuZGxlRXNjVXAiLCJiaW5kIiwiZXZ0Iiwia2V5IiwiY2xvc2VNb2RhbCIsInNldEV2ZW50TGlzdGVuZXJzIiwiX2Nsb3NlUG9wdXBXaXRoT3ZlcmxheSIsIm9wZW5Nb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZVN1Ym1pdCIsIl9mb3JtRWwiLCJfc2F2ZUJ1dHRvbiIsIkFycmF5IiwiZnJvbSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0VmFsdWVzIiwidmFsdWUiLCJyZXNldCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJQb3B1cFdpdGhJbWFnZSIsIl9wcmV2aWV3SW1hZ2UiLCJfcHJldmlld1RpdGxlIiwiU2VjdGlvbiIsInNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJfaXRlbXMiLCJyZW5kZXJJdGVtcyIsImVsZW0iLCJhZGRJdGVtIiwiaXRlbSIsInByZXBlbmQiLCJVc2VySW5mbyIsIm5hbWVFbGVtZW50Iiwiam9iRWxlbWVudCIsIl9wcm9maWxlTmFtZSIsIl9wcm9maWxlSm9iIiwiZ2V0VXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJzZXRVc2VySW5mbyIsImRlc2NyaXB0aW9uIiwiQXBpIiwiZmV0Y2giLCJ1cmwiLCJoZWFkZXJzIiwidGhlbiIsIl9jaGVja1NlcnZlclJlc3BvbnNlIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImJhc2VVcmwiLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzVGV4dCIsImdldFdlYnBhZ2VJbmZvIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiZ2V0UHJvZmlsZURhdGEiLCJkZWxldGVDYXJkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJzZXRVc2VyQXZhdGFyIiwiYXZhdGFyIiwicHJvZmlsZUVkaXRQb3B1cEVsIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJhZGRDYXJkQnV0dG9uIiwicHJvZmlsZU5hbWVJbnB1dCIsInByb2ZpbGVGb3JtRWxlbWVudCIsImFkZEZvcm1FbGVtZW50IiwicHJvZmlsZU9jY3VwYXRpb25JbnB1dCIsIm5hbWVFbCIsImpvYkVsIiwiaW5pdGlhbENhcmRzIiwic2VsZWN0b3JzIiwiY2FyZExpc3QiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY2FyZERhdGEiLCJjYXJkIiwicmVuZGVyQ2FyZCIsImNhcmRGb3JtUG9wdXAiLCJhZGRDYXJkVmFsaWRhdG9yIiwiYWRkUHJvZmlsZVZhbGlkYXRvciIsInVzZXJJbmZvIiwicHJldmlld1BvcHVwIiwicHJvZmlsZUVkaXRQb3B1cCJdLCJzb3VyY2VSb290IjoiIn0=