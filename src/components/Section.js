export class Section {

    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }

    addItemPrepend(element) {
        this._container.prepend(element);
        // console.log(element);
    }

    addItemAppend(element) {
        this._container.append(element);
        // console.log(element);
    }
}


