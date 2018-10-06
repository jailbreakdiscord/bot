import { 
    Guild as DGuild, 
    User as DUser,
    GuildMember as DMember
} from "discord.js";

import { Guild } from "../../database/entities";
import { Logger } from "dd-botkit";

export async function guildCreate(guild: DGuild) {
    const dbGuild = await Guild.createOrUpdate(guild);
    Logger.log(`Added guild (${dbGuild.id}) to the database.`);
}

export function guildDelete(guild: DGuild) {}

export function guildBanAdd(guild: DGuild, user: DUser) {}

export function guildBanRemove(guild: DGuild, user: DUser) {}

export function guildUpdate(guild: DGuild) {}

export function guildMemberAdd(member: DMember) {}

export function guildMemberRemove(member: DMember) {}