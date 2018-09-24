import { Client } from "discord.js";

import * as MessageEvent from "./message";
import * as GuildEvent from "./guild";

export function bindEventHandlersToClient(client: Client) {
    // Message Events
    client.on("message", MessageEvent.onMessage);

    // Guild Events
    client.on("guildCreate", GuildEvent.guildCreate);
    client.on("guildDelete", GuildEvent.guildDelete);
    client.on("guildBanAdd", GuildEvent.guildBanAdd);
    client.on("guildBanRemove", GuildEvent.guildBanRemove);
    client.on("guildMemberAdd", GuildEvent.guildMemberAdd);
    client.on("guildMemberRemove", GuildEvent.guildMemberRemove);
    client.on("guildUpdate", GuildEvent.guildUpdate);
}