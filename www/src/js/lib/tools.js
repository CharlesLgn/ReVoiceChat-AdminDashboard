const SwalCustomClass = {
    title: "swalTitle",
    popup: "swalPopup",
    cancelButton: "swalCancel",
    confirmButton: "swalConfirm",
}

/**
 * Set a cookie to browser / tauri
 * @param name Name of cookie
 * @param value Data of cookie
 * @param days Expiration (in days)
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Strict";
}

/**
 * Get a cookie from browser / tauri
 * @param name Name of cookie to read/get
 * @returns Data of cookie
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        let cookie = c.trim();
        if (cookie.startsWith(nameEQ)) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

/**
 * Erase a named cookie
 * @param name Name of the cookie
 */
function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999; path=/";
}

/**
 * Fetch wrapper for Tauri
 * @param url
 * @param options
 * @returns function to use
 */
async function apiFetch(url, options = {}) {
    return fetch(url, options);
}