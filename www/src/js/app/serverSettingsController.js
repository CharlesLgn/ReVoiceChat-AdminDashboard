export class InvitationSettings {
    constructor(RVCA) {
        this.RVCA = RVCA
    }

    invitationEventHandler() {
        document.getElementById('server-setting-invitation-create').addEventListener('click', () => this.#invitationCreate());
    }

    async invitationLoad() {
        const result = await this.RVCA.fetcher.fetchCore(`/invitation/application`);
        if (result) {
            const list = document.getElementById("server-setting-invitation");
            list.innerHTML = "";
            for (const invitation of result) {
                if (invitation.status === 'CREATED') {
                    const item = this.#invitationCreateItem(invitation)
                    list.appendChild(item);
                }
            }
        }
    }

    async #invitationCreate() {
        const result = await this.RVCA.fetcher.fetchCore(`/invitation/application`, 'POST');
        if (result.status === "CREATED") {
            await this.invitationLoad();
            Swal.fire({
                title: `New invitation`,
                html: `<input class='swal-input' type='text' value='${result.id}' readonly>`,
                animation: false,
                customClass: SwalCustomClass,
                showCancelButton: false,
                confirmButtonText: "OK",
                allowOutsideClick: false,
            })
        }
    }

    #invitationCreateItem(data) {
        const DIV = document.createElement('div');
        DIV.id = data.id;
        DIV.className = "invitation config-item";

        // Name
        const DIV_NAME = document.createElement('div');
        DIV_NAME.className = "name invitation";
        DIV_NAME.innerText = `${data.id} (${data.status})`;
        DIV.appendChild(DIV_NAME);

        // Context menu
        const DIV_CM = document.createElement('div');
        DIV_CM.className = "context-menu";
        DIV_CM.appendChild(this.#createContextMenuButton("icon", "<revoice-icon-clipboard></revoice-icon-clipboard>", () => this.#invitationCopy(data.id)));
        DIV_CM.appendChild(this.#createContextMenuButton("icon", "<revoice-icon-trash></revoice-icon-trash>", () => this.#invitationDelete(data)));
        DIV.appendChild(DIV_CM);

        return DIV;
    }

    #invitationDelete(data) {
        Swal.fire({
            title: `Delete invitation '${data.id}'`,
            animation: false,
            customClass: {
                title: "swalTitle",
                popup: "swalPopup",
                cancelButton: "swalConfirm",
                confirmButton: "swalCancel", // Swapped on purpose !
            },
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: "Delete",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.value) {
                await this.RVCA.fetcher.fetchCore(`/invitation/${data.id}`, 'DELETE');
                await this.invitationLoad();
            }
        });
    }

    #invitationCopy(link) {
        const url = document.location.href.slice(0, -11) + `index.html?register=&invitation=${link}&host=${this.RVCA.coreUrl}`;
        copyToClipboard(url);
    }

    #createContextMenuButton(className, innerHTML, onclick, title = "") {
        const DIV = document.createElement('div');
        DIV.className = className;
        DIV.innerHTML = innerHTML;
        DIV.onclick = onclick;
        DIV.title = title;
        return DIV;
    }
}
