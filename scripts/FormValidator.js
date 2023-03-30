export class FormValidator {
    constructor(validationConfig, formElement) {
        this._config = validationConfig;
        this._formElement = formElement;
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        // Находим элемент ошибки внутри элемента формы
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        // Добавляем класс ошибки в элемент ввода
        inputElement.classList.add(this._config.inputErrorClass);
        // Добавляем сообщение об ошибке
        errorElement.textContent = errorMessage;
    };
    _hideInputError = (formElement, inputElement) => {
        // Находим элемент ошибки внутри элемента формы
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        // Удаляем класс ошибки из элемента ввода
        inputElement.classList.remove(this._config.inputErrorClass);
        // Сбрасываем сообщение об ошибке
        errorElement.textContent = '';
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _checkInputValidity = (formElement, inputElement) => {
        // Если ввод недопустим
        if (!inputElement.validity.valid) {
            // Показываем сообщение об ошибке
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            // Скрываем сообщение об ошибке
            this._hideInputError(formElement, inputElement);
        }
    };
    _toggleButtonState = (inputList, buttonElement, config) => {
        // Если есть хотя бы один недопустимый ввод
        if (this._hasInvalidInput(inputList)) {
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
    _setEventListeners = (formElement, config) => {
        // Находим все элементы ввода внутри формы
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        // Находим кнопку отправки формы внутри формы
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        // Переключаем состояния кнопки при изменении ввода
        this._toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
        // Для каждого элемента ввода
        inputList.forEach((inputElement) => {
            // При изменении ввода
            inputElement.addEventListener('input', () => {
                // Проверяем допустимость ввода
                this._checkInputValidity(formElement, inputElement);
                // Переключаем состояние кнопки
                this._toggleButtonState(inputList, buttonElement, this._config);
            });
        });
        // Добавляем обработчик события reset для формы
        formElement.addEventListener('reset', () => {
            // Сбрасываем классы и текст ошибок для всех элементов ввода в форме
            inputList.forEach((inputElement) => {
                this._hideInputError(formElement, inputElement);
            });
            // Сбрасываем состояние кнопки
            this._toggleButtonState(inputList, buttonElement, config);
        });
    };
    enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement, config);
        });
    };
    _resetInputError = (formElement, config) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(formElement, inputElement)
        });
    };
    resetValidation = (formElement, config) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        this._resetInputError(formElement, config);
        this._toggleButtonState(inputList, buttonElement, config);
    };
}