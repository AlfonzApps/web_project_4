import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';

export { openImagePreviewPopup };

const obj = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupShow = document.querySelector(".popup_type_show");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupCloseIconEdit = popupEdit.querySelector(".popup__close-icon");
const popupInputName = popupEdit.querySelectorAll(".popup__input")[0];
const popupInputAbout = popupEdit.querySelectorAll(".popup__input")[1];

const popupFormAdd = popupAdd.querySelector(".popup__form");
const popupCloseIconAdd = popupAdd.querySelector(".popup__close-icon");
const popupInputTitle = popupAdd.querySelectorAll(".popup__input")[0];
const popupInputUrl = popupAdd.querySelectorAll(".popup__input")[1];

const popupCloseIconShow = popupShow.querySelector(".popup__close-icon");
const popupImageDescription = popupShow.querySelector(".popup__description")
const popupImage = popupShow.querySelector(".popup__image");

const elementsList = document.querySelector(".elements__list");

const elementTemplate = document.querySelector("#element-template").content;

const formValidatorEdit = new FormValidator(obj, popupFormEdit);
const formValidatorAdd = new FormValidator(obj, popupFormAdd);

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

function openModalWindow(modalWindow) {
    modalWindow.classList.add("popup_opened");
    document.addEventListener('keydown', closeModalByEscKey);
    modalWindow.addEventListener("click", closeModalByOutsideClick);
}

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeModalByEscKey);
    modalWindow.removeEventListener("click", closeModalByOutsideClick);
}

function closeModalByEscKey(evt) {
    if(evt.key === 'Escape'){
        closeModalWindow(document.querySelector(".popup_opened"))
    }
} 

function closeModalByOutsideClick(evt) {
    if(evt.target.classList.contains("popup_opened")){
        closeModalWindow(evt.target);
    }
} 

function openEditProfilePopup() {
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
    formValidatorEdit.resetValidation();
    openModalWindow(popupEdit);
} 

function openAddPlacePopup() {
    popupFormAdd.reset();
    formValidatorAdd.resetValidation();
    openModalWindow(popupAdd);
}

function openImagePreviewPopup(elementData) {
    openModalWindow(popupShow);
    popupImageDescription.textContent = elementData.name;
    popupImage.setAttribute("src", elementData.link);
    popupImage.setAttribute("alt", elementData.name);
}

function saveProfileData(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closeModalWindow(popupEdit);
}

function saveNewPlace(event) {
    event.preventDefault();
    const card = new Card({name: popupInputTitle.value, link: popupInputUrl.value}, elementTemplate);
    prependPlace(card.generateCard());
    closeModalWindow(popupAdd);
}

function prependPlace(element){
    elementsList.prepend(element);
}

initialCards.forEach(element => {
    const card = new Card(element, elementTemplate);
    prependPlace(card.generateCard());
});

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", openAddPlacePopup);

popupFormEdit.addEventListener("submit", saveProfileData);
popupFormAdd.addEventListener("submit", saveNewPlace);

popupCloseIconEdit.addEventListener("click", () => {
    closeModalWindow(popupEdit);  
  });

popupCloseIconAdd.addEventListener("click", () => {
    closeModalWindow(popupAdd);  
  });

popupCloseIconShow.addEventListener("click", () => {
    closeModalWindow(popupShow);  
  });

  
