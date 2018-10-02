import { Message as DMessage } from "discord.js";

import { Guild, Message } from "../../database/entities";
import { Logger } from "dd-botkit";

export async function onMessage(message: DMessage) {
    const dbGuild = await Guild.createOrUpdate(message.guild);
    Logger.log(`Added guild (${dbGuild.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    Logger.log(`Added message (${dbMessage.id}) to the database.`);
}
