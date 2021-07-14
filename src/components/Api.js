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
    return fetch(`${this._baseUrl}?date=${date}`)
    .then(this._checkResponse);
  }

  postUsersInfo(data) {
    return fetch(`${this._baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    })
    .then(this._checkResponse);
  }

  getSettings() {
    let formdata = new FormData();
    formdata.append("action", "get_schedule");
    return fetch(`${this._baseUrl}`, {
      method: "POST",
      body: formdata,
      redirect: 'follow'
    })
    .then(this._checkResponse);
  }

  saveSettings(data) {
    return fetch(`${this._baseUrl}`, {
      method: "POST",
      body: data,
      redirect: 'follow'
    })
    .then(this._checkResponse);
  }
}
