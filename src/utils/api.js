export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  getInitialCards = () => {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._checkServerResponse);
  };

  getProfileData = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this._checkServerResponse);
  };

  getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getProfileData()]);
  }

  updateProfileData = (name, about) => {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkServerResponse);
  };

  addNewCard = (data) => {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkServerResponse);
  };

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  addLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "PUT",
    }).then(this._checkServerResponse);
  }

  removeLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this._checkServerResponse);
  }

  setUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkServerResponse);
  }
}

// // Api config
// // Token: b9a1bbc7-9041-4365-a327-38782162fa8e Group ID: group-12
// export const apiConfig = {
//   baseUrl: "https://around.nomoreparties.co/v1/group-12",
//   headers: {
//     authorization: "b9a1bbc7-9041-4365-a327-38782162fa8e",
//     "Content-Type": "application/json",
//   },
// };
