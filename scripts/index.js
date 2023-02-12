const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-icon");

function toggleOpenPopup () {
    popup.classList.toggle('popup_opened');
    // console.log('клик');
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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (event) {
    event.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    toggleOpenPopup();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

