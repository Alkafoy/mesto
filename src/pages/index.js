import {initialCards} from "../utils/cards.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {cardsContainer, formElementAdd, formElementEdit, validationConfig} from "../utils/constants";

const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);

//создаём объект, который получает данные пользователя из профиля 48259
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    infoSelector: '.profile__description'
})
//создаём объект всплывающее окно для редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_handle_edit', {
    submitCallBack: (name, info) => {
        userInfo.setUserInfo(name, info);
        popupEditProfile.close();
    }
});
//создаём объект всплывающее окно для добавления карточки
const popupAddCard = new PopupWithForm('.popup_handle_add');
//создаём объект всплывающая увеличенная картинка
const popupWithImage = new PopupWithImage('.popup-zoom');

function generateCard(name, link) {
    const card = new Card(name, link, '#template-element', fillerZoom);
    return card.createCard();
}

function renderCard(name, link) {
    cardsContainer.prepend(generateCard(name, link))
}

//добавляем карточки по умолчанию
const cardSection = new Section({
    items: initialCards,
    renderer: (name, link) => {
        cardSection.addItem(generateCard(name, link))
    }
}, '.elements__list');
cardSection.renderItems();

const fillerZoom = (name, link) => {
    popupWithImage.open(name, link);
}

//добавляем содержимое заголовка и подзаголовка в формы и открываем попап
// function openEditPopup() {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileDescription.textContent;
//     formValidatorEdit.resetValidation();
//     openPopup(popupEdit);
// }

//открываем попап по нажатию кнопки создания
// buttonAdd.addEventListener('click', () => {
//     formCreate.reset();
//     formValidatorAdd.resetValidation();
//     openPopup(popupAdd)
// });

//закрываем попап с добавлением новой карточки
// formElementAdd.addEventListener('submit', (event) => {
//     event.preventDefault();
//     renderCard(pictureTitleInput.value, pictureLinkInput.value);
//     closePopup(popupAdd);
//     pictureTitleInput.value = '';
//     pictureLinkInput.value = '';
// });
//получаем все кнопки закрытия попапов и вешаем на них слушатели
// document.querySelectorAll('.popup__close-icon').forEach(button => {
//     const formPopup = button.closest('.popup');
//     button.addEventListener('click', () => closePopup(formPopup));
// });

//открываем попап по нажатию кнопки редактирования
// buttonEdit.addEventListener('click', openEditPopup);
// //закрываем попап с сохранением введённых значений
// formElementEdit.addEventListener('submit', handleFormEditSubmit);


formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();