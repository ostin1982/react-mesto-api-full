class Api {
    constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    }

    _addCommonFetchForAllApis(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка:${res.status}`);            
        } else {
            return res.json();
        }
    }

    //Получить карточки с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
    })
        .then(this._addCommonFetchForAllApis);
    }

    //Блок работы с карточками
    //Добавление карточки
    addNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
                })
            })
            .then(this._addCommonFetchForAllApis);
    }

    //Удаление карточки
    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}`, {
            method: "DELETE",
            headers: this._headers,
            body: JSON.stringify(card)
        })
        .then(this._addCommonFetchForAllApis);;
    }

    //Лайк картинке
    addLikeCard(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify(card)
        })
        .then(this._addCommonFetchForAllApis);
    }

    //Удаление лайк картинке
    deleteLikeCard(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify()
        })
        .then(this._addCommonFetchForAllApis);
    } 

    //Статус лайка
    changeLikeCardStatus(card, isLiked) {
        if (isLiked) {
            return this.deleteLikeCard(card)
        }
        else {
            return this.addLikeCard(card)
        }
    }

    //Блок работы с профилем
    //Получить данные пользователя
    getUserInfoAbout() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then(this._addCommonFetchForAllApis);
    }

    //Редактировать данные пользователя
    changeInfo(userData) {
        return fetch(`${this._baseUrl }/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
        .then(this._addCommonFetchForAllApis);
    }

    //Редактировать аватар пользователя
    changeUserAvatar(imgSrc) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: imgSrc
            })
        })
        .then(this._addCommonFetchForAllApis);
    }

}

export const api = new Api({
    baseUrl: 'https://api.ostin.student.nomoredomains.club', 
    headers: {
        'Content-Type': 'application/json',
    },
});
