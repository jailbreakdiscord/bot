import { Logger } from "dd-botkit";
import { Message as DMessage } from "discord.js";
import { Guild, Message } from "../../database/entities";
import { GuildMember } from "../../database/entities/GuildMember";

export async function onMessage(message: DMessage) {
    // FIXME: Horrible hack to compensate for a race condition.
    if (message.isCommand) return; // let the global guard save the message

    await Message.createOrUpdate(message);
    if (message.member) await GuildMember.createOrUpdate(message.member, { id: message.member.guild.id } as Guild);
}