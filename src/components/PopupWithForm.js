import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._submitCallBack = submitCallBack;
        this._popupForm = this._popupItem.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = Array.from(this._popupItem.querySelectorAll('.popup__input'));
        const formValues = {};
        this._inputList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallBack(this._getInputValues());

        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}