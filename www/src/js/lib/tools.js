const tauriActive = typeof window.__TAURI__ !== 'undefined';

const SwalCustomClass = {
    title: "swalTitle",
    popup: "swalPopup",
    cancelButton: "swalCancel",
    confirmButton: "swalConfirm",
}

// Save a cookie
function setCookie(name, value, days) {
    if (tauriActive) {
        const data = {
            value: value,
            expires: days ? Date.now() + (days * 24 * 60 * 60 * 1000) : null
        };
        localStorage.setItem(`secure_${name}`, JSON.stringify(data));
    } else {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Strict";
    }
}

// Read a cookie
function getCookie(name) {
    if (tauriActive) {
        const stored = localStorage.getItem(`secure_${name}`);
        if (!stored) return null;

        try {
            const data = JSON.parse(stored);
            if (data.expires && Date.now() > data.expires) {
                localStorage.removeItem(`secure_${name}`);
                return null;
            }

            return data.value;
        } catch (e) {
            console.error('Error parsing stored data:', e);
            return null;
        }
    } else {
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
}

// Delete a cookie
function eraseCookie(name) {
    if (tauriActive) {
        localStorage.removeItem(`secure_${name}`);
    } else {
        document.cookie = name + "=; Max-Age=-99999999; path=/";
    }
}