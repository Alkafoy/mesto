//получаем объекты для редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector(".popup_handle_edit");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//получаем объекты полей формы редактирования профиля
const formElementEdit = popupEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');


//получаем объекты списка, в который нужно вставлять карточки
const cardsContainer = document.querySelector('.elements').querySelector('.elements__list');

//получаем объекты для создания новой карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector(".popup_handle_add");

//получаем объекты полей формы создания новой карточки
const formElementAdd = popupAdd.querySelector('.popup__form');
const pictureTitleInput = formElementAdd.querySelector('.popup__input_type_picture-title');
const pictureLinkInput = formElementAdd.querySelector('.popup__input_type_picture-link');

//получаем объекты для создания увеличенного изображения
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
const popupZoomCaption = popupZoom.querySelector('.popup-zoom__caption');

function openPopup (popup) {
    popup.classList.add('popup_opened');
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
};

//добавление карточки в верстку
function createCard (name, link) {
    const placeCard = document.querySelector('#template-element').content.querySelector('.element').cloneNode(true);
    const likeButton = placeCard.querySelector('.element__like');
    const trashButton = placeCard.querySelector('.element__trash');
    const placeImage = placeCard.querySelector('.element__image');    
    placeImage.src = link;
    placeImage.alt = name;
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
    placeImage.addEventListener('click', function(){
        openPopup(popupZoom);
        fillerZoom(name, link);
    });
    return placeCard;
}

function renderCard(name, link) {
    const card = createCard(name, link);
    cardsContainer.prepend(card);
}

function fillerZoom(name, link) {
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomCaption.textContent = name;
}

//добавляем карточки по умолчанию
initialCards.forEach(({name, link}) => {
    renderCard(name, link);
});

//открываем попап по нажатию кнопки создания
buttonAdd.addEventListener('click', () => {openPopup(popupAdd)});
//закрываем попап с добавлением новой карточки
formElementAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard(pictureTitleInput.value, pictureLinkInput.value);
    closePopup(popupAdd);
    pictureTitleInput.value = '';
    pictureLinkInput.value = '';
});
// popupZoomClose.addEventListener('click', () => {closePopup(popupZoom)});

function handleFormSubmit (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
};

//получаем все кнопки закрытия попапов и вешаем на них слушатели
document.querySelectorAll('.popup__close-icon').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
});

//добавляем содержимое заголовка и подзаголовка в формы и открываем попап
function openEditPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}
//открываем попап по нажатию кнопки редактирования
buttonEdit.addEventListener('click', openEditPopup);


//закрываем попап с сохранением введённых значений
formElementEdit.addEventListener('submit', handleFormSubmit);