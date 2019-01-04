// Disable TSLint for now, as these blocks are empty
/* tslint:disable */

import { Logger } from "dd-botkit";
import { Guild as DGuild, GuildMember as DMember, User as DUser } from "discord.js";
import { Guild } from "../../database/entities";
import { GuildMember } from "../../database/entities/GuildMember";

export async function guildCreate(guild: DGuild) {
    await Guild.createOrUpdate(guild);
}

export function guildDelete(guild: DGuild) {}

export function guildBanAdd(guild: DGuild, user: DUser) {}

export function guildBanRemove(guild: DGuild, user: DUser) {}

export async function guildUpdate(guild: DGuild) {
    await Guild.createOrUpdate(guild);
}

export async function guildMemberAdd(member: DMember) {
    await GuildMember.createOrUpdate(member, { id: member.guild.id } as Guild);
}

export function guildMemberRemove(member: DMember) {}