// Disable TSLint for now, as these blocks are empty
/* tslint:disable */

import { Logger } from "dd-botkit";
import { Guild as DGuild, GuildMember as DMember, User as DUser } from "discord.js";
import { Guild } from "../../database/entities";


export async function guildCreate(guild: DGuild) {
    const dbGuild = await Guild.createOrUpdate(guild);
    Logger.info(`Added guild (${dbGuild.id}) to the database.`);
}

export function guildDelete(guild: DGuild) {}

export function guildBanAdd(guild: DGuild, user: DUser) {}

export function guildBanRemove(guild: DGuild, user: DUser) {}

export function guildUpdate(guild: DGuild) {}

export function guildMemberAdd(member: DMember) {}

export function guildMemberRemove(member: DMember) {}