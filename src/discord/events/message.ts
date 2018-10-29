import { Message as DMessage } from "discord.js";

import { Guild, Message, User } from "../../database/entities";
import { Logger } from "dd-botkit";
import { GuildMember } from "../../database/entities/GuildMember";
/* tslint:disable */
export async function onMessage(message: DMessage) {
    const dbUser = await User.createOrUpdate(message.author);
    Logger.log(`Added message (${dbUser.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    Logger.log(`Added message (${dbMessage.id}) to the database.`);

    // message.member | message.guild will only be defined if the message is in a guild.
    if (message.guild) {
        const dbGuild = await Guild.createOrUpdate(message.guild);
        Logger.log(`Added guild (${dbGuild.id}) to the database.`);

        const dbMember = await GuildMember.createOrUpdate(
            message.member,
            dbGuild
        );
        Logger.log(`Added member (${dbMember.id}) to the database.`);
        await onMessageXp(message);
    }
}

async function onMessageXp(message: DMessage) {
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

// TODO: develop this further.
async function generateXP(dbMember: GuildMember): Promise<number> {
    // Fetch messages from author in specific guild.
    const dbMessages = await Message.find({
        where: {
            author: await dbMember,
            guild: await dbMember.guild
        }
    });
    return Math.round(
        (Math.floor(Math.random() * 20) + 1) *
            Math.sqrt(dbMessages.length / 100)
    );
}
