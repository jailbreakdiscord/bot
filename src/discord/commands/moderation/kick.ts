import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { GuildMember } from "discord.js";
import { getPublicLogger } from "../../index";
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
        await getPublicLogger().send({
            type: "kick",
            member,
            reason,
            moderator: message.author
        });
        await member.send(
            `You were kicked with reason: ${reason || "none provided"}.`
        );
        // await member.kick(reason);
    }
};
