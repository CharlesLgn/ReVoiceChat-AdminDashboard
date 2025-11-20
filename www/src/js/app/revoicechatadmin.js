import Fetcher from "./fetcher.js";
import {InvitationSettings} from "./invitation.settings.js";
import {LogoutComponent} from "./logout.js";
import {UsersSettings} from "./users.settings.js";
import {ServersSettings} from "./server.settings.js";
import {TechnicalParametersSettings} from "./technical.parameters.settings.js";

class ReVoiceChatAdmin {
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
        this.invitationSettings = new InvitationSettings(this)
        this.logoutComponent = new LogoutComponent(this)
        this.usersSettings = new UsersSettings(this)
        this.serversSettings = new ServersSettings(this)
        this.technicalParametersSettings = new TechnicalParametersSettings(this)
        document.addEventListener('DOMContentLoaded', () => this.#load());
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

    #load() {
        this.invitationSettings.load();
        this.logoutComponent.load();
        this.usersSettings.load();
        this.serversSettings.load();
        this.technicalParametersSettings.load();
    }
}

window.RVCA = new ReVoiceChatAdmin();