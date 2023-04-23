export class Popup {

    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupItem.addEventListener('mousedown', this._handleOverlayClose);
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupItem.removeEventListener('mousedown', this._handleOverlayClose);
    }

    setEventListeners() {
        this.buttonClose = this._popupItem.querySelector('.popup__close');
        this.buttonClose.addEventListener('click', () => {
            this.close();
        });
        this._popupItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
}