export class Card {
    constructor(name, link, templateSelector, fillerZoom) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._fillerZoom = fillerZoom;
    }

    _getTemplate() {
        return this._templateSelector
            .content.querySelector('.element')
            .cloneNode(true);
    }

    _switchLike() {
        this._card.classList.toggle('element__like_active');
    };

    _removerCard() {
        this._card.remove();
        this._card = null;
    }

    // _handlerZoom = () => {
    //     this._fillerZoom(this._link, this._name);
    // }

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
        placeImage.addEventListener('click', () => {
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