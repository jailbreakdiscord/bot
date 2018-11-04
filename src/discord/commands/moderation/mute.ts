import { Command, AccessLevel, Guards } from "dd-botkit";
import { GuildMember as DGuildMember } from "discord.js";
import { getMuteHandler } from "../..";
export const MuteCommand: Command = {
    opts: {
        name: "mute",
        access: AccessLevel.EVERYONE,
        category: "Moderation",
        guards: [
            Guards.Argumented("mute", "Mute a member.", [
                {
                    name: "member",
                    type: "member",
                    required: true
                },
                {
                    name: "duration",
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
        const [member, duration, reason]:
            | DGuildMember
            | number
            | any = message.args;
        const client = message.client;
        await getMuteHandler().mute(message, member, duration, reason);
        await message.success();
    }
};
