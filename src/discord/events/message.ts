import { Message as DMessage } from "discord.js";

import { Guild, Message } from "../../database/entities";

export async function onMessage(message: DMessage) {
    const dbGuild = await Guild.createOrUpdate(message.guild);
    console.log(`Added guild (${dbGuild.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    console.log(`Added message (${dbMessage.id}) to the database.`);
}