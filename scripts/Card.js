export class Card {
    constructor(name, link, template, fillerZoom) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._fillerZoom = fillerZoom;
    }

    //то есть это
    _getTemplate() {
        return this._template
            .content.querySelector('.element')
            .cloneNode(true)
    }

    _switchLike() {
        this._likeButton.classList.toggle('element__like_active');
    };

    _removerCard() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._likeButton = this._card.querySelector('.element__like');
        this._trashButton = this._card.querySelector('.element__trash');
        this._placeImage = this._card.querySelector('.element__image');
        this._likeButton.addEventListener('click', () => {
            this._switchLike();
        })
        this._trashButton.addEventListener('click', () => {
            this._removerCard();
        })
        this._placeImage.addEventListener('click', () => {
            this._fillerZoom(this._name, this._link);
        });
    }

    createCard() {
        this._card = this._getTemplate();
        this._setEventListeners();
        this._cardCaption = this._card.querySelector(".element__text");
        this._placeImage = this._card.querySelector('.element__image');
        this._placeImage.src = this._link;
        this._placeImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        return this._card;
    }
}