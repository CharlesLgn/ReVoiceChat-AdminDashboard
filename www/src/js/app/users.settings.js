export class UsersSettings {

  constructor(RVCA) {
    this.RVCA = RVCA
  }

  load() {
    this.RVCA.fetcher.fetchCore("/user").then((users) => {
      this.#buildUserList("server-setting-users", Array.from(users))
      this.#buildUserList("server-setting-admins", Array.from(users).filter(u => u.type === "ADMIN"))
    });
  }

  #buildUserList(eltId, users) {
    const usersNode = document.getElementById(eltId);
    usersNode.innerHTML = "";
    for (const user of users) {
      const DIV = document.createElement('div');
      DIV.id = user.id;
      DIV.className = "user config-item";
      DIV.appendChild(this.#buildProfilPictureElement(`${this.RVCA.mediaUrl}/profiles/${user.id}`))
      DIV.appendChild(this.#buildUserInfos(user))
      usersNode.appendChild(DIV)
    }
  }

  #buildProfilPictureElement(profilePicture) {
    const profilPicture = document.createElement('img');
    profilPicture.id = "user-picture-${user.id}"
    profilPicture.src = profilePicture
    profilPicture.alt = "PFP"
    profilPicture.className = "icon ring-2"
    return profilPicture;
  }

  #buildUserInfos(user) {
    const userInfos = document.createElement('div');
    userInfos.className = "card-list"
    const DIV = document.createElement('div');
    DIV.appendChild(this.#userName(user))
    DIV.appendChild(this.#loginTooltip(user))
    userInfos.appendChild(DIV)
    userInfos.appendChild(this.#idTooltip(user))
    return userInfos;
  }

  #loginTooltip(user) {
    const userLogin = document.createElement('span');
    userLogin.innerText = `#${user.login}`
    userLogin.className = "user-login-tooltip"
    return userLogin;
  }

  #idTooltip(user) {
    const userId = document.createElement('span');
    userId.className = "user-id-tooltip"
    userId.innerText = user.id
    return userId;
  }

  #userName(user) {
    const userName = document.createElement('span');
    userName.innerText = user.displayName
    return userName;
  }
}