import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { GuildMember } from "discord.js";
export const banCommand: Command = {
    opts: {
        name: "ban",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("ban", "Bans a user", [
                {
                    name: "user",
                    type: "member",
                    required: true
                },
                {
                    name: "reason",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        //TODO: Post to mod logs when that is implemented.
        const [_member, reason]: any | GuildMember = message.args;
        const member: GuildMember = _member;
        if (!member.bannable) return message.fail();
        await member.send(`You were banned with reason: ${reason}.`);
        await member.ban(reason);
    }
};
