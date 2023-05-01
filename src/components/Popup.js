export class Popup {

    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            console.log('Keydown event:', event);
            this.close();
        }
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this.buttonClose = this._popupItem.querySelector('.popup__close-icon');
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