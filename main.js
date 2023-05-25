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
  constructor(data, userId, cardSelector, _ref) {
    let {
      handleCardClick,
      handleDeleteClick,
      handleLike
    } = _ref;
    _defineProperty(this, "handleDelete", () => {
      this._cardElement.remove();
    });
    this.id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._userId = userId;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCallback = handleLike;
    this._handleDeleteClick = handleDeleteClick;
    this.ownerId = data.owner._id;
  }
  // _handleLikeClick = () => {
  //   this.cardLikeButton.classList.toggle("card__like-button_on");
  //   this._handleLike(this);
  // };

  cardLiked() {
    return this._likes.some(item => {
      return item._id === this._userId;
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
    this.cardLikeButton.addEventListener("click", () => this._handleLikeCallback(this));

    // delete card button
    const cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this.id);
    });

    //listen for card image click
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        link: this._cardImage.src,
        name: this._cardTitle.textContent
      });
    });
  }
  getView() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesCount = this._cardElement.querySelector(".card__like-count");
    this._likesCount.textContent = this._likes.length;
    if (this._userId === this.ownerId) {
      // show trash icon "card__delete-button"
      const trashBtn = this._cardElement.querySelector(".card__delete-button");
      trashBtn.classList.add("card__delete-button_visible");
    }
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

/***/ "./src/components/PopupWithConfirm.js":
/*!********************************************!*\
  !*** ./src/components/PopupWithConfirm.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithConfirm; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithConfirm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupElement.querySelector(".modal__form-button").textContent = "Deleting...";
    } else {
      this._popupElement.querySelector(".modal__form-button").textContent = "Yes";
    }
  }
  setEventListeners() {
    const formEl = this._popupElement.querySelector(".modal__form");
    formEl.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
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
    this._items.reverse().forEach(elem => {
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
      jobElement,
      avatarEl
    } = _ref;
    this._profileName = nameElement;
    this._profileJob = jobElement;
    this._avatar = avatarEl;
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
  setAvatar(data) {
    this._avatar.src = data.avatar;
  }
  getAvatar(data) {
    return this._avatar;
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
      body: JSON.stringify(avatar)
    }).then(this._checkServerResponse);
  }
}

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
/* harmony export */   "avatarEl": function() { return /* binding */ avatarEl; },
/* harmony export */   "editProfileButton": function() { return /* binding */ editProfileButton; },
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "jobEl": function() { return /* binding */ jobEl; },
/* harmony export */   "nameEl": function() { return /* binding */ nameEl; },
/* harmony export */   "profileAddImage": function() { return /* binding */ profileAddImage; },
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
const profileAddImage = document.querySelector(".profile__image-edit");
const profileNameInput = profileEditPopupEl.querySelector(".modal__form-input-name");

//forms and inputs
const profileFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const profileOccupationInput = profileEditPopupEl.querySelector(".modal__form-input-description");
const nameEl = document.querySelector(".profile__text");
const jobEl = document.querySelector(".profile__description");
const avatarEl = document.querySelector(".profile__image");

// cards array
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
  profileOccupationInput: ".modal__form-input-description",
  avatarPopup: "#edit-avatar",
  avatarForm: "#edit-avatar-form"
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
/* harmony import */ var _components_PopupWithConfirm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithConfirm.js */ "./src/components/PopupWithConfirm.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _utils_Api_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/Api.js */ "./src/utils/Api.js");
// Import of Classes










const config = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible"
};
let cardList;
let userId;
const api = new _utils_Api_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
    "Content-Type": "application/json"
  }
});

/* --------------------------------------------------------------------------  */
/*                      Get initial Cards and Profile Data                     */
/* -------------------------------------------------------------------------- */
Promise.all([api.getInitialCards(), api.getProfileData()]).then(values => {
  userId = values[1]._id;
  // Card List
  cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    items: values[0],
    renderer: cardData => {
      const card = renderCard(cardData);
      cardList.addItem(card.getView());
    }
  }, ".cards__container");
  cardList.renderItems();
  userInfo.setUserInfo({
    name: values[1].name,
    description: values[1].about
  });
  userInfo.setAvatar({
    avatar: values[1].avatar
  });
}).catch(error => {
  console.log(error);
});

// Card Validator
const addCardValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.addFormElement);
addCardValidator.enableValidation();

// Profile Validator
const addProfileValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.profileFormElement);
addProfileValidator.enableValidation();

