import { Logger } from "dd-botkit";
import { Message as DMessage } from "discord.js";
import { Guild, Message } from "../../database/entities";


export async function onMessage(message: DMessage) {
    const dbGuild = await Guild.createOrUpdate(message.guild);
    Logger.info(`Added guild (${dbGuild.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    Logger.info(`Added message (${dbMessage.id}) to the database.`);
}