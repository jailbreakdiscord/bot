import { Message as DMessage } from "discord.js";
import { Guild, Message, User } from "../../database/entities";
import { Logger } from "dd-botkit";
import { GuildMember } from "../../database/entities/GuildMember";
import { onMessageBadWord } from "./message/onMessageBadWord";
import { onMessageInvite } from "./message/onMessageInvite";
import { onMessageXp } from "./message/onMessageXp";

export async function onMessage(message: DMessage) {
    const dbUser = await User.createOrUpdate(message.author);
    Logger.log(`Added message (${dbUser.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    Logger.log(`Added message (${dbMessage.id}) to the database.`);

    // message.member | message.guild will only be defined if the message is in a guild.
    if (message.channel.type !== "dm") {

        const dbGuild = await Guild.createOrUpdate(message.guild);
        Logger.log(`Added guild (${dbGuild.id}) to the database.`);

        const dbMember = await GuildMember.createOrUpdate(
            message.member,
            dbGuild
        );
        Logger.log(`Added member (${dbMember.id}) to the database.`);
        await onMessageXp(message);
        await onMessageBadWord(message);
        await onMessageInvite(message);
    }
}
