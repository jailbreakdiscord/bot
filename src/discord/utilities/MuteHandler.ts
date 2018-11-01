import {
    Guild,
    Client,
    GuildMember,
    RoleResolvable,
    Message
} from "discord.js";
import { schedule } from "node-cron";
import { GuildMember as DBGuildMember } from "../../database/entities/GuildMember";
import { Guild as DBGuild } from "../../database/entities/Guild";
import { getPublicLogger } from "../index";

/* tslint:disable */

export class MuteHandler {
    public guild: Guild;
    public muteRole: RoleResolvable;
    private _client: Client;
    public constructor(
        client: Client,
        guildID: string,
        muteRole: RoleResolvable
    ) {
        this._client = client;
        this.guild = this._client.guilds.get(guildID)!;
        if (typeof muteRole === "string") {
            this.muteRole = this.guild.roles.get(muteRole)!;
        } else {
            this.muteRole = muteRole;
        }
    }
    /**
     *
     * @param member Member to be muted
     * @param duration Duration in hours.
     */
    public async mute(
        message: Message,
        member: GuildMember,
        duration: number,
        reason: string
    ) {
        const dbMember = await DBGuildMember.findOne({
            where: { id: member.id }
        });
        const dbGuild = await DBGuild.findOne({
            where: { id: member.guild.id }
        });
        console.log(dbMember);

        if (!dbMember) await DBGuildMember.createOrUpdate(member, dbGuild!);
        await member.addRole(this.muteRole);
        await getPublicLogger().send({
            type: "mute",
            duration,
            member,
            moderator: message.author,
            reason
        });
        // TODO: fix this garbage
        dbMember!.muteDuration = duration;
        return dbMember!.save();
    }

    public static async bindCron(guildID: string) {
        schedule("* * * * *", async () => {
            const dbMembers = await DBGuildMember.find({
                where: { id: guildID }
            });
            for (const member of dbMembers) {
                // FIXME: make this not shit
                // will be 0 if not muted
                if (member.muteDuration === 0) return;
                member.muteDuration -= 1;
                member.save();
            }
        });
    }
}
