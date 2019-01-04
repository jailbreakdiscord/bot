import { Command } from "dd-botkit";
import { GuildMember } from "discord.js";

export const KickCommand: Command = {
    opts: {
        name: "kick",
        category: "Moderation",
        botPermissions: ["KICK_MEMBERS"],
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
        node: "moderation.kick"
    },
    handler: async (msg, next) => {
        const [member, ...reason] = msg.args as [GuildMember] & string[];

        const reasonStr = reason.length > 0 ? ` (note: ${reason.join(" ")})` : "";

        const auditLog = `Authorized by ${msg.member.id}${reasonStr}`;

        await member.kick(auditLog);
        await msg.success();
    }
};
