// Escape handler
export function handleEscButton(event) {
  if (event.key == "Escape") {
    closeModalWindow();
  }
}

// Click Close Window Handler
export function modalBasementClickHandler(event) {
  if (event.target.classList.contains("modal")) {
    closeModalWindow();
  }
}

// Open and Closing Modal Window for Profile Popup
export function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_opened");
  modalWindow.addEventListener("mousedown", modalBasementClickHandler);
  document.addEventListener("keyup", handleEscButton);
}

// Open and Closing Modal Window for Card Popup
export function closeModalWindow() {
  const openedModal = document.querySelector(".modal_opened");
  openedModal.classList.remove("modal_opened");
  openedModal.removeEventListener("click", modalBasementClickHandler);
  document.removeEventListener("keyup", handleEscButton);
}
