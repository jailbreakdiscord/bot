import { Message as DMessage } from "discord.js";
import { GuildMember } from "../../../database/entities/GuildMember";
import { generateXP } from "./generateXP";
export async function onMessageXp(message: DMessage) {
    // XP is only a thing in guilds.
    if (!message.guild) return;
    // We're certain that the member will have been created, since this function is called after the `createOrUpdate` call in `onMessage`.
    const dbMember: GuildMember | undefined = await GuildMember.findOne({
        id: message.member.id
    });
    if (dbMember !== undefined) {
        dbMember.xp += await generateXP(dbMember);
        return dbMember.save();
    }
}
