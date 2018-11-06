import { Message as DMessage } from "discord.js";
import { Guild } from "../../../database/entities";
export async function onMessageInvite(message: DMessage) {
    const dbGuild = await Guild.findOne({ where: { id: message.guild.id } });
    const invitesInMessage: string[] = [];
    for (const word of message.content.split(" ")) {
        const matches = word.match(
            /(?<=(discord\.gg\/|discordapp\.com\/invite\/|discord.me\/|discord.io\/)).+/g
        );
        if (!matches) continue;
        invitesInMessage.push(matches[0]);
    }
    if (!invitesInMessage) return;
    for (const invite of invitesInMessage) {
        // Delete message if invite is not allowed.
        if (!dbGuild!.allowedInvites.includes(invite)) return message.delete();
    }
}
