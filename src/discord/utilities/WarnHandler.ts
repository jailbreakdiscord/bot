import { Guild, Client, GuildMember, Message } from "discord.js";
import { GuildMember as DBGuildMember } from "../../database/entities/GuildMember";
import { Guild as DBGuild } from "../../database/entities/Guild";
import { getPublicLogger } from "../index";

export class WarnHandler {
    public guild: Guild;
    private _client: Client;
    public constructor(client: Client, guildID: string) {
        this._client = client;
        this.guild = this._client.guilds.get(guildID)!;
    }

    public async warn(
        message: Message,
        member: GuildMember,
        points: number,
        reason: string
    ) {
        const dbMember = (await DBGuildMember.findOne({
            where: { id: member.id }
        }))!;
        const dbGuild = await DBGuild.findOne({
            where: { id: member.guild.id }
        });
        if (!dbMember) await DBGuildMember.createOrUpdate(member, dbGuild!);
        await getPublicLogger().send({
            type: "warn",
            points,
            member,
            moderator: message.author,
            reason
        });
        dbMember.warnpoints += points;
        if (dbMember.warnpoints > 900) {
            await (await this.guild.fetchMember(dbMember.id)).ban(
                "Warn points exceeded."
            );
            dbMember.warnpoints = 0;
        } else if (dbMember.warnpoints > 600) {
            await (await this.guild.fetchMember(dbMember.id)).kick(
                "Warn points exceeded."
            );
            dbMember.warnpoints = 0;
        } else {
            // prettier-ignore
            await member.send(`You have been warned for ${points} warnpoints with the following reason: ${reason ? reason : "none specified"}.`);
        }
        return dbMember.save();
    }
}
