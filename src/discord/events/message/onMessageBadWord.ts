import { Message as DMessage } from "discord.js";
import { Guild } from "../../../database/entities";
export async function onMessageBadWord(message: DMessage) {
    const dbGuild = await Guild.findOne({ where: { id: message.guild.id } });
    for (const badword of dbGuild!.badWords) {
        if (
            message.content
                .toLowerCase()
                .replace(" ", "")
                .replace(".", "")
                .includes(badword)
        ) {
            return message.delete();
        }
    }
}
