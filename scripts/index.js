import {initialCards} from "./cards.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

//получаем объекты для редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector(".popup_handle_edit");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//получаем объекты полей формы редактирования профиля
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');
const formEdit = popupEdit.querySelector('.popup__form_edit');
//получаем объекты списка, в который нужно вставлять карточки
const cardsContainer = document.querySelector('.elements').querySelector('.elements__list');
//получаем объекты для создания новой карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector(".popup_handle_add");
const cardTemplate = document.querySelector('#template-element');
//получаем объекты полей формы создания новой карточки
const formElementAdd = popupAdd.querySelector('.popup__form');
const pictureTitleInput = formElementAdd.querySelector('.popup__input_type_picture-title');
const pictureLinkInput = formElementAdd.querySelector('.popup__input_type_picture-link');
const formCreate = popupAdd.querySelector('.popup__form_add');
//получаем объекты для создания увеличенного изображения
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
const popupZoomCaption = popupZoom.querySelector('.popup-zoom__caption');
// получаем набор селекторов для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error'
};
const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);
//функция закрытия попапов по нажатию клавиши esc
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

// функция закрытия попапов по клику на оверлей
function closePopupByOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
}

function renderCard(name, link) {
    const card = new Card(name, link, cardTemplate, fillerZoom);
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);
}


function handleFormEditSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
}

//добавляем содержимое заголовка и подзаголовка в формы и открываем попап
function openEditPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    formValidatorEdit.resetValidation(formEdit, validationConfig);
    openPopup(popupEdit);
}

//открываем попап по нажатию кнопки создания
buttonAdd.addEventListener('click', () => {
    formCreate.reset();
    formValidatorAdd.resetValidation(formCreate, validationConfig);
    openPopup(popupAdd)
});

//закрываем попап с добавлением новой карточки
formElementAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard(pictureTitleInput.value, pictureLinkInput.value);
    closePopup(popupAdd);
    pictureTitleInput.value = '';
    pictureLinkInput.value = '';
});
//получаем все кнопки закрытия попапов и вешаем на них слушатели
document.querySelectorAll('.popup__close-icon').forEach(button => {
    const formPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(formPopup));
});
const fillerZoom = (name, link) => {
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomCaption.textContent = name;
    openPopup(popupZoom);
}
document.addEventListener('click', closePopupByOverlay)
//открываем попап по нажатию кнопки редактирования
buttonEdit.addEventListener('click', openEditPopup);
//закрываем попап с сохранением введённых значений
formElementEdit.addEventListener('submit', handleFormEditSubmit);
//добавляем карточки по умолчанию
initialCards.forEach(({name, link}) => {
    renderCard(name, link);
});

formValidatorAdd.enableValidation(validationConfig);
formValidatorEdit.enableValidation(validationConfig);