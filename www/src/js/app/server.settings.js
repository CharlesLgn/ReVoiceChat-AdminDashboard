export class ServersSettings {

  constructor(RVCA) {
    this.RVCA = RVCA
  }

  load() {
    this.RVCA.fetcher.fetchCore("/server").then((servers) => {
      const serversNode = document.getElementById("overview-server-list");
      serversNode.innerHTML = "";
      for (const server of servers) {
        const DIV = document.createElement('div');
        DIV.id = server.id;
        DIV.className = "server config-item";
        DIV.appendChild(this.#buildInfos(server))
        serversNode.appendChild(DIV)
      }
    });
  }

  #buildInfos(server) {
    const serverInfos = document.createElement('div');
    serverInfos.className = "card-list"
    serverInfos.appendChild(this.#serverName(server))
    serverInfos.appendChild(this.#idTooltip(server))
    return serverInfos;
  }

  #idTooltip(server) {
    const serverId = document.createElement('span');
    serverId.className = "id-tooltip"
    serverId.innerText = server.id
    return serverId;
  }

  #serverName(server) {
    const serverName = document.createElement('span');
    serverName.innerText = server.name
    return serverName;
  }
}