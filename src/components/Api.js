export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUsersInfo(date) {
    return fetch(`${this._baseUrl}/kmrd/schedule/settings.php?date=${date}`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }

  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "GET",
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }

  // patchUserInfo(userData) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify(userData)
  //   }).then(this._checkResponse);
  // }

  // postCard(cardData) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify(cardData)
  //   }).then(this._checkResponse);
  // }

  // deleteCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }

  // like(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }

  // dislike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }

  // patchUserAvatar(userData) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify(userData)
  //   }).then(this._checkResponse);
  // }
}
