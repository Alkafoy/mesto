export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const info = this._infoElement.textContent;
        return {name, info};
    }

    setUserInfo({name, info, avatar}) {
        this._nameElement.textContent = name;
        this._infoElement.textContent = info;
        this._profileAvatar.src = avatar;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
}