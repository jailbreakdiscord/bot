import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { GuildMember as DGuildMember, RichEmbed } from "discord.js";
import { getMuteHandler, getWarnHandler } from "../..";
export const WarnCommand: Command = {
    opts: {
        name: "warn",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("warn", "Warn a member.", [
                {
                    name: "member",
                    type: "member",
                    required: true
                },
                {
                    name: "warnpoints",
                    type: "number",
                    required: true
                },
                {
                    name: "reason",
                    type: "string",
                    required: false
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [member, points, reason]:
            | DGuildMember
            | number
            | any = message.args;
        const client = message.client;
        await getWarnHandler().warn(message, member, points, reason);
        await message.success();
    }
};
