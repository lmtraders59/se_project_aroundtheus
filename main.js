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
// Import of Classes








const config = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible"
};

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

// Card List
const cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
  items: _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.initialCards,
  renderer: cardData => {
    const card = renderCard(cardData);
    cardList.addItem(card.getView());
  }
}, ".cards__container");
cardList.renderItems();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7RUFDckM2RSxnQkFBZ0IsQ0FBQzlELFNBQVMsRUFBRTtBQUM5QixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcmludC04Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9zcHJpbnQtOC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcHJpbnQtOC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NwcmludC04L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ByaW50LTgvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZHNlbGVjdG9yLCB7IGhhbmRsZUNhcmRDbGljayB9KSB7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2NhcmRzZWxlY3RvciA9IGNhcmRzZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcclxuICB9XHJcblxyXG4gIF9oYW5kbGVEZWxldGUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBfaGFuZGxlTGlrZSA9ICgpID0+IHtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX29uXCIpO1xyXG4gIH07XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIC8vIGxpa2UgYnV0dG9uXHJcbiAgICB0aGlzLmNhcmRMaWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZUxpa2UpO1xyXG5cclxuICAgIC8vIGRlbGV0ZSBjYXJkIGJ1dHRvblxyXG4gICAgY29uc3QgY2FyZERlbGV0ZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIlxyXG4gICAgKTtcclxuICAgIGNhcmREZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZURlbGV0ZSk7XHJcblxyXG4gICAgLy9saXN0ZW4gZm9yIGNhcmQgaW1hZ2UgY2xpY2tcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soe1xyXG4gICAgICAgIGxpbms6IHRoaXMuX2NhcmRJbWFnZS5zcmMsXHJcbiAgICAgICAgbmFtZTogdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZHNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RleHRcIik7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcclxuICAgIHRoaXMuX2NhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gY29uZmlnLmlucHV0U2VsZWN0b3I7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBjb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IGNvbmZpZy5pbnB1dEVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gY29uZmlnLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjXCIgKyBpbnB1dEVsLmlkICsgXCItZXJyb3JcIlxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI1wiICsgaW5wdXRFbC5pZCArIFwiLWVycm9yXCJcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCIgXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuX2NoZWNrRm9ybVZhbGlkaXR5KHRoaXMuX2lucHV0RWxzKTtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jaGVja0Zvcm1WYWxpZGl0eShpbnB1dHMpIHtcclxuICAgIHJldHVybiBpbnB1dHMuZXZlcnkoKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gW1xyXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0U2VsZWN0b3IpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yXHJcbiAgICApO1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xyXG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl90b2dnbGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2V4aXRCdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZXhpdC1idXR0b25cIik7XHJcbiAgICB0aGlzLl9oYW5kbGVFc2NVcCA9IHRoaXMuX2hhbmRsZUVzY1VwLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjVXAoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT5cclxuICAgICAgdGhpcy5fY2xvc2VQb3B1cFdpdGhPdmVybGF5KGV2dClcclxuICAgICk7XHJcbiAgICB0aGlzLl9leGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlTW9kYWwoKSk7XHJcbiAgfVxyXG5cclxuICBvcGVuTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY1VwKTtcclxuICB9XHJcblxyXG4gIF9jbG9zZVBvcHVwV2l0aE92ZXJsYXkoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikpIHtcclxuICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX3NhdmVCdXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19mb3JtLWlucHV0XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIGNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlTW9kYWwoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nKSB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMuX3NhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX3ByZXZpZXctaW1hZ2VcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuX3ByZXZpZXdUaXRsZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy10aXRsZVwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKGRhdGEpIHtcclxuICAgIHRoaXMuX3ByZXZpZXdJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9wcmV2aWV3SW1hZ2UuYWx0ID0gYEEgcGljdHVyZSBvZiAke2RhdGEubmFtZX1gO1xyXG4gICAgdGhpcy5fcHJldmlld1RpdGxlLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgc3VwZXIub3Blbk1vZGFsKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgc2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgfVxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihlbGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShpdGVtKSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChpdGVtKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKHsgbmFtZUVsZW1lbnQsIGpvYkVsZW1lbnQgfSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUgPSBuYW1lRWxlbWVudDtcclxuICAgIHRoaXMuX3Byb2ZpbGVKb2IgPSBqb2JFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VyTmFtZTogdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQsXHJcbiAgICAgIHVzZXJKb2I6IHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlckluZm8oZGF0YSkge1xyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9wcm9maWxlSm9iLnRleHRDb250ZW50ID0gZGF0YS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiLy9wb3B1cHMgYW5kIGJ1dHRvbnNcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVFZGl0UG9wdXBFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZUVkaXRcIik7XHJcbmV4cG9ydCBjb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3Blbk1vZGFsXCIpO1xyXG5leHBvcnQgY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3Blbk1vZGFsMlwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVOYW1lSW5wdXQgPSBwcm9maWxlRWRpdFBvcHVwRWwucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fZm9ybS1pbnB1dC1uYW1lXCJcclxuKTtcclxuXHJcbi8vZm9ybXMgYW5kIGlucHV0c1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LWZvcm1cIik7XHJcbmV4cG9ydCBjb25zdCBhZGRGb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWZvcm1cIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlT2NjdXBhdGlvbklucHV0ID0gcHJvZmlsZUVkaXRQb3B1cEVsLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIubW9kYWxfX2Zvcm0taW5wdXQtZGVzY3JpcHRpb25cIlxyXG4pO1xyXG5leHBvcnQgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190ZXh0XCIpO1xyXG5leHBvcnQgY29uc3Qgam9iRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5cclxuLy8vIGNhcmRzIGFycmF5XHJcbmV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogXCJZb3NlbWl0ZSBWYWxsZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvdmFub2lzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuLy9zZWxlY3RvcnNcclxuZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcclxuICBhZGRGb3JtRWxlbWVudDogXCIjYWRkLWZvcm1cIixcclxuICBwcm9maWxlRWRpdFBvcHVwRWw6IFwiI3Byb2ZpbGVFZGl0XCIsXHJcbiAgcHJvZmlsZUZvcm1FbGVtZW50OiBcIiNlZGl0LWZvcm1cIixcclxuICBwcm9maWxlTmFtZUlucHV0OiBcIi5tb2RhbF9fZm9ybS1pbnB1dC1uYW1lXCIsXHJcbiAgZWRpdFByb2ZpbGVCdXR0b246IFwiI29wZW5Nb2RhbFwiLFxyXG4gIGFkZENhcmRCdXR0b246IFwiI29wZW5Nb2RhbDJcIixcclxuICBuYW1lRWw6IFwiLnByb2ZpbGVfX3RleHRcIixcclxuICBqb2JFbDogXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIixcclxuICBwcm9maWxlT2NjdXBhdGlvbklucHV0OiBcIi5tb2RhbF9fZm9ybS1pbnB1dC1kZXNjcmlwdGlvblwiLFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBJbXBvcnQgb2YgQ2xhc3Nlc1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcclxuaW1wb3J0IHtcclxuICBhZGRGb3JtRWxlbWVudCxcclxuICBwcm9maWxlRm9ybUVsZW1lbnQsXHJcbiAgcHJvZmlsZU5hbWVJbnB1dCxcclxuICBlZGl0UHJvZmlsZUJ1dHRvbixcclxuICBhZGRDYXJkQnV0dG9uLFxyXG4gIG5hbWVFbCxcclxuICBqb2JFbCxcclxuICBwcm9maWxlT2NjdXBhdGlvbklucHV0LFxyXG4gIGluaXRpYWxDYXJkcyxcclxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0taW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fZm9ybS1idXR0b25fZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2Zvcm0taW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuXHJcbi8vIENhcmQgVmFsaWRhdG9yXHJcbmNvbnN0IGFkZENhcmRWYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGFkZEZvcm1FbGVtZW50KTtcclxuYWRkQ2FyZFZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vLyBQcm9maWxlIFZhbGlkYXRvclxyXG5jb25zdCBhZGRQcm9maWxlVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBwcm9maWxlRm9ybUVsZW1lbnQpO1xyXG5hZGRQcm9maWxlVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbi8vIFVzZXIgSW5mbyBmb3IgUHJvZmlsZVxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgbmFtZUVsZW1lbnQ6IG5hbWVFbCxcclxuICBqb2JFbGVtZW50OiBqb2JFbCxcclxufSk7XHJcblxyXG4vLyBDYXJkIExpc3RcclxuY29uc3QgY2FyZExpc3QgPSBuZXcgU2VjdGlvbihcclxuICB7XHJcbiAgICBpdGVtczogaW5pdGlhbENhcmRzLFxyXG4gICAgcmVuZGVyZXI6IChjYXJkRGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZChjYXJkRGF0YSk7XHJcbiAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY2FyZC5nZXRWaWV3KCkpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIFwiLmNhcmRzX19jb250YWluZXJcIlxyXG4pO1xyXG5cclxuY2FyZExpc3QucmVuZGVySXRlbXMoKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZERhdGEpIHtcclxuICByZXR1cm4gbmV3IENhcmQoY2FyZERhdGEsIFwiI2NhcmRUZW1wbGF0ZVwiLCB7XHJcbiAgICBoYW5kbGVDYXJkQ2xpY2s6IChjYXJkKSA9PiB7XHJcbiAgICAgIHByZXZpZXdQb3B1cC5vcGVuTW9kYWwoY2FyZCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBwcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjaW1hZ2UtcHJldmlld1wiKTtcclxucHJldmlld1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4vL0FkZCBjYXJkIHBvcHVwXHJcbmNvbnN0IGNhcmRGb3JtUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjYXJkQWRkXCIsIChkYXRhKSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IHJlbmRlckNhcmQoZGF0YSk7XHJcbiAgY2FyZExpc3QuYWRkSXRlbShjYXJkLmdldFZpZXcoKSk7XHJcbiAgY2FyZEZvcm1Qb3B1cC5jbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5jYXJkRm9ybVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBwcm9maWxlRWRpdFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjcHJvZmlsZUVkaXRcIiwgKGRhdGEpID0+IHtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcclxuICBwcm9maWxlRWRpdFBvcHVwLmNsb3NlTW9kYWwoKTtcclxufSk7XHJcbnByb2ZpbGVFZGl0UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbi8vIENhcmQgQnV0dG9uIFN0YXRlc1xyXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgYWRkQ2FyZFZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBjYXJkRm9ybVBvcHVwLm9wZW5Nb2RhbCgpO1xyXG59KTtcclxuXHJcbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XHJcbiAgcHJvZmlsZU5hbWVJbnB1dC52YWx1ZSA9IGRhdGEudXNlck5hbWU7XHJcbiAgcHJvZmlsZU9jY3VwYXRpb25JbnB1dC52YWx1ZSA9IGRhdGEudXNlckpvYjtcclxuICBhZGRQcm9maWxlVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gIHByb2ZpbGVFZGl0UG9wdXAub3Blbk1vZGFsKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiZGF0YSIsImNhcmRzZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsIl9jYXJkRWxlbWVudCIsInJlbW92ZSIsImNhcmRMaWtlQnV0dG9uIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiX2xpbmsiLCJsaW5rIiwiX25hbWUiLCJuYW1lIiwiX2NhcmRzZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlIiwiY2FyZERlbGV0ZUJ1dHRvbiIsIl9oYW5kbGVEZWxldGUiLCJfY2FyZEltYWdlIiwic3JjIiwiX2NhcmRUaXRsZSIsInRleHRDb250ZW50IiwiZ2V0VmlldyIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsImFsdCIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtRWxlbWVudCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJlcnJvck1lc3NhZ2VFbCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJpc1ZhbGlkIiwiX2NoZWNrRm9ybVZhbGlkaXR5IiwiX2lucHV0RWxzIiwiX3N1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwiaW5wdXRzIiwiZXZlcnkiLCJpbnB1dCIsInZhbGlkaXR5IiwidmFsaWQiLCJfdG9nZ2xlSW5wdXRFcnJvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZXZlbnQiLCJkaXNhYmxlU3VibWl0QnV0dG9uIiwicmVzZXRWYWxpZGF0aW9uIiwiZW5hYmxlVmFsaWRhdGlvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJfZXhpdEJ1dHRvbiIsIl9oYW5kbGVFc2NVcCIsImJpbmQiLCJldnQiLCJrZXkiLCJjbG9zZU1vZGFsIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJfY2xvc2VQb3B1cFdpdGhPdmVybGF5Iiwib3Blbk1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoRm9ybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlU3VibWl0IiwiX2Zvcm1FbCIsIl9zYXZlQnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRWYWx1ZXMiLCJ2YWx1ZSIsInJlc2V0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsIlBvcHVwV2l0aEltYWdlIiwiX3ByZXZpZXdJbWFnZSIsIl9wcmV2aWV3VGl0bGUiLCJTZWN0aW9uIiwic2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsIl9pdGVtcyIsInJlbmRlckl0ZW1zIiwiZWxlbSIsImFkZEl0ZW0iLCJpdGVtIiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZUVsZW1lbnQiLCJqb2JFbGVtZW50IiwiX3Byb2ZpbGVOYW1lIiwiX3Byb2ZpbGVKb2IiLCJnZXRVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInNldFVzZXJJbmZvIiwiZGVzY3JpcHRpb24iLCJwcm9maWxlRWRpdFBvcHVwRWwiLCJlZGl0UHJvZmlsZUJ1dHRvbiIsImFkZENhcmRCdXR0b24iLCJwcm9maWxlTmFtZUlucHV0IiwicHJvZmlsZUZvcm1FbGVtZW50IiwiYWRkRm9ybUVsZW1lbnQiLCJwcm9maWxlT2NjdXBhdGlvbklucHV0IiwibmFtZUVsIiwiam9iRWwiLCJpbml0aWFsQ2FyZHMiLCJzZWxlY3RvcnMiLCJhZGRDYXJkVmFsaWRhdG9yIiwiYWRkUHJvZmlsZVZhbGlkYXRvciIsInVzZXJJbmZvIiwiY2FyZExpc3QiLCJjYXJkRGF0YSIsImNhcmQiLCJyZW5kZXJDYXJkIiwicHJldmlld1BvcHVwIiwiY2FyZEZvcm1Qb3B1cCIsInByb2ZpbGVFZGl0UG9wdXAiXSwic291cmNlUm9vdCI6IiJ9