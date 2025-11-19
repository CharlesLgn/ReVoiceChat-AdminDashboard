import Fetcher from "./fetcher.js";

export default class ReVoiceChatAdmin {
    #currentTab;
    #token

    constructor(){
        this.#selectEventHandler()
        this.#select('overview');

        const storedCoreUrl = localStorage.getItem("lastHost");
        if (!storedCoreUrl) {
            document.location.href = `index.html`;
        }
        const core = new URL(storedCoreUrl);
        this.coreUrl = `${core.protocol}//${core.host}`;
        this.mediaUrl = `${core.protocol}//${core.host}/media`;
        const storedToken = getCookie("jwtToken");
        if (storedToken) {
            this.#token = storedToken;
        } else {
            document.location.href = `index.html`;
        }

        this.fetcher = new Fetcher(this.#token, this.coreUrl, this.mediaUrl);
    }

    // Token
    getToken() {
        return this.#token;
    }

    #select(name) {
        if (this.#currentTab) {
            document.getElementById(`server-setting-tab-${this.#currentTab}`).classList.remove("active");
            document.getElementById(`server-setting-content-${this.#currentTab}`).classList.add("hidden");
        }

        this.#currentTab = name;
        document.getElementById(`server-setting-tab-${this.#currentTab}`).classList.add('active');
        document.getElementById(`server-setting-content-${this.#currentTab}`).classList.remove('hidden');
    }

    #selectEventHandler() {
        const parameters = ['overview', 'members'];
        for (const param of parameters) {
            document.getElementById(`server-setting-tab-${param}`).addEventListener('click', () => this.#select(param));
        }
    }
}