import { CommandHandler, CommandError } from "dd-botkit";

import { Guild } from "../../database/entities/Guild";
import { Message } from "../../database/entities/Message";
import { GuildMember } from "../../database/entities/GuildMember";

// Global Guards

const GetDatabaseModelsGuard: CommandHandler = async(msg, next) => {
    // FIXME: Horrible hack to compensate for race condition.
    const message = await Message.createOrUpdate(msg);
    if (msg.member) await GuildMember.createOrUpdate(msg.member, { id: msg.member.guild.id } as Guild);
    msg.db = message;

    const guild = await message.guild;
    msg.guild.db = guild;

    next();
}

export const GlobalGuards: CommandHandler[] = [GetDatabaseModelsGuard];