export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _switchLike() {
        this._card.classList.toggle('element__like_active');
    };

    _removerCard() {
        this._card.remove();
        this._card = null;
    }

    _fillerZoom() {
        popupZoomImage.src = this._link;
        popupZoomImage.alt = this._name;
        popupZoomCaption.textContent = this._name;
        openPopup(popupZoom);
    }

    _setEventListeners() {
        const likeButton = this._card.querySelector('.element__like');
        const trashButton = this._card.querySelector('.element__trash');
        const placeImage = this._card.querySelector('.element__image');
        likeButton.addEventListener('click', () => {
            this._switchLike();
        })
        trashButton.addEventListener('click', () => {
            this._removerCard();
        })

        placeImage.addEventListener('click',  () => {
            this._fillerZoom(this._name, this._link);
        });
    }

    createCard() {
        this._card = this._getTemplate();
        this._setEventListeners();
        const cardCaption = this._card.querySelector(".element__text");
        const placeImage = this._card.querySelector('.element__image');
        placeImage.src = this._link;
        placeImage.alt = this._name;
        cardCaption.textContent = this._name;
        return this._card;
    }
}