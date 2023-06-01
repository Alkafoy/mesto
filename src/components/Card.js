export class Card {
    constructor(cardsData, templateSelector, handleCardClick, openConfirmPopup, handleLikeClick) {
        this._myId = cardsData.myId
        this._name = cardsData.name;
        this._link = cardsData.link;
        this._ownerId = cardsData.owner._id;
        this._likes = cardsData.likes;
        this._numberLikes = cardsData.likes.length;
        this._cardId = cardsData._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._openConfirmPopup = openConfirmPopup;
        this.hundleLikeClick = handleLikeClick;
        this._card = this._getTemplate();
        this._likeButton = this._card.querySelector('.element__like');
        this._trashButton = this._card.querySelector('.element__trash');
        this._placeImage = this._card.querySelector('.element__image');
        this._cardCaption = this._card.querySelector(".element__text");
        this._counter = this._card.querySelector('.element__like-counter');
        // console.log(this._counter, this._counter.textContent ,this._likes.length)
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    _switchLike() {
        this.hundleLikeClick(this._likeButton, this._cardId)
    };

    toggleLike(likes) {
        this._likeButton.classList.toggle('element__like_active');
        this._counter.textContent = likes.length;
        console.log(this._counter, this._counter.textContent)
    }

    _handleDeleteCard = () => {
        this._openConfirmPopup({card: this, cardId: this._cardId});
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }


    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => {
            this._switchLike();
        })
        this._trashButton.addEventListener('click', this._handleDeleteCard)
        this._placeImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _isMyCard() {
        if (this._myId === this._ownerId)
            this._trashButton.style.display = 'block';
        else this._trashButton.style.display = 'none';
    }

    _checkLikes() {
        this._likes.forEach(element => {
            if (element._id === this._myId) {
                this._likeButton.classList.add('element__like_active');
                return
            }
        })
        this._counter.textContent = this._numberLikes;
        // console.log(this._counter, this._counter.textContent)
    }


    createCard = () => {
        this._setEventListeners();
        this._isMyCard();
        this._placeImage.src = this._link;
        this._placeImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        this._checkLikes();
        return this._card;
    }
}