import ReVoiceChatAdmin from './app/revoicechatadmin.js';

const RVCA = new ReVoiceChatAdmin();

// Ready state
document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.dataset.theme = localStorage.getItem("Theme") || "dark";
});