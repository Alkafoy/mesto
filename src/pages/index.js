import "./index.css";
import {initialCards} from "../utils/cards.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {
    buttonAdd,
    buttonEdit,
    cardsContainer, formCreate,
    formElementAdd,
    formElementEdit, jobInput,
    nameInput, pictureLinkInput, pictureTitleInput, popupAdd, popupEdit,
    validationConfig
} from "../utils/constants.js";

const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);

//создаём объект, который получает данные пользователя из профиля
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    infoSelector: '.profile__description'
})

//создаём объект всплывающее окно для редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_handle_edit',
    (data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
    }
);
popupEditProfile.setEventListeners();

//создаём объект всплывающая увеличенная картинка
const popupWithImage = new PopupWithImage('.popup-zoom');
popupWithImage.setEventListeners();
const handleCardClick = (name, link) => {
    popupWithImage.open(name, link);
}

//добавляем карточки по умолчанию
const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const defaultCard = new Card(cardData.name, cardData.link, '#template-element', handleCardClick)
        cardSection.addItem(defaultCard.createCard());
    }
}, '.elements__list');
cardSection.renderItems();

function generateCard(name, link) {
    const card = new Card(name, link, '#template-element', handleCardClick);
    return card.createCard();
}

//создаём объект всплывающее окно для добавления карточки
const popupAddCard = new PopupWithForm('.popup_handle_add', () => {
    cardSection.addItem(generateCard(pictureTitleInput.value, pictureLinkInput.value));
    popupAddCard.close();
});
popupAddCard.setEventListeners();
//добавляем содержимое заголовка и подзаголовка в формы и открываем попап
const editPopup = () => {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.info;
    formValidatorEdit.resetValidation();
    popupEditProfile.open();
}

// открываем попап по нажатию кнопки создания
buttonAdd.addEventListener('click', () => {
    formCreate.reset();
    formValidatorAdd.resetValidation();
    popupAddCard.open();
});

//открываем попап по нажатию кнопки редактирования
buttonEdit.addEventListener('click', editPopup);

formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();