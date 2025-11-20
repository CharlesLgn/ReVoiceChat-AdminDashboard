export class LogoutComponent {
    constructor(RVCA) {
        this.RVCA = RVCA
    }

    load() {
        document.getElementById(`user-setting-tab-logout`).addEventListener('click', () => this.#logout());
    }

    #logout(){
        this.RVCA.fetcher.fetchCore(`/auth/logout`, 'GET').then(() => {
            sessionStorage.removeItem('lastState');
            localStorage.removeItem('userSettings');
            eraseCookie('jwtToken');
            document.location.href = `index.html`;
        });
    }
}
