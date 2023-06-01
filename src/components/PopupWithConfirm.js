import {Popup} from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._submitCallBack = submitCallBack;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallBack({card: this._card, cardId: this._cardId});
        })
    }

    open = ({card, cardId}) => {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }
}