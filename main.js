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
    _defineProperty(this, "getInitialCards", async () => {
      const res = await fetch(`${this.url}/cards`, {
        headers: this.headers
      });
      return this._checkServerResponse(res);
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

const api = new _utils_Api_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
    "Content-Type": "application/json"
  }
});
api.getInitialCards.then(initialCards => {
  // Card List
  const cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    items: initialCards,
    renderer: cardData => {
      const card = renderCard(cardData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsSUFBSXRGLG9FQUFhLENBQUMsVUFBVSxFQUFHckYsSUFBSSxJQUFLO0VBQzVELE1BQU1xSyxJQUFJLEdBQUdDLFVBQVUsQ0FBQ3RLLElBQUksQ0FBQztFQUM3Qm1LLFFBQVEsQ0FBQ3JELE9BQU8sQ0FBQ3VELElBQUksQ0FBQzdJLE9BQU8sRUFBRSxDQUFDO0VBQ2hDbUosYUFBYSxDQUFDN0YsVUFBVSxFQUFFO0FBQzVCLENBQUMsQ0FBQztBQUNGNkYsYUFBYSxDQUFDNUYsaUJBQWlCLEVBQUU7QUFFakMsTUFBTTZGLGdCQUFnQixHQUFHLElBQUl2RixvRUFBYSxDQUFDLGNBQWMsRUFBR3JGLElBQUksSUFBSztFQUNuRXlLLFFBQVEsQ0FBQ2hELFdBQVcsQ0FBQ3pILElBQUksQ0FBQztFQUMxQjRLLGdCQUFnQixDQUFDOUYsVUFBVSxFQUFFO0FBQy9CLENBQUMsQ0FBQztBQUNGOEYsZ0JBQWdCLENBQUM3RixpQkFBaUIsRUFBRTs7QUFFcEM7QUFDQXlFLCtFQUE4QixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQzVDZSxnQkFBZ0IsQ0FBQ3JHLGVBQWUsRUFBRTtFQUNsQ3lHLGFBQWEsQ0FBQzFGLFNBQVMsRUFBRTtBQUMzQixDQUFDLENBQUM7QUFFRnNFLG1GQUFrQyxDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ2hELE1BQU12SixJQUFJLEdBQUd5SyxRQUFRLENBQUNuRCxXQUFXLEVBQUU7RUFDbkNtQyx1RUFBc0IsR0FBR3pKLElBQUksQ0FBQ3VILFFBQVE7RUFDdENxQyw2RUFBNEIsR0FBRzVKLElBQUksQ0FBQ3dILE9BQU87RUFDM0NnRCxtQkFBbUIsQ0FBQ3RHLGVBQWUsRUFBRTtFQUNyQzBHLGdCQUFnQixDQUFDM0YsU0FBUyxFQUFFO0FBQzlCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NwcmludC04Ly4vc3JjL3V0aWxzL0FwaS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcHJpbnQtOC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZHNlbGVjdG9yLCB7IGhhbmRsZUNhcmRDbGljayB9KSB7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2NhcmRzZWxlY3RvciA9IGNhcmRzZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcclxuICB9XHJcblxyXG4gIF9oYW5kbGVEZWxldGUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBfaGFuZGxlTGlrZSA9ICgpID0+IHtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX29uXCIpO1xyXG4gIH07XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIC8vIGxpa2UgYnV0dG9uXHJcbiAgICB0aGlzLmNhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZUxpa2UpO1xyXG5cclxuICAgIC8vIGRlbGV0ZSBjYXJkIGJ1dHRvblxyXG4gICAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIlxyXG4gICAgKTtcclxuICAgIGNhcmREZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZURlbGV0ZSk7XHJcblxyXG4gICAgLy9saXN0ZW4gZm9yIGNhcmQgaW1hZ2UgY2xpY2tcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soe1xyXG4gICAgICAgIGxpbms6IHRoaXMuX2NhcmRJbWFnZS5zcmMsXHJcbiAgICAgICAgbmFtZTogdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZHNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RleHRcIik7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcclxuICAgIHRoaXMuX2NhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjXCIgKyBpbnB1dEVsLmlkICsgXCItZXJyb3JcIlxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI1wiICsgaW5wdXRFbC5pZCArIFwiLWVycm9yXCJcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCIgXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuX2NoZWNrRm9ybVZhbGlkaXR5KHRoaXMuX2lucHV0RWxzKTtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jaGVja0Zvcm1WYWxpZGl0eShpbnB1dHMpIHtcclxuICAgIHJldHVybiBpbnB1dHMuZXZlcnkoKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gW1xyXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yXHJcbiAgICApO1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xyXG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl90b2dnbGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2V4aXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZXhpdC1idXR0b25cIik7XHJcbiAgICB0aGlzLl9oYW5kbGVFc2NVcCA9IHRoaXMuX2hhbmRsZUVzY1VwLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjVXAoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT5cclxuICAgICAgdGhpcy5fY2xvc2VQb3B1cFdpdGhPdmVybGF5KGV2dClcclxuICAgICk7XHJcbiAgICB0aGlzLl9leGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSk7XHJcbiAgfVxyXG5cclxuICBvcGVuTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIF9jbG9zZVBvcHVwV2l0aE92ZXJsYXkoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikpIHtcclxuICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX3NhdmVCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19mb3JtLWlucHV0XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlTW9kYWwoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nKSB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuX3NhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX3ByZXZpZXctaW1hZ2VcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuX3ByZXZpZXdUaXRsZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy10aXRsZVwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKGRhdGEpIHtcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UuYWx0ID0gYEEgcGljdHVyZSBvZiAke2RhdGEubmFtZX1gO1xyXG4gICAgdGhpcy5fcHJldmlld1RpdGxlLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgc3VwZXIub3Blbk1vZGFsKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgfVxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihlbGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShpdGVtKSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChpdGVtKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKHsgbmFtZUVsZW1lbnQsIGpvYkVsZW1lbnQgfSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUgPSBuYW1lRWxlbWVudDtcclxuICAgIHRoaXMuX3Byb2ZpbGVKb2IgPSBqb2JFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VyTmFtZTogdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQsXHJcbiAgICAgIHVzZXJKb2I6IHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlckluZm8oZGF0YSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9wcm9maWxlSm9iLnRleHRDb250ZW50ID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgIHRoaXMudXJsID0gY29uZmlnLmJhc2VVcmw7XHJcbiAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcclxuICB9XHJcblxyXG4gIF9jaGVja1NlcnZlclJlc3BvbnNlKHJlcykge1xyXG4gICAgcmV0dXJuIHJlcy5vayA/IHJlcy5qc29uKCkgOiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c1RleHR9YCk7XHJcbiAgfVxyXG5cclxuICBnZXRJbml0aWFsQ2FyZHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt0aGlzLnVybH0vY2FyZHNgLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcclxuICB9O1xyXG5cclxuICBnZXRQcm9maWxlRGF0YSA9ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vdXNlcnMvbWVgLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0V2VicGFnZUluZm8oKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SW5pdGlhbENhcmRzKCksIHRoaXMuZ2V0UHJvZmlsZURhdGEoKV0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZmlsZURhdGEgPSAobmFtZSwgYWJvdXQpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vdXNlcnMvbWVgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGFib3V0LFxyXG4gICAgICB9KSxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfTtcclxuXHJcbiAgYWRkTmV3Q2FyZCA9IChkYXRhKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy51cmx9L2NhcmRzYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXHJcbiAgICAgICAgbGluazogZGF0YS5saW5rLFxyXG4gICAgICB9KSxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZSk7XHJcbiAgfTtcclxuXHJcbiAgZGVsZXRlQ2FyZChpZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS9jYXJkcy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgYWRkTGlrZShpZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS9jYXJkcy9saWtlcy8ke2lkfWAsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlTGlrZShpZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMudXJsfS9jYXJkcy9saWtlcy8ke2lkfWAsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlckF2YXRhcihhdmF0YXIpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLnVybH0vdXNlcnMvbWUvYXZhdGFyL2AsIHtcclxuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGF2YXRhcixcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gLy8gQXBpIGNvbmZpZ1xyXG4vLyAvLyBUb2tlbjogYjlhMWJiYzctOTA0MS00MzY1LWEzMjctMzg3ODIxNjJmYThlIEdyb3VwIElEOiBncm91cC0xMlxyXG4vLyBleHBvcnQgY29uc3QgYXBpQ29uZmlnID0ge1xyXG4vLyAgIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxyXG4vLyAgIGhlYWRlcnM6IHtcclxuLy8gICAgIGF1dGhvcml6YXRpb246IFwiYjlhMWJiYzctOTA0MS00MzY1LWEzMjctMzg3ODIxNjJmYThlXCIsXHJcbi8vICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuLy8gICB9LFxyXG4vLyB9O1xyXG4iLCIvL3BvcHVwcyBhbmQgYnV0dG9uc1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUVkaXRQb3B1cEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlRWRpdFwiKTtcclxuZXhwb3J0IGNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcGVuTW9kYWxcIik7XHJcbmV4cG9ydCBjb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcGVuTW9kYWwyXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZU5hbWVJbnB1dCA9IHByb2ZpbGVFZGl0UG9wdXBFbC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLm1vZGFsX19mb3JtLWlucHV0LW5hbWVcIlxyXG4pO1xyXG5cclxuLy9mb3JtcyBhbmQgaW5wdXRzXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtZm9ybVwiKTtcclxuZXhwb3J0IGNvbnN0IGFkZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtZm9ybVwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQgPSBwcm9maWxlRWRpdFBvcHVwRWwucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fZm9ybS1pbnB1dC1kZXNjcmlwdGlvblwiXHJcbik7XHJcbmV4cG9ydCBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RleHRcIik7XHJcbmV4cG9ydCBjb25zdCBqb2JFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIik7XHJcblxyXG4vLy8gY2FyZHMgYXJyYXlcclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWdvLmpwZ1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG4vL3NlbGVjdG9yc1xyXG5leHBvcnQgY29uc3Qgc2VsZWN0b3JzID0ge1xyXG4gIGFkZEZvcm1FbGVtZW50OiBcIiNhZGQtZm9ybVwiLFxyXG4gIHByb2ZpbGVFZGl0UG9wdXBFbDogXCIjcHJvZmlsZUVkaXRcIixcclxuICBwcm9maWxlRm9ybUVsZW1lbnQ6IFwiI2VkaXQtZm9ybVwiLFxyXG4gIHByb2ZpbGVOYW1lSW5wdXQ6IFwiLm1vZGFsX19mb3JtLWlucHV0LW5hbWVcIixcclxuICBlZGl0UHJvZmlsZUJ1dHRvbjogXCIjb3Blbk1vZGFsXCIsXHJcbiAgYWRkQ2FyZEJ1dHRvbjogXCIjb3Blbk1vZGFsMlwiLFxyXG4gIG5hbWVFbDogXCIucHJvZmlsZV9fdGV4dFwiLFxyXG4gIGpvYkVsOiBcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiLFxyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQ6IFwiLm1vZGFsX19mb3JtLWlucHV0LWRlc2NyaXB0aW9uXCIsXHJcbn07XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEltcG9ydCBvZiBDbGFzc2VzXHJcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xyXG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQge1xyXG4gIGFkZEZvcm1FbGVtZW50LFxyXG4gIHByb2ZpbGVGb3JtRWxlbWVudCxcclxuICBwcm9maWxlTmFtZUlucHV0LFxyXG4gIGVkaXRQcm9maWxlQnV0dG9uLFxyXG4gIGFkZENhcmRCdXR0b24sXHJcbiAgbmFtZUVsLFxyXG4gIGpvYkVsLFxyXG4gIHByb2ZpbGVPY2N1cGF0aW9uSW5wdXQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtLWlucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtLWJ1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2Zvcm0tYnV0dG9uX2Rpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19mb3JtLWlucHV0X3R5cGVfZXJyb3JcIixcclxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCIsXHJcbn07XHJcblxyXG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGkuanNcIjtcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xyXG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgIGF1dGhvcml6YXRpb246IFwiYjlhMWJiYzctOTA0MS00MzY1LWEzMjctMzg3ODIxNjJmYThlXCIsXHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICB9LFxyXG59KTtcclxuXHJcbmFwaS5nZXRJbml0aWFsQ2FyZHMudGhlbigoaW5pdGlhbENhcmRzKSA9PiB7XHJcbiAgLy8gQ2FyZCBMaXN0XHJcbiAgY29uc3QgY2FyZExpc3QgPSBuZXcgU2VjdGlvbihcclxuICAgIHtcclxuICAgICAgaXRlbXM6IGluaXRpYWxDYXJkcyxcclxuICAgICAgcmVuZGVyZXI6IChjYXJkRGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcmQgPSByZW5kZXJDYXJkKGNhcmREYXRhKTtcclxuICAgICAgICBjYXJkTGlzdC5hZGRJdGVtKGNhcmQuZ2V0VmlldygpKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBcIi5jYXJkc19fY29udGFpbmVyXCJcclxuICApO1xyXG4gIGNhcmRMaXN0LnJlbmRlckl0ZW1zKCk7XHJcbn0pO1xyXG5cclxuLy8gQ2FyZCBWYWxpZGF0b3JcclxuY29uc3QgYWRkQ2FyZFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgYWRkRm9ybUVsZW1lbnQpO1xyXG5hZGRDYXJkVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbi8vIFByb2ZpbGUgVmFsaWRhdG9yXHJcbmNvbnN0IGFkZFByb2ZpbGVWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIHByb2ZpbGVGb3JtRWxlbWVudCk7XHJcbmFkZFByb2ZpbGVWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5cclxuLy8gVXNlciBJbmZvIGZvciBQcm9maWxlXHJcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcclxuICBuYW1lRWxlbWVudDogbmFtZUVsLFxyXG4gIGpvYkVsZW1lbnQ6IGpvYkVsLFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcclxuICByZXR1cm4gbmV3IENhcmQoY2FyZERhdGEsIFwiI2NhcmRUZW1wbGF0ZVwiLCB7XHJcbiAgICBoYW5kbGVDYXJkQ2xpY2s6IChjYXJkKSA9PiB7XHJcbiAgICAgIHByZXZpZXdQb3B1cC5vcGVuTW9kYWwoY2FyZCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBwcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjaW1hZ2UtcHJldmlld1wiKTtcclxucHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4vL0FkZCBjYXJkIHBvcHVwXHJcbmNvbnN0IGNhcmRGb3JtUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjYXJkQWRkXCIsIChkYXRhKSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IHJlbmRlckNhcmQoZGF0YSk7XHJcbiAgY2FyZExpc3QuYWRkSXRlbShjYXJkLmdldFZpZXcoKSk7XHJcbiAgY2FyZEZvcm1Qb3B1cC5jbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5jYXJkRm9ybVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBwcm9maWxlRWRpdFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjcHJvZmlsZUVkaXRcIiwgKGRhdGEpID0+IHtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcclxuICBwcm9maWxlRWRpdFBvcHVwLmNsb3NlTW9kYWwoKTtcclxufSk7XHJcbnByb2ZpbGVFZGl0UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbi8vIENhcmQgQnV0dG9uIFN0YXRlc1xyXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgYWRkQ2FyZFZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBjYXJkRm9ybVBvcHVwLm9wZW5Nb2RhbCgpO1xyXG59KTtcclxuXHJcbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XHJcbiAgcHJvZmlsZU5hbWVJbnB1dC52YWx1ZSA9IGRhdGEudXNlck5hbWU7XHJcbiAgcHJvZmlsZU9jY3VwYXRpb25JbnB1dC52YWx1ZSA9IGRhdGEudXNlckpvYjtcclxuICBhZGRQcm9maWxlVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gIHByb2ZpbGVFZGl0UG9wdXAub3Blbk1vZGFsKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiZGF0YSIsImNhcmRzZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsIl9jYXJkRWxlbWVudCIsInJlbW92ZSIsImNhcmRMaWtlQnV0dG9uIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiX2xpbmsiLCJsaW5rIiwiX25hbWUiLCJuYW1lIiwiX2NhcmRzZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlIiwiY2FyZERlbGV0ZUJ1dHRvbiIsIl9oYW5kbGVEZWxldGUiLCJfY2FyZEltYWdlIiwic3JjIiwiX2NhcmRUaXRsZSIsInRleHRDb250ZW50IiwiZ2V0VmlldyIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsImFsdCIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtRWxlbWVudCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJlcnJvck1lc3NhZ2VFbCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJpc1ZhbGlkIiwiX2NoZWNrRm9ybVZhbGlkaXR5IiwiX2lucHV0RWxzIiwiX3N1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwiaW5wdXRzIiwiZXZlcnkiLCJpbnB1dCIsInZhbGlkaXR5IiwidmFsaWQiLCJfdG9nZ2xlSW5wdXRFcnJvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZXZlbnQiLCJkaXNhYmxlU3VibWl0QnV0dG9uIiwicmVzZXRWYWxpZGF0aW9uIiwiZW5hYmxlVmFsaWRhdGlvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfZXhpdEJ1dHRvbiIsIl9oYW5kbGVFc2NVcCIsImJpbmQiLCJldnQiLCJrZXkiLCJjbG9zZU1vZGFsIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJfY2xvc2VQb3B1cFdpdGhPdmVybGF5Iiwib3Blbk1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoRm9ybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlU3VibWl0IiwiX2Zvcm1FbCIsIl9zYXZlQnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRWYWx1ZXMiLCJ2YWx1ZSIsInJlc2V0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsIlBvcHVwV2l0aEltYWdlIiwiX3ByZXZpZXdJbWFnZSIsIl9wcmV2aWV3VGl0bGUiLCJTZWN0aW9uIiwic2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsIl9pdGVtcyIsInJlbmRlckl0ZW1zIiwiZWxlbSIsImFkZEl0ZW0iLCJpdGVtIiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZUVsZW1lbnQiLCJqb2JFbGVtZW50IiwiX3Byb2ZpbGVOYW1lIiwiX3Byb2ZpbGVKb2IiLCJnZXRVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInNldFVzZXJJbmZvIiwiZGVzY3JpcHRpb24iLCJBcGkiLCJyZXMiLCJmZXRjaCIsInVybCIsImhlYWRlcnMiLCJfY2hlY2tTZXJ2ZXJSZXNwb25zZSIsInRoZW4iLCJhYm91dCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYmFzZVVybCIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXNUZXh0IiwiZ2V0V2VicGFnZUluZm8iLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRQcm9maWxlRGF0YSIsImRlbGV0ZUNhcmQiLCJhZGRMaWtlIiwicmVtb3ZlTGlrZSIsInNldFVzZXJBdmF0YXIiLCJhdmF0YXIiLCJwcm9maWxlRWRpdFBvcHVwRWwiLCJlZGl0UHJvZmlsZUJ1dHRvbiIsImFkZENhcmRCdXR0b24iLCJwcm9maWxlTmFtZUlucHV0IiwicHJvZmlsZUZvcm1FbGVtZW50IiwiYWRkRm9ybUVsZW1lbnQiLCJwcm9maWxlT2NjdXBhdGlvbklucHV0IiwibmFtZUVsIiwiam9iRWwiLCJpbml0aWFsQ2FyZHMiLCJzZWxlY3RvcnMiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiY2FyZExpc3QiLCJjYXJkRGF0YSIsImNhcmQiLCJyZW5kZXJDYXJkIiwiYWRkQ2FyZFZhbGlkYXRvciIsImFkZFByb2ZpbGVWYWxpZGF0b3IiLCJ1c2VySW5mbyIsInByZXZpZXdQb3B1cCIsImNhcmRGb3JtUG9wdXAiLCJwcm9maWxlRWRpdFBvcHVwIl0sInNvdXJjZVJvb3QiOiIifQ==