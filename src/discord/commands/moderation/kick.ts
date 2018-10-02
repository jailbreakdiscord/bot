import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { GuildMember } from "discord.js";
export const KickCommand: Command = {
    opts: {
        name: "kick",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("kick", "Kicks a user", [
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
        const [_member, reason]: any | GuildMember = message.args;
        const member: GuildMember = _member;
        if (!member.kickable) return message.fail();
        await member.send(`You were kicked with reason: ${reason}.`);
        await member.kick(reason);
    }
};
