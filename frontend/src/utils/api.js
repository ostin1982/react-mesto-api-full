class Api {
    constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    }

    _addCommonFetchForAllApis(url, init) {
        return fetch(url, init)
        .then((response) => {
            if (response.ok) {
                return response.json()
                }
            return Promise.reject(`Возникла ошибка: ${response.status}`)
        })
    }

    
    //Получить карточки с сервера
    getInitialCards() {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
    }

    //Блок работы с карточками
    //Добавление карточки
    addNewCard(card) {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify({
                name: card.name,
                link: card.link,
                })
            });
    }

    //Удаление карточки
    deleteCard(card) {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify()
        });
    }

    //Лайк картинке
    addLikeCard(card) {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify()
        });
    }

    //Удаление лайк картинке
    deleteLikeCard(card) {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify()
        });
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
        return this._addCommonFetchForAllApis(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
    }

    //Редактировать данные пользователя
    changeInfo(userData) {
        return this._addCommonFetchForAllApis(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }); 
    }

    //Редактировать аватар пользователя
    changeUserAvatar(imgSrc){
        return this._addCommonFetchForAllApis(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers:{ ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify({
                avatar: imgSrc
            })
        });
    }
}

export const api = new Api({
    baseUrl: 'https://api.ostin.student.nomoredomains.club',
    headers: {
        'Content-Type': "application/json",
    },
});
