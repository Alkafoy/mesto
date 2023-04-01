export class FormValidator {
    constructor(validationConfig, formElement) {
        this._config = validationConfig;
        this._formElement = formElement;
        // Находим все элементы ввода внутри формы
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        // Находим кнопку отправки формы внутри формы
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError = (inputElement, errorMessage) => {
        // Находим элемент ошибки внутри элемента формы
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Добавляем класс ошибки в элемент ввода
        inputElement.classList.add(this._config.inputErrorClass);
        // Добавляем сообщение об ошибке
        errorElement.textContent = errorMessage;
    }
    _hideInputError = (inputElement) => {
        // Находим элемент ошибки внутри элемента формы
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Удаляем класс ошибки из элемента ввода
        inputElement.classList.remove(this._config.inputErrorClass);
        // Сбрасываем сообщение об ошибке
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _checkInputValidity = (inputElement) => {
        // Если ввод недопустим
        if (!inputElement.validity.valid) {
            // Показываем сообщение об ошибке
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            // Скрываем сообщение об ошибке
            this._hideInputError(inputElement);
        }
    };
    _toggleButtonState = () => {
        // Если есть хотя бы один недопустимый ввод
        if (this._hasInvalidInput()) {
            // Сделаем кнопку неактивной
            this._buttonElement.disabled = true;
            // Добавляем класс неактивной кнопке
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        } else {
            // Сделаем кнопку активной
            this._buttonElement.disabled = false;
            // Удаляем класс неактивной кнопки
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    };
    _setEventListeners = () => {
        // Переключаем состояния кнопки при изменении ввода
        this._toggleButtonState();
        // Для каждого элемента ввода
        this._inputList.forEach((inputElement) => {
            // При изменении ввода
            inputElement.addEventListener('input', () => {
                // Проверяем допустимость ввода
                this._checkInputValidity(inputElement);
                // Переключаем состояние кнопки
                this._toggleButtonState();
            });
        });
        // Добавляем обработчик события reset для формы
        this._formElement.addEventListener('reset', () => {
            // Сбрасываем классы и текст ошибок для всех элементов ввода в форме
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
            // Сбрасываем состояние кнопки
            this._toggleButtonState();
        });
    };
    enableValidation = () => {
            this._setEventListeners();
        }

    _resetInputError = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    };
    resetValidation = () => {
        this._resetInputError();
        this._toggleButtonState();
    };
}