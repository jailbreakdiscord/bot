import { Message as DMessage } from "discord.js";
import { Guild, Message, User } from "../../database/entities";
import { Logger } from "dd-botkit";
import { GuildMember } from "../../database/entities/GuildMember";

export async function onMessage(message: DMessage) {
    const dbUser = await User.createOrUpdate(message.author);
    Logger.log(`Added message (${dbUser.id}) to the database.`);

    const dbMessage = await Message.createOrUpdate(message);
    Logger.log(`Added message (${dbMessage.id}) to the database.`);

    // message.member | message.guild will only be defined if the message is in a guild.
    if (message.channel.type !== "dm") {
        console.log("ree");

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

async function onMessageBadWord(message: DMessage) {
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

async function onMessageInvite(message: DMessage) {
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
            author: dbMember,
            guild: await dbMember.guild
        }
    });
    return Math.round(
        (Math.floor(Math.random() * 20) + 1) *
            Math.sqrt(dbMessages.length / 100)
    );
}
