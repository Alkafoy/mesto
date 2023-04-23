export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const info = this._infoElement.textContent;
        return {name, info};
    }

    setUserInfo(name, info) {
        this._nameElement.textContent = name;
        this._infoElement.textContent = info;
    }
}