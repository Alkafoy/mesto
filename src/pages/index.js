import "./index.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithConfirm} from "../components/PopupWithConfirm.js";
import {Api} from "../components/Api.js";

import {
    buttonAdd,
    buttonEdit,
    cardsContainer, formCreate,
    formElementAdd, formElementAvatar,
    formElementEdit, jobInput,
    nameInput, pictureLinkInput, pictureTitleInput, popupAdd, popupEdit,
    validationConfig
} from "../utils/constants.js";
// import {data} from "autoprefixer";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: 'bcd105d5-b350-4b99-89b2-825c3cf63be6',
        'Content-Type': 'application/json'
    }
});
api.getUserInfo()
    .then(res => {
        userInfo.setUserInfo({name: res.name, info: res.about});
    });

api.getInitialCards()
    .then(res => console.log(res))

const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);
const formValidatorAvatar = new FormValidator(validationConfig, formElementAvatar);

//создаём объект, который получает данные пользователя из профиля
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    infoSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
})

const popupEditAvatar = new PopupWithForm(
    '.popup_handle_avatar',
    (data) => {
        api.editAvatar(data)
            .then(res => {
                userInfo.setUserInfo({
                    name: res.name,
                    info: res.about,
                    avatar: res.avatar
                })
            })
            .catch(err => console.error('Ошибка при обновлении аватара:', err))
            .finally(() => {
                popupEditAvatar.setDefaultText();
                popupEditAvatar.close();
            })
    })
//создаём объект всплывающее окно для редактирования профиля

const popupEditProfile = new PopupWithForm('.popup_handle_edit',
    (data) => {
        // const {name, info} = data;
        api.editUserInfo(data)
            .then(res => {
                userInfo.setUserInfo({
                    name: res.name,
                    info: res.about,
                    avatar: res.avatar
                })
            })
            .catch(err => console.error('Ошибка при обновлении информации о пользователе:', err))
            .finally(() => {
                popupEditProfile.setDefaultText();
                popupEditProfile.close();
            });
    }
);
//создаём объект всплывающая увеличенная картинка
const popupWithImage = new PopupWithImage('.popup-zoom');

const handleCardClick = (name, link) => {
    popupWithImage.open(name, link);
}
//создаем всплывающее окно подтверждения удаления карточки
const popupDeleteConfirm = new PopupWithConfirm(
    '.popup-confirmation',
    ({card, cardId}) => {
        api.deleteCard(cardId)
            .then((res) => {
                console.log(res)
                card.removeCard();
                popupDeleteConfirm.close();
            })
            .catch(err => console.error('Ошибка при удалении карточки:', err))
            .finally()
    })

//добавляем карточки по умолчанию
const cardSection = new Section((cardsData) => {
    cardSection.addItemAppend(generateCard(cardsData));
}, '.elements__list');

//функция создания новой карточки
function generateCard(cardsData) {
    const card = new Card(
        cardsData,
        '#template-element',
        handleCardClick,
        popupDeleteConfirm.open,
        (likeElement, cardId) => {
            if (likeElement.classList.contains('element__like_active')) {
                api.deleteLike(cardId)
                    .then(res => {
                        // console.log(res)
                        card.toggleLike(res.likes)
                    })
                    .catch(err => console.error('Ошибка при снятии лайка:', err))
            } else {
                api.addLike(cardId)
                    .then(res => {
                        // console.log(res)
                        card.toggleLike(res.likes)
                    })
                    .catch(err => console.error('Ошибка при добавлении лайка:', err))

            }
        }
    );
    return card.createCard();
}

// создаём объект всплывающее окно для добавления карточки
const popupAddCard = new PopupWithForm(
    '.popup_handle_add',
    (data) => {
        Promise.all([api.getUserInfo(), api.addCard(data)])
            .then(([
                       userData,
                       cardsData
                   ]) => {
                cardsData.myId = userData._id;
                cardSection.addItemPrepend(generateCard(cardsData));
            })
            .catch(err => console.error('Ошибка при создании карточки:', err))
            .finally(() => {
                popupAddCard.setDefaultText();
                popupAddCard.close();
            })
    });
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

popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteConfirm.setEventListeners();
buttonEdit.addEventListener('click', editPopup);

document.querySelector('.profile__avatar-edit').addEventListener('click', () => {
    formValidatorAvatar.resetValidation();
    popupEditAvatar.open();
})

formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAvatar.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([
               userData,
               cardsData
           ]) => {
        cardsData.forEach(element => element.myId = userData._id);
        userInfo.setUserInfo({
            name: userData.name,
            info: userData.about,
            avatar: userData.avatar
        });
        cardSection.renderItems(cardsData)
    })
    .catch(err => console.error('Ошибка при загрузке начальных данных:', err))