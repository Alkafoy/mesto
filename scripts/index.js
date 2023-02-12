const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");

function toggleOpenPopup () {
    popup.classList.toggle('popup_opened');
}

function handleOverlyClick (event) {
    if (event.target === event.currentTarget) {
        toggleOpenPopup();
    }
};

editButton.addEventListener('click', toggleOpenPopup);
closeButton.addEventListener('click', toggleOpenPopup);
popup.addEventListener('click', handleOverlyClick);


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
console.log(typeof nameInput.value);
let jobInput = formElement.querySelector('.popup__input_type_job');
console.log(typeof jobInput.value);

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    toggleOpenPopup();
};

formElement.addEventListener('submit', handleFormSubmit);

