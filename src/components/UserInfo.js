export default class UserInfo {
  constructor({ nameElement, jobElement, avatarEl }) {
    this._profileName = nameElement;
    this._profileJob = jobElement;
    this._avatar = avatarEl;
  }

  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userJob: this._profileJob.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.description;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getAvatar(data) {
    return this._avatar.src;
  }
}

