import { Command, AccessLevel, Guards } from "dd-botkit";
import { GuildMember as DGuildMember } from "discord.js";
import { getMuteHandler } from "../..";
export const UnmuteCommand: Command = {
    opts: {
        name: "unmute",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("unmute", "Unmute a member.", [
                {
                    name: "member",
                    type: "member",
                    required: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [member]: DGuildMember | any = message.args;
        await getMuteHandler().unmute(member);
        await message.success();
    }
};
