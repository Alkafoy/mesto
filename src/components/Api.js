export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _responseHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(res => {
                return this._responseHandler(res);
            })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(res => {
                return this._responseHandler(res);
            })
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(this._responseHandler)
    }

    editAvatar(data) {
        return fetch(
            `${this._baseUrl}/users/me/avatar`,{
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar,
                })
            }
        )
            .then(this._responseHandler)
    }

    addCard(data) {
        return fetch(
            `${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.title,
                    link: data.link
                })
            })
            .then(this._responseHandler)
    }

    addLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this._authorization
                }
            })
            .then(this._responseHandler)
    }

    deleteLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization
                }
            })
            .then(this._responseHandler)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization
                }
            })
            .then(this._responseHandler)
    }
}