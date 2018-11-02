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
        if (!dbMember) await DBGuildMember.createOrUpdate(member, dbGuild!);
        await member.addRole(this.muteRole);
        await getPublicLogger().send({
            type: "mute",
            duration,
            member,
            moderator: message.author,
            reason
        });

        // Shorter equivalent of `valueOf`.
        let unmuteAt = Math.floor(+new Date() / 1000);

        // Add minutes to the timestamp.
        unmuteAt += duration * 60;
        console.log(unmuteAt);

        dbMember!.unmuteAt = unmuteAt.toString();
        return dbMember!.save();
    }

    public async unmute(member: GuildMember) {
        return member.removeRole(this.muteRole);
    }

    public async bindCron() {
        // Every minute.
        schedule("* * * * *", async () => {
            const timestamp = Math.floor(+new Date() / 1000);
            const dbMembers = await DBGuildMember.find({
                where: { guildID: this.guild.id }
            });

            for (const member of dbMembers) {
                if (member.unmuteAt === "0") return;

                // Check if member should be unmuted
                if (timestamp > +member.unmuteAt) {
                    const dMember = await this.guild.fetchMember(member.id);
                    await dMember.removeRole(this.muteRole);
                    member.unmuteAt = "0";
                    return member.save();
                }
            }
        });
    }
}
