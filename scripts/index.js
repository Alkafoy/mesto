const buttonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const buttonClose = popup.querySelector(".popup__close-icon");
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function closePopup () {
    popup.classList.remove('popup_opened');
};

function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
};

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


// function handleOverlyClick (event) {
//     if (event.target === event.currentTarget) {
//         closePopup();
//     }
// };
// popup.addEventListener('click', handleOverlyClick);