const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error'
};

const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри элемента формы
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Добавляем класс ошибки в элемент ввода
    inputElement.classList.add(validationConfig.inputErrorClass);
    // Добавляем сообщение об ошибке
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки внутри элемента формы
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Удаляем класс ошибки из элемента ввода
    inputElement.classList.remove(validationConfig.inputErrorClass);
    // Сбрасываем сообщение об ошибке
    errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const checkInputValidity = (formElement, inputElement) => {
    // Если ввод недопустим
    if (!inputElement.validity.valid) {
        // Показываем сообщение об ошибке
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // Скрываем сообщение об ошибке
        hideInputError(formElement, inputElement);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    // Если есть хотя бы один недопустимый ввод
    if (hasInvalidInput(inputList)) {
        // Сделаем кнопку неактивной
        buttonElement.disabled = true;
        // Добавляем класс неактивной кнопке
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        // Сделаем кнопку активной
        buttonElement.disabled = false;
        // Удаляем класс неактивной кнопки
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, config) => {
    // Находим все элементы ввода внутри формы
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // Находим кнопку отправки формы внутри формы
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    // Переключаем состояния кнопки при изменении ввода
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    // Для каждого элемента ввода
    inputList.forEach((inputElement) => {
        // При изменении ввода
        inputElement.addEventListener('input', function () {
            // Проверяем допустимость ввода
            checkInputValidity(formElement, inputElement);
            // Переключаем состояние кнопки
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
    // Добавляем обработчик события reset для формы
    formElement.addEventListener('reset', function () {
        // Сбрасываем классы и текст ошибок для всех элементов ввода в форме
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
        });
        // Сбрасываем состояние кнопки
        toggleButtonState(inputList, buttonElement, config);
    });

};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

const resetInputError = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement)
    });
};

const resetValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    resetInputError(formElement, config);
    toggleButtonState(inputList, buttonElement, config);
};

enableValidation(validationConfig);
