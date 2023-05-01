import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupZoomImage = this._popupItem.querySelector('.popup-zoom__image');
        this._popupZoomCaption = this._popupItem.querySelector('.popup-zoom__caption');
    }
    open(name, link) {
    this._popupZoomImage.src = link;
    this._popupZoomImage.alt = name;
    this._popupZoomCaption.textContent = name;
    super.open();
    }
}