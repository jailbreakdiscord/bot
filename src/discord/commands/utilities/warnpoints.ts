import { Command, AccessLevel, Guards } from "dd-botkit";
import { GuildMember as DGuildMember } from "discord.js";
import { GuildMember } from "../../../database/entities/GuildMember";
export const WarnpointsCommand: Command = {
    opts: {
        name: "warnpoints",
        aliases: ["wp"],
        access: AccessLevel.EVERYONE,
        category: "Moderation",
        guards: [
            Guards.Argumented("warnpoints", "Get warnpoints of a member.", [
                {
                    name: "member",
                    type: "member",
                    required: false
                }
            ])
        ]
    },
    handler: async (message, next) => {
        let [member]: DGuildMember | any = message.args;
        if (!member) member = message.member;
        const dbMember = await GuildMember.findOne({
            where: { id: member.id }
        });
        // prettier-ignore
        await message.channel.send(`${member} has ${dbMember!.warnpoints} warnpoints.`);
        await message.success();
    }
};
