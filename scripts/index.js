//получаем объекты для редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector(".popup_handle_edit");
const buttonCloseEdit = popupEdit.querySelector(".popup__close-icon");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//получаем объекты полей формы редактирования профиля
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');


//получаем объекты списка, в который нужно вставлять карточки
const elements = document.querySelector('.elements').querySelector('.elements__list');

//массив карточек по умолчанию
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//получаем объекты для создания новой карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector(".popup_handle_add");
const buttonCloseAdd = popupAdd.querySelector(".popup__close-icon");

//получаем объекты полей формы создания новой карточки
const formElementAdd = popupAdd.querySelector('.popup__form');
const pictureTitleInput = formElementAdd.querySelector('.popup__input_type_picture-title');
const pictureLinkInput = formElementAdd.querySelector('.popup__input_type_picture-link');

//получаем объекты для создания увеличенного изображения
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomClose = popupZoom.querySelector('.popup__close-icon');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
const popupZoomCaption = popupZoom.querySelector('.popup-zoom__caption');

function openPopup (popup) {
    popup.classList.add('popup_opened');
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
};

//добавление карточки в верстку
function placeCardAdd (name, link) {
    const placeCard = document.querySelector('#template-element').content.querySelector('.element').cloneNode(true);
    const likeButton = placeCard.querySelector('.element__like');
    const trashButton = placeCard.querySelector('.element__trash');
    const zoomButton = placeCard.querySelector('.element__image');
    placeCard.querySelector('.element__image').src = link;
    placeCard.querySelector('.element__image').alt = name;
    placeCard.querySelector('.element__caption').querySelector('.element__text').textContent = name;
    //переключатель состояния лайка
    function switchLike () {
        likeButton.classList.toggle('element__like_active');
    };
    likeButton.addEventListener('click', switchLike);
    //удалятель карточки
    trashButton.addEventListener('click', function () {
        const listItem = trashButton.closest('.element');
        listItem.remove();
    });
    //обработчик клика на изображение карточки
    zoomButton.addEventListener('click', function(){
        openPopupZoom(name, link);
    });
    elements.prepend(placeCard);
}

function openPopupZoom(name, link) {
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomCaption.textContent = name;
    popupZoom.classList.add('popup_opened');
}

//добавляем карточки по умолчанию
initialCards.forEach(({name, link}) => {
    placeCardAdd(name, link);
});

//открываем попап по нажатию кнопки создания
buttonAdd.addEventListener('click', () => {openPopup(popupAdd)});
//закрываем попап по нажатию кнопки с крестиком без сохранения
buttonCloseAdd.addEventListener('click', () => {closePopup(popupAdd)});
//закрываем попап с добавлением новой карточки
formElementAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    placeCardAdd(pictureTitleInput.value, pictureLinkInput.value);
    closePopup(popupAdd);
});
popupZoomClose.addEventListener('click', () => {closePopup(popupZoom)});

function handleFormSubmit (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
};

//открываем попап по нажатию кнопки редактирования
buttonEdit.addEventListener('click', () => {openPopup(popupEdit)});
//добавляем содержимое заголовка и подзаголовка в формы
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
//закрываем попап по нажатию кнопки с крестиком без сохранения
buttonCloseEdit.addEventListener('click', () => {closePopup(popupEdit)});
//закрываем попап с сохранением введённых значений
formElementEdit.addEventListener('submit', handleFormSubmit);