// User Info for Profile
const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  nameElement: _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.nameEl,
  jobElement: _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.jobEl,
  avatarEl: _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.avatarEl
});
const profileEditPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#profileEdit", data => {
  profileEditPopup.renderLoading(true);
  api.updateProfileData(data.name, data.description).then(newUserObject => {
    userInfo.setUserInfo({
      name: newUserObject.name,
      description: newUserObject.about
    });
  }).catch(error => {
    console.log(error);
    alert("There was an error");
  }).finally(() => profileEditPopup.renderLoading(false));
  profileEditPopup.closeModal();
});
profileEditPopup.setEventListeners();
function renderCard(cardData) {
  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](cardData, userId, "#cardTemplate", {
    handleCardClick: card => {
      previewPopup.openModal(card);
    },
    // Delete card
    handleDeleteClick: cardId => {
      deleteForm.openModal();
      deleteForm.setSubmitAction(() => {
        deleteForm.renderLoading(true);
        api.deleteCard(cardId).then(() => {
          card.handleDelete();
          deleteForm.closeModal();
        }).catch(err => console.log(`An error occurred when deleting card: ${err}`)).finally(() => deleteForm.renderLoading(false));
      });
    },
    // Likes
    handleLike: card => {
      if (card.cardLiked()) {
        api.removeLike(card.id).then(res => {
          card.updateLikes(res.likes);
        }).catch(err => console.log(`An error occurred when removing a like: ${err}`));
      } else {
        api.addLike(card.id).then(res => {
          card.updateLikes(res.likes);
        }).catch(err => console.log(`An error occurred when adding a like: ${err}`));
      }
    }
  });
  return card;
}
const previewPopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__["default"]("#image-preview");
previewPopup.setEventListeners();
const deleteForm = new _components_PopupWithConfirm_js__WEBPACK_IMPORTED_MODULE_6__["default"]("#cardDelete");
deleteForm.setEventListeners();

//Add card popup
const cardFormPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#cardAdd", data => {
  cardFormPopup.renderLoading(true);
  api.addNewCard(data).then(newCard => {
    const card = renderCard(newCard);
    cardList.addItem(card.getView());
    cardFormPopup.closeModal();
  }).catch(error => {
    console.log(error);
    alert("There was an error");
  }).finally(() => cardFormPopup.renderLoading(false));
});
cardFormPopup.setEventListeners();

// Card Button States
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  cardFormPopup.openModal();
});

// profile Button States
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.profileAddImage.addEventListener("click", () => {
  addProfileValidator.resetValidation();
  cardProfilePopup.openModal();
});
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.profileNameInput.value = data.userName;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.profileOccupationInput.value = data.userJob;
  addProfileValidator.resetValidation();
  profileEditPopup.openModal();
});

//Add profile popup
const cardProfilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#edit-avatar", data => {
  api.setUserAvatar(data).then(() => {});
  userInfo.setAvatar(data);
  cardProfilePopup.closeModal();
});
cardProfilePopup.setEventListeners();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDN0ssSUFBSSxDQUFDLENBQUN3SixJQUFJLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQztFQUNuQzJDLFFBQVEsQ0FBQ2xELFNBQVMsQ0FBQ2pKLElBQUksQ0FBQztFQUN0QnVOLGdCQUFnQixDQUFDekgsVUFBVSxFQUFFO0FBQy9CLENBQUMsQ0FBQztBQUNGeUgsZ0JBQWdCLENBQUN4SCxpQkFBaUIsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByaW50LTkvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NwcmludC05Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOS8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NwcmludC05Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTkvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTkvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOS8uL3NyYy91dGlscy9BcGkuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTkvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3NwcmludC05Ly4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9zcHJpbnQtOS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcHJpbnQtOS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ByaW50LTkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zcHJpbnQtOS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NwcmludC05Ly4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZGF0YSxcclxuICAgIHVzZXJJZCxcclxuICAgIGNhcmRTZWxlY3RvcixcclxuICAgIHsgaGFuZGxlQ2FyZENsaWNrLCBoYW5kbGVEZWxldGVDbGljaywgaGFuZGxlTGlrZSB9XHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gZGF0YS5faWQ7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX3VzZXJJZCA9IHVzZXJJZDtcclxuICAgIHRoaXMuX2xpa2VzID0gZGF0YS5saWtlcztcclxuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcclxuICAgIHRoaXMuX2hhbmRsZUxpa2VDYWxsYmFjayA9IGhhbmRsZUxpa2U7XHJcbiAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljayA9IGhhbmRsZURlbGV0ZUNsaWNrO1xyXG4gICAgdGhpcy5vd25lcklkID0gZGF0YS5vd25lci5faWQ7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVEZWxldGUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICAvLyBfaGFuZGxlTGlrZUNsaWNrID0gKCkgPT4ge1xyXG4gIC8vICAgdGhpcy5jYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fb25cIik7XHJcbiAgLy8gICB0aGlzLl9oYW5kbGVMaWtlKHRoaXMpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNhcmRMaWtlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKChpdGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBpdGVtLl9pZCA9PT0gdGhpcy5fdXNlcklkXHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfcmVuZGVyTGlrZXMoKSB7XHJcbiAgICB0aGlzLl9saWtlc0NvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuY2FyZExpa2VkKCkpIHtcclxuICAgICAgdGhpcy5jYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZS1idXR0b25fb25cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlLWJ1dHRvbl9vblwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUxpa2VzKGxpa2VzKSB7XHJcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xyXG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIC8vIGxpa2UgYnV0dG9uXHJcbiAgICB0aGlzLmNhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XHJcbiAgICAgIHRoaXMuX2hhbmRsZUxpa2VDYWxsYmFjayh0aGlzKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBkZWxldGUgY2FyZCBidXR0b25cclxuICAgIGNvbnN0IGNhcmREZWxldGVCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jYXJkX19kZWxldGUtYnV0dG9uXCJcclxuICAgICk7XHJcbiAgICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKHRoaXMuaWQpXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2xpc3RlbiBmb3IgY2FyZCBpbWFnZSBjbGlja1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayh7XHJcbiAgICAgICAgbGluazogdGhpcy5fY2FyZEltYWdlLnNyYyxcclxuICAgICAgICBuYW1lOiB0aGlzLl9jYXJkVGl0bGUudGV4dENvbnRlbnQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxyXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2NhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGV4dFwiKTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuICAgIHRoaXMuX2xpa2VzQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtY291bnRcIik7XHJcbiAgICB0aGlzLl9saWtlc0NvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuX3VzZXJJZCA9PT0gdGhpcy5vd25lcklkKSB7XHJcbiAgICAgIC8vIHNob3cgdHJhc2ggaWNvbiBcImNhcmRfX2RlbGV0ZS1idXR0b25cIlxyXG4gICAgICBjb25zdCB0cmFzaEJ0biA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKVxyXG4gICAgICB0cmFzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fZGVsZXRlLWJ1dHRvbl92aXNpYmxlXCIpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7IiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtRWxlbWVudCkge1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuICB9XHJcblxyXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI1wiICsgaW5wdXRFbC5pZCArIFwiLWVycm9yXCJcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNcIiArIGlucHV0RWwuaWQgKyBcIi1lcnJvclwiXHJcbiAgICApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiIFwiO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcclxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLl9jaGVja0Zvcm1WYWxpZGl0eSh0aGlzLl9pbnB1dEVscyk7XHJcbiAgICBpZiAoIWlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2hlY2tGb3JtVmFsaWRpdHkoaW5wdXRzKSB7XHJcbiAgICByZXR1cm4gaW5wdXRzLmV2ZXJ5KChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUlucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IFtcclxuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKSxcclxuICAgIF07XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvclxyXG4gICAgKTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcclxuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlSW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZVN1Ym1pdEJ1dHRvbigpIHtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9leGl0QnV0dG9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2V4aXQtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5faGFuZGxlRXNjVXAgPSB0aGlzLl9oYW5kbGVFc2NVcC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUVzY1VwKGV2dCkge1xyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+XHJcbiAgICAgIHRoaXMuX2Nsb3NlUG9wdXBXaXRoT3ZlcmxheShldnQpXHJcbiAgICApO1xyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZU1vZGFsKCkpO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NVcCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZU1vZGFsKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NVcCk7XHJcbiAgfVxyXG5cclxuICBfY2xvc2VQb3B1cFdpdGhPdmVybGF5KGV2dCkge1xyXG4gICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfb3BlbmVkXCIpKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcpIHtcclxuICAgIGlmIChpc0xvYWRpbmcpIHtcclxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCIpLnRleHRDb250ZW50ID0gXCJEZWxldGluZy4uLlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCIpLnRleHRDb250ZW50ID0gXCJZZXNcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZm9ybUVsID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XHJcbiAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbiAgc2V0U3VibWl0QWN0aW9uKGhhbmRsZVN1Ym1pdCkge1xyXG4gICAgdGhpcy5faGFuZGxlU3VibWl0ID0gaGFuZGxlU3VibWl0O1xyXG4gIH1cclxufSIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX3NhdmVCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19mb3JtLWlucHV0XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlTW9kYWwoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nKSB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuX3NhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX3ByZXZpZXctaW1hZ2VcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuX3ByZXZpZXdUaXRsZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy10aXRsZVwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKGRhdGEpIHtcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UuYWx0ID0gYEEgcGljdHVyZSBvZiAke2RhdGEubmFtZX1gO1xyXG4gICAgdGhpcy5fcHJldmlld1RpdGxlLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgc3VwZXIub3Blbk1vZGFsKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgfVxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMucmV2ZXJzZSgpLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIoZWxlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZEl0ZW0oaXRlbSkge1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoaXRlbSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IG5hbWVFbGVtZW50LCBqb2JFbGVtZW50LCBhdmF0YXJFbCB9KSB7XHJcbiAgICB0aGlzLl9wcm9maWxlTmFtZSA9IG5hbWVFbGVtZW50O1xyXG4gICAgdGhpcy5fcHJvZmlsZUpvYiA9IGpvYkVsZW1lbnQ7XHJcbiAgICB0aGlzLl9hdmF0YXIgPSBhdmF0YXJFbDtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlck5hbWU6IHRoaXMuX3Byb2ZpbGVOYW1lLnRleHRDb250ZW50LFxyXG4gICAgICB1c2VySm9iOiB0aGlzLl9wcm9maWxlSm9iLnRleHRDb250ZW50LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcclxuICAgIHRoaXMuX3Byb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fcHJvZmlsZUpvYi50ZXh0Q29udGVudCA9IGRhdGEuZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxuICBzZXRBdmF0YXIoZGF0YSkge1xyXG4gICAgdGhpcy5fYXZhdGFyLnNyYyA9IGRhdGEuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXZhdGFyKGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLl9hdmF0YXI7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgdGhpcy51cmwgPSBjb25maWcuYmFzZVVybDtcclxuICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKSB7XHJcbiAgICByZXR1cm4gcmVzLm9rID8gcmVzLmpzb24oKSA6IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzVGV4dH1gKTtcclxuICB9XHJcblxyXG4gIGdldEluaXRpYWxDYXJkcyA9ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHNgLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvZmlsZURhdGEgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lYCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGdldFdlYnBhZ2VJbmZvKCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldEluaXRpYWxDYXJkcygpLCB0aGlzLmdldFByb2ZpbGVEYXRhKCldKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2ZpbGVEYXRhID0gKG5hbWUsIGFib3V0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhYm91dCxcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGFkZE5ld0NhcmQgPSAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS9jYXJkc2AsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxyXG4gICAgICAgIGxpbms6IGRhdGEubGluayxcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH07XHJcblxyXG4gIGRlbGV0ZUNhcmQoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIGFkZExpa2UoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvbGlrZXMvJHtpZH1gLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUxpa2UoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHMvbGlrZXMvJHtpZH1gLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJBdmF0YXIoYXZhdGFyKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L3VzZXJzL21lL2F2YXRhci9gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgIGF2YXRhcixcclxuICAgICksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH1cclxufVxyXG4iLCIvL3BvcHVwcyBhbmQgYnV0dG9uc1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUVkaXRQb3B1cEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlRWRpdFwiKTtcclxuZXhwb3J0IGNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcGVuTW9kYWxcIik7XHJcbmV4cG9ydCBjb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcGVuTW9kYWwyXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUFkZEltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbWFnZS1lZGl0XCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZU5hbWVJbnB1dCA9IHByb2ZpbGVFZGl0UG9wdXBFbC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLm1vZGFsX19mb3JtLWlucHV0LW5hbWVcIlxyXG4pO1xyXG5cclxuLy9mb3JtcyBhbmQgaW5wdXRzXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtZm9ybVwiKTtcclxuZXhwb3J0IGNvbnN0IGFkZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtZm9ybVwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQgPSBwcm9maWxlRWRpdFBvcHVwRWwucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fZm9ybS1pbnB1dC1kZXNjcmlwdGlvblwiXHJcbik7XHJcbmV4cG9ydCBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RleHRcIik7XHJcbmV4cG9ydCBjb25zdCBqb2JFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XHJcbmV4cG9ydCBjb25zdCBhdmF0YXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faW1hZ2VcIik7XHJcblxyXG5cclxuLy8gY2FyZHMgYXJyYXlcclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWdvLmpwZ1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG4vL3NlbGVjdG9yc1xyXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JzID0ge1xyXG4gIGFkZEZvcm1FbGVtZW50OiBcIiNhZGQtZm9ybVwiLFxyXG4gIHByb2ZpbGVFZGl0UG9wdXBFbDogXCIjcHJvZmlsZUVkaXRcIixcclxuICBwcm9maWxlRm9ybUVsZW1lbnQ6IFwiI2VkaXQtZm9ybVwiLFxyXG4gIHByb2ZpbGVOYW1lSW5wdXQ6IFwiLm1vZGFsX19mb3JtLWlucHV0LW5hbWVcIixcclxuICBlZGl0UHJvZmlsZUJ1dHRvbjogXCIjb3Blbk1vZGFsXCIsXHJcbiAgYWRkQ2FyZEJ1dHRvbjogXCIjb3Blbk1vZGFsMlwiLFxyXG4gIG5hbWVFbDogXCIucHJvZmlsZV9fdGV4dFwiLFxyXG4gIGpvYkVsOiBcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiLFxyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQ6IFwiLm1vZGFsX19mb3JtLWlucHV0LWRlc2NyaXB0aW9uXCIsXHJcbiAgYXZhdGFyUG9wdXA6IFwiI2VkaXQtYXZhdGFyXCIsXHJcbiAgYXZhdGFyRm9ybTogXCIjZWRpdC1hdmF0YXItZm9ybVwiLFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBJbXBvcnQgb2YgQ2xhc3Nlc1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQge1xyXG4gIGFkZEZvcm1FbGVtZW50LFxyXG4gIHByb2ZpbGVGb3JtRWxlbWVudCxcclxuICBwcm9maWxlTmFtZUlucHV0LFxyXG4gIGVkaXRQcm9maWxlQnV0dG9uLFxyXG4gIGFkZENhcmRCdXR0b24sXHJcbiAgbmFtZUVsLFxyXG4gIGpvYkVsLFxyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQsXHJcbiAgcHJvZmlsZUFkZEltYWdlLFxyXG4gIGF2YXRhckVsLFxyXG4gIGF2YXRhckZvcm0sXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtLWlucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtLWJ1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2Zvcm0tYnV0dG9uX2Rpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19mb3JtLWlucHV0X3R5cGVfZXJyb3JcIixcclxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXHJcbn07XHJcblxyXG5sZXQgY2FyZExpc3Q7XHJcbmxldCB1c2VySWQ7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcclxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcclxuICBoZWFkZXJzOiB7XHJcbiAgICBhdXRob3JpemF0aW9uOiBcImI5YTFiYmM3LTkwNDEtNDM2NS1hMzI3LTM4NzgyMTYyZmE4ZVwiLFxyXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cclxuLyogICAgICAgICAgICAgICAgICAgICAgR2V0IGluaXRpYWwgQ2FyZHMgYW5kIFByb2ZpbGUgRGF0YSAgICAgICAgICAgICAgICAgICAgICovXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblByb21pc2UuYWxsKFthcGkuZ2V0SW5pdGlhbENhcmRzKCksIGFwaS5nZXRQcm9maWxlRGF0YSgpXSlcclxuICAudGhlbigodmFsdWVzKSA9PiB7XHJcbiAgICB1c2VySWQgPSB2YWx1ZXNbMV0uX2lkO1xyXG4gICAgLy8gQ2FyZCBMaXN0XHJcbiAgICBjYXJkTGlzdCA9IG5ldyBTZWN0aW9uKFxyXG4gICAgICB7XHJcbiAgICAgICAgaXRlbXM6IHZhbHVlc1swXSxcclxuICAgICAgICByZW5kZXJlcjogKGNhcmREYXRhKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZChjYXJkRGF0YSk7XHJcbiAgICAgICAgICBjYXJkTGlzdC5hZGRJdGVtKGNhcmQuZ2V0VmlldygpKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBcIi5jYXJkc19fY29udGFpbmVyXCJcclxuICAgICk7XHJcbiAgICBjYXJkTGlzdC5yZW5kZXJJdGVtcygpO1xyXG5cclxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHtcclxuICAgICAgbmFtZTogdmFsdWVzWzFdLm5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB2YWx1ZXNbMV0uYWJvdXQsXHJcbiAgICB9KTtcclxuICAgIHVzZXJJbmZvLnNldEF2YXRhcih7XHJcbiAgICAgIGF2YXRhcjogdmFsdWVzWzFdLmF2YXRhcixcclxuICAgIH0pXHJcbiAgfSlcclxuICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfSk7XHJcblxyXG4vLyBDYXJkIFZhbGlkYXRvclxyXG5jb25zdCBhZGRDYXJkVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBhZGRGb3JtRWxlbWVudCk7XHJcbmFkZENhcmRWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5cclxuLy8gUHJvZmlsZSBWYWxpZGF0b3JcclxuY29uc3QgYWRkUHJvZmlsZVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgcHJvZmlsZUZvcm1FbGVtZW50KTtcclxuYWRkUHJvZmlsZVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vLyBVc2VyIEluZm8gZm9yIFByb2ZpbGVcclxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xyXG4gIG5hbWVFbGVtZW50OiBuYW1lRWwsXHJcbiAgam9iRWxlbWVudDogam9iRWwsXHJcbiAgYXZhdGFyRWw6IGF2YXRhckVsLFxyXG59KTtcclxuXHJcbmNvbnN0IHByb2ZpbGVFZGl0UG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNwcm9maWxlRWRpdFwiLCAoZGF0YSkgPT4ge1xyXG4gIHByb2ZpbGVFZGl0UG9wdXAucmVuZGVyTG9hZGluZyh0cnVlKTtcclxuICBhcGlcclxuICAgIC51cGRhdGVQcm9maWxlRGF0YShkYXRhLm5hbWUsIGRhdGEuZGVzY3JpcHRpb24pXHJcbiAgICAudGhlbigobmV3VXNlck9iamVjdCkgPT4ge1xyXG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyh7XHJcbiAgICAgICAgbmFtZTogbmV3VXNlck9iamVjdC5uYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBuZXdVc2VyT2JqZWN0LmFib3V0LFxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3JcIik7XHJcbiAgICB9KVxyXG4gICAgLmZpbmFsbHkoKCkgPT4gcHJvZmlsZUVkaXRQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlKSk7XHJcbiAgcHJvZmlsZUVkaXRQb3B1cC5jbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5wcm9maWxlRWRpdFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XHJcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGNhcmREYXRhLCB1c2VySWQsIFwiI2NhcmRUZW1wbGF0ZVwiLCB7XHJcbiAgICBoYW5kbGVDYXJkQ2xpY2s6IChjYXJkKSA9PiB7XHJcbiAgICAgIHByZXZpZXdQb3B1cC5vcGVuTW9kYWwoY2FyZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIERlbGV0ZSBjYXJkXHJcbiAgICBoYW5kbGVEZWxldGVDbGljazogKGNhcmRJZCkgPT4ge1xyXG4gICAgICBkZWxldGVGb3JtLm9wZW5Nb2RhbCgpO1xyXG4gICAgICBkZWxldGVGb3JtLnNldFN1Ym1pdEFjdGlvbigoKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlRm9ybS5yZW5kZXJMb2FkaW5nKHRydWUpO1xyXG4gICAgICAgIGFwaVxyXG4gICAgICAgICAgLmRlbGV0ZUNhcmQoY2FyZElkKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjYXJkLmhhbmRsZURlbGV0ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGVGb3JtLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEFuIGVycm9yIG9jY3VycmVkIHdoZW4gZGVsZXRpbmcgY2FyZDogJHtlcnJ9YClcclxuICAgICAgICAgIClcclxuICAgICAgICAgIC5maW5hbGx5KCgpID0+IGRlbGV0ZUZvcm0ucmVuZGVyTG9hZGluZyhmYWxzZSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTGlrZXNcclxuICAgIGhhbmRsZUxpa2U6IChjYXJkKSA9PiB7XHJcbiAgICAgIGlmIChjYXJkLmNhcmRMaWtlZCgpKSB7XHJcbiAgICAgICAgYXBpXHJcbiAgICAgICAgICAucmVtb3ZlTGlrZShjYXJkLmlkKVxyXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBbiBlcnJvciBvY2N1cnJlZCB3aGVuIHJlbW92aW5nIGEgbGlrZTogJHtlcnJ9YClcclxuICAgICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBpXHJcbiAgICAgICAgICAuYWRkTGlrZShjYXJkLmlkKVxyXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBbiBlcnJvciBvY2N1cnJlZCB3aGVuIGFkZGluZyBhIGxpa2U6ICR7ZXJyfWApXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIHJldHVybiBjYXJkO1xyXG59XHJcblxyXG5jb25zdCBwcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjaW1hZ2UtcHJldmlld1wiKTtcclxucHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBkZWxldGVGb3JtID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIjY2FyZERlbGV0ZVwiKTtcclxuZGVsZXRlRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuLy9BZGQgY2FyZCBwb3B1cFxyXG5jb25zdCBjYXJkRm9ybVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY2FyZEFkZFwiLCAoZGF0YSkgPT4ge1xyXG4gIGNhcmRGb3JtUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlKTtcclxuICBhcGlcclxuICAgIC5hZGROZXdDYXJkKGRhdGEpXHJcbiAgICAudGhlbigobmV3Q2FyZCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZChuZXdDYXJkKTtcclxuICAgICAgY2FyZExpc3QuYWRkSXRlbShjYXJkLmdldFZpZXcoKSk7XHJcbiAgICAgIGNhcmRGb3JtUG9wdXAuY2xvc2VNb2RhbCgpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvclwiKTtcclxuICAgIH0pXHJcbiAgICAuZmluYWxseSgoKSA9PiBjYXJkRm9ybVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UpKTtcclxufSk7XHJcbmNhcmRGb3JtUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbi8vIENhcmQgQnV0dG9uIFN0YXRlc1xyXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgYWRkQ2FyZFZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBjYXJkRm9ybVBvcHVwLm9wZW5Nb2RhbCgpO1xyXG59KTtcclxuXHJcbi8vIHByb2ZpbGUgQnV0dG9uIFN0YXRlc1xyXG5wcm9maWxlQWRkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBhZGRQcm9maWxlVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gIGNhcmRQcm9maWxlUG9wdXAub3Blbk1vZGFsKCk7XHJcbn0pO1xyXG5cclxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBjb25zdCBkYXRhID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcclxuICBwcm9maWxlTmFtZUlucHV0LnZhbHVlID0gZGF0YS51c2VyTmFtZTtcclxuICBwcm9maWxlT2NjdXBhdGlvbklucHV0LnZhbHVlID0gZGF0YS51c2VySm9iO1xyXG4gIGFkZFByb2ZpbGVWYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgcHJvZmlsZUVkaXRQb3B1cC5vcGVuTW9kYWwoKTtcclxufSk7XHJcblxyXG4vL0FkZCBwcm9maWxlIHBvcHVwXHJcbmNvbnN0IGNhcmRQcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LWF2YXRhclwiLCAoZGF0YSkgPT4ge1xyXG4gIGFwaVxyXG4gIC5zZXRVc2VyQXZhdGFyKGRhdGEpLnRoZW4oKCk9Pnt9KVxyXG51c2VySW5mby5zZXRBdmF0YXIoZGF0YSlcclxuICBjYXJkUHJvZmlsZVBvcHVwLmNsb3NlTW9kYWwoKTtcclxufSk7XHJcbmNhcmRQcm9maWxlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJ1c2VySWQiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVEZWxldGVDbGljayIsImhhbmRsZUxpa2UiLCJfY2FyZEVsZW1lbnQiLCJyZW1vdmUiLCJpZCIsIl9pZCIsIl9saW5rIiwibGluayIsIl9uYW1lIiwibmFtZSIsIl91c2VySWQiLCJfbGlrZXMiLCJsaWtlcyIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZUxpa2VDYWxsYmFjayIsIl9oYW5kbGVEZWxldGVDbGljayIsIm93bmVySWQiLCJvd25lciIsImNhcmRMaWtlZCIsInNvbWUiLCJpdGVtIiwiX3JlbmRlckxpa2VzIiwiX2xpa2VzQ291bnQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsImNhcmRMaWtlQnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwidXBkYXRlTGlrZXMiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcmREZWxldGVCdXR0b24iLCJfY2FyZEltYWdlIiwic3JjIiwiX2NhcmRUaXRsZSIsImdldFZpZXciLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJhbHQiLCJ0cmFzaEJ0biIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtRWxlbWVudCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJlcnJvck1lc3NhZ2VFbCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiaXNWYWxpZCIsIl9jaGVja0Zvcm1WYWxpZGl0eSIsIl9pbnB1dEVscyIsIl9zdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsImlucHV0cyIsImV2ZXJ5IiwiaW5wdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUlucHV0RXJyb3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImV2ZW50IiwiZGlzYWJsZVN1Ym1pdEJ1dHRvbiIsInJlc2V0VmFsaWRhdGlvbiIsImVuYWJsZVZhbGlkYXRpb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50IiwiX2V4aXRCdXR0b24iLCJfaGFuZGxlRXNjVXAiLCJiaW5kIiwiZXZ0Iiwia2V5IiwiY2xvc2VNb2RhbCIsInNldEV2ZW50TGlzdGVuZXJzIiwiX2Nsb3NlUG9wdXBXaXRoT3ZlcmxheSIsIm9wZW5Nb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiZm9ybUVsIiwiX2hhbmRsZVN1Ym1pdCIsInNldFN1Ym1pdEFjdGlvbiIsImhhbmRsZVN1Ym1pdCIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm1FbCIsIl9zYXZlQnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRWYWx1ZXMiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfcHJldmlld0ltYWdlIiwiX3ByZXZpZXdUaXRsZSIsIlNlY3Rpb24iLCJzZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwiX2l0ZW1zIiwicmVuZGVySXRlbXMiLCJyZXZlcnNlIiwiZWxlbSIsImFkZEl0ZW0iLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lRWxlbWVudCIsImpvYkVsZW1lbnQiLCJhdmF0YXJFbCIsIl9wcm9maWxlTmFtZSIsIl9wcm9maWxlSm9iIiwiX2F2YXRhciIsImdldFVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwic2V0VXNlckluZm8iLCJkZXNjcmlwdGlvbiIsInNldEF2YXRhciIsImF2YXRhciIsImdldEF2YXRhciIsIkFwaSIsImZldGNoIiwidXJsIiwiaGVhZGVycyIsInRoZW4iLCJfY2hlY2tTZXJ2ZXJSZXNwb25zZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJiYXNlVXJsIiwicmVzIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1c1RleHQiLCJnZXRXZWJwYWdlSW5mbyIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsImdldFByb2ZpbGVEYXRhIiwiZGVsZXRlQ2FyZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwic2V0VXNlckF2YXRhciIsInByb2ZpbGVFZGl0UG9wdXBFbCIsImVkaXRQcm9maWxlQnV0dG9uIiwiYWRkQ2FyZEJ1dHRvbiIsInByb2ZpbGVBZGRJbWFnZSIsInByb2ZpbGVOYW1lSW5wdXQiLCJwcm9maWxlRm9ybUVsZW1lbnQiLCJhZGRGb3JtRWxlbWVudCIsInByb2ZpbGVPY2N1cGF0aW9uSW5wdXQiLCJuYW1lRWwiLCJqb2JFbCIsImluaXRpYWxDYXJkcyIsInNlbGVjdG9ycyIsImF2YXRhclBvcHVwIiwiYXZhdGFyRm9ybSIsImNhcmRMaXN0IiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsInZhbHVlcyIsImNhcmREYXRhIiwiY2FyZCIsInJlbmRlckNhcmQiLCJ1c2VySW5mbyIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZFByb2ZpbGVWYWxpZGF0b3IiLCJwcm9maWxlRWRpdFBvcHVwIiwidXBkYXRlUHJvZmlsZURhdGEiLCJuZXdVc2VyT2JqZWN0IiwiYWxlcnQiLCJmaW5hbGx5IiwicHJldmlld1BvcHVwIiwiY2FyZElkIiwiZGVsZXRlRm9ybSIsImhhbmRsZURlbGV0ZSIsImVyciIsImNhcmRGb3JtUG9wdXAiLCJhZGROZXdDYXJkIiwibmV3Q2FyZCIsImNhcmRQcm9maWxlUG9wdXAiXSwic291cmNlUm9vdCI6IiJ9