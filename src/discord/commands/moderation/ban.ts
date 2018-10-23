import { Command, AccessLevel, Guards } from "dd-botkit";
import { GuildMember } from "discord.js";
import { getPublicLogger } from "../..";
export const BanCommand: Command = {
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
        const [_member, reason]: any | GuildMember = message.args;
        const member: GuildMember = _member;
        if (!member.bannable) return message.fail();
        await getPublicLogger().send({
            type: "ban",
            duration: 0,
            member,
            reason,
            moderator: message.author
        });
        await member.send(`You were banned with reason: ${reason}.`);
        await member.ban({ reason, days: 7 });
        await message.success();
    }
};
