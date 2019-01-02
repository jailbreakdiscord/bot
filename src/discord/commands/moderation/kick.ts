import { AccessLevel, BotPermissions, Command } from "dd-botkit";
import { GuildMember } from "discord.js";

export const KickCommand: Command = {
    opts: {
        name: "kick",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        usage: {
            description: "Kicks a member",
            args: [
                {
                    name: "member",
                    type: "member",
                    required: true
                },
                {
                    name: "reason",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ]
        },
        guards: [
            BotPermissions("KICK_MEMBERS")
        ]
    },
    handler: async (msg, next) => {
        const [member, ...reason] = msg.args as [GuildMember] & string[];

        const reasonStr = reason.length > 0 ? ` (note: ${reason.join(" ")})` : "";

        const auditLog = `Authorized by ${msg.member.id}${reasonStr}`;

        await member.kick(auditLog);
        await msg.success();
    }
};
