export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._profileName = nameElement;
    this._profileJob = jobElement;
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
}
