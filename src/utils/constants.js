//получаем объекты для редактирование профиля
export const buttonEdit = document.querySelector('.profile__edit-button');
export const popupEdit = document.querySelector(".popup_handle_edit");
//получаем объекты полей формы редактирования профиля
export const formElementEdit = popupEdit.querySelector('.popup__form');
export const nameInput = formElementEdit.querySelector('.popup__input_type_name');
export const jobInput = formElementEdit.querySelector('.popup__input_type_job');
//получаем объекты списка, в который нужно вставлять карточки
export const cardsContainer = document.querySelector('.elements__list');
//получаем объекты для создания новой карточки
export const buttonAdd = document.querySelector('.profile__add-button');
export const popupAdd = document.querySelector('.popup_handle_add');
//получаем объекты полей формы создания новой карточки
export const formElementAdd = popupAdd.querySelector('.popup__form');
export const pictureTitleInput = formElementAdd.querySelector('.popup__input_type_picture-title');
export const pictureLinkInput = formElementAdd.querySelector('.popup__input_type_picture-link');
export const formCreate = popupAdd.querySelector('.popup__form_add');
//получаем объекты для создания увеличенного изображения
export const popupZoom = document.querySelector('.popup-zoom');
export const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
export const popupZoomCaption = popupZoom.querySelector('.popup-zoom__caption');
// получаем набор селекторов для валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error'
